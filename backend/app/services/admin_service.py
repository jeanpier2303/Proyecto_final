# app/services/admin_service.py
from sqlalchemy import text
from app.db import get_connection
from datetime import datetime


# --- 1. Estadísticas principales ---
def get_admin_stats():
    conn = get_connection()
    sql = text("""
        SELECT
            COALESCE(SUM(total), 0) AS sales_total,
            COUNT(*) AS orders_count,
            (SELECT COUNT(*) FROM users WHERE role_id = 5) AS users_active,
            (SELECT COUNT(*) FROM products) AS products_count
        FROM orders;
    """)
    result = conn.execute(sql).fetchone()
    conn.close()
    return dict(result._mapping)


# --- 2. Ventas por día ---
def get_sales_data(days: int = 7):
    conn = get_connection()
    try:
        sql_recent = text("""
            SELECT
                DATE(created_at) AS order_date,
                SUM(total) AS amount
            FROM orders
            WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL :days DAY)
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at) ASC;
        """)
        rows = conn.execute(sql_recent, {"days": days}).fetchall()

        if not rows:
            return {"labels": [], "data": []}

        labels, data = [], []
        for r in rows:
            date_obj = r.order_date
            day_label = date_obj.strftime("%a %d/%m") if isinstance(date_obj, datetime) else str(date_obj)
            labels.append(day_label)
            data.append(float(r.amount or 0))

        return {"labels": labels, "data": data}
    except Exception as e:
        print("❌ Error en get_sales_data:", e)
        return {"labels": [], "data": []}
    finally:
        conn.close()


# --- 3. Categorías más vendidas ---
def get_categories_data():
    conn = get_connection()
    sql = text("""
        SELECT 
            c.name AS category,
            COUNT(p.id) AS count
        FROM products p
        JOIN categories c ON c.id = p.category_id
        GROUP BY c.name
        ORDER BY count DESC
        LIMIT 5;
    """)
    rows = conn.execute(sql).fetchall()
    conn.close()
    return {"labels": [r.category for r in rows], "data": [r.count for r in rows]}


# --- 4. Pedidos recientes ---
def get_orders(status: str = None, limit: int = 20):
    conn = get_connection()
    base_sql = """
        SELECT 
            o.id,
            CONCAT(u.first_name, ' ', u.last_name) AS client_name,
            DATE_FORMAT(o.created_at, '%d %b %Y') AS date,
            o.total,
            s.label AS status
        FROM orders o
        JOIN users u ON u.id = o.user_id
        JOIN statuses s ON s.id = o.status_id
    """
    if status:
        base_sql += " WHERE s.label = :status"
    base_sql += " ORDER BY o.created_at DESC LIMIT :limit;"
    sql = text(base_sql)
    params = {"status": status, "limit": limit} if status else {"limit": limit}
    rows = conn.execute(sql, params).fetchall()
    conn.close()
    return [dict(r._mapping) for r in rows]


# --- 5. Productos con filtros ---
def get_products(category_id: int = None, search: str = None):
    conn = get_connection()
    sql = """
        SELECT p.id, p.name, p.price, p.stock, c.name AS category
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        WHERE 1=1
    """
    params = {}
    if category_id:
        sql += " AND p.category_id = :category_id"
        params["category_id"] = category_id
    if search:
        sql += " AND p.name LIKE :search"
        params["search"] = f"%{search}%"
    sql += " ORDER BY p.name ASC;"
    rows = conn.execute(text(sql), params).fetchall()
    conn.close()
    return [dict(r._mapping) for r in rows]


# --- 6. Usuarios ---
def get_users(role_id: int = None):
    conn = get_connection()
    sql = "SELECT id, first_name, last_name, email, role_id FROM users"
    params = {}
    if role_id:
        sql += " WHERE role_id = :role_id"
        params["role_id"] = role_id
    sql += " ORDER BY id DESC;"
    rows = conn.execute(text(sql), params).fetchall()
    conn.close()
    return [dict(r._mapping) for r in rows]


# --- 7. Categorías ---
def get_categories():
    conn = get_connection()
    rows = conn.execute(text("SELECT * FROM categories ORDER BY id DESC;")).fetchall()
    conn.close()
    return [dict(r._mapping) for r in rows]


def create_category(name: str):
    conn = get_connection()
    conn.execute(text("INSERT INTO categories (name) VALUES (:name);"), {"name": name})
    conn.commit()
    conn.close()
    return {"message": "Categoría creada"}


def delete_category(category_id: int):
    conn = get_connection()
    conn.execute(text("DELETE FROM categories WHERE id = :id;"), {"id": category_id})
    conn.commit()
    conn.close()
    return {"message": "Categoría eliminada"}


# --- 8. Ventas detalladas ---
def get_sales_details():
    conn = get_connection()
    sql = text("""
        SELECT
            o.id AS order_id,
            DATE_FORMAT(o.created_at, '%d/%m/%Y') AS date,
            CONCAT(u.first_name, ' ', u.last_name) AS client,
            p.name AS product,
            oi.qty AS quantity,
            oi.unit_price AS price,
            (oi.qty * oi.unit_price) AS subtotal
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        JOIN users u ON u.id = o.user_id
        JOIN products p ON p.id = oi.product_id
        ORDER BY o.created_at DESC;
    """)
    rows = conn.execute(sql).fetchall()
    conn.close()
    return [dict(r._mapping) for r in rows]


# --- 9. Pedidos con paginación ---
def get_orders_paginated(page: int = 1, limit: int = 10, status: str = None):
    conn = get_connection()
    try:
        offset = (page - 1) * limit
        params = {"limit": limit, "offset": offset}

        where_clause = ""
        if status:
            where_clause = "WHERE s.label = :status"
            params["status"] = status

        total_sql = text(f"""
            SELECT COUNT(*) AS total
            FROM orders o
            JOIN statuses s ON s.id = o.status_id
            {where_clause};
        """)
        total_result = conn.execute(total_sql, params).fetchone()
        total_records = total_result.total if total_result else 0
        total_pages = (total_records + limit - 1) // limit or 1

        sql = text(f"""
            SELECT 
                o.id,
                CONCAT(u.first_name, ' ', u.last_name) AS customer,
                DATE_FORMAT(o.created_at, '%d %b %Y') AS date,
                o.total,
                s.label AS status
            FROM orders o
            JOIN users u ON u.id = o.user_id
            JOIN statuses s ON s.id = o.status_id
            {where_clause}
            ORDER BY o.created_at DESC
            LIMIT :limit OFFSET :offset;
        """)
        rows = conn.execute(sql, params).fetchall()

        return {
            "page": page,
            "limit": limit,
            "total_records": total_records,
            "total_pages": total_pages,
            "data": [dict(r._mapping) for r in rows]
        }

    except Exception as e:
        print("❌ Error en get_orders_paginated:", e)
        return {"page": page, "limit": limit, "total_records": 0, "total_pages": 1, "data": []}
    finally:
        conn.close()


# --- 10. Detalle de pedido ---
def get_order_details(order_id: int):
    conn = get_connection()
    try:
        # --- Datos principales del pedido ---
        sql_order = text("""
            SELECT 
                o.id,
                o.created_at,
                o.total,
                o.subtotal,
                o.tax,
                o.shipping AS shipping_cost,
                s.label AS status,
                o.note,
                u.first_name,
                u.last_name,
                u.email,
                u.phone,
                u.identification_number AS document,
                CONCAT(a.street, ', ', IFNULL(a.complement, ''), ', ', c.name) AS address
            FROM orders o
            JOIN users u ON u.id = o.user_id
            JOIN statuses s ON s.id = o.status_id
            LEFT JOIN addresses a ON a.id = o.address_id
            LEFT JOIN cities c ON c.id = a.city_id
            WHERE o.id = :order_id;
        """)
        order_row = conn.execute(sql_order, {"order_id": order_id}).fetchone()
        if not order_row:
            return None

        order = dict(order_row._mapping)

        # --- Productos del pedido ---
        sql_items = text("""
            SELECT 
                p.name AS product_name,
                oi.qty AS quantity,
                oi.unit_price AS unit_price,
                (oi.qty * oi.unit_price) AS subtotal
            FROM order_items oi
            JOIN products p ON p.id = oi.product_id
            WHERE oi.order_id = :order_id;
        """)
        items = [dict(i._mapping) for i in conn.execute(sql_items, {"order_id": order_id}).fetchall()]

        # --- Estructura compatible con el frontend ---
        invoice = {
            "order": {
                "id": order["id"],
                "created_at": order["created_at"],
                "subtotal": float(order["subtotal"] or 0),
                "tax": float(order["tax"] or 0),
                "shipping_cost": float(order["shipping_cost"] or 0),
                "total": float(order["total"] or 0),
                "status": order["status"],
                "note": order.get("note", "") or "",
                "payment_method": "Pago no especificado"
            },
            "user": {
                "first_name": order.get("first_name", ""),
                "last_name": order.get("last_name", ""),
                "email": order.get("email", ""),
                "phone": order.get("phone", ""),
                "identification_number": order.get("document", "")
            },
            "address": {
                "street": order.get("address", "")
            },
            "items": items
        }

        return invoice

    except Exception as e:
        print("❌ Error en get_order_details:", e)
        return None
    finally:
        conn.close()
