# app/services/admin_service.py
from sqlalchemy import text
from app.db import get_connection


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
    sql = text(f"""
            SELECT
        DATE_FORMAT(created_at, '%a') AS day,
        SUM(total) AS amount
    FROM orders
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY day
    ORDER BY day ASC;

    """)
    rows = conn.execute(sql).fetchall()
    conn.close()
    return {"labels": [r.day for r in rows], "data": [float(r.amount or 0) for r in rows]}


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


# --- 4. Pedidos recientes / filtro por estado ---
def get_orders(status: str = None, limit: int = 20):
    conn = get_connection()
    base_sql = """
        SELECT 
            o.id,
            CONCAT(u.first_name, ' ', u.last_name) AS client_name,
            GROUP_CONCAT(CONCAT(p.name, ' (', oi.quantity, ')') SEPARATOR ', ') AS product_description,
            DATE_FORMAT(o.created_at, '%d %b %Y') AS date,
            o.total,
            o.status
        FROM orders o
        JOIN users u ON u.id = o.user_id
        JOIN order_items oi ON oi.order_id = o.id
        JOIN products p ON p.id = oi.product_id
    """
    if status:
        base_sql += " WHERE o.status = :status"
    base_sql += " GROUP BY o.id ORDER BY o.created_at DESC LIMIT :limit;"
    sql = text(base_sql)
    params = {"status": status, "limit": limit} if status else {"limit": limit}
    rows = conn.execute(sql, params).fetchall()
    conn.close()
    return [dict(r._mapping) for r in rows]


# --- 5. Productos con filtro por categoría o búsqueda ---
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


# --- 6. Usuarios por rol ---
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


# --- 7. Categorías (CRUD básico) ---
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
            u.first_name AS client,
            p.name AS product,
            oi.quantity,
            oi.price,
            (oi.quantity * oi.price) AS subtotal
        FROM order_items oi
        JOIN orders o ON o.id = oi.order_id
        JOIN users u ON u.id = o.user_id
        JOIN products p ON p.id = oi.product_id
        ORDER BY o.created_at DESC;
    """)
    rows = conn.execute(sql).fetchall()
    conn.close()
    return [dict(r._mapping) for r in rows]


# --- 9. Pedidos con paginación profesional ---
def get_orders_paginated(page: int = 1, limit: int = 10):
    conn = get_connection()

    # Calcular desplazamiento
    offset = (page - 1) * limit

    # Obtener total de registros
    total_sql = text("SELECT COUNT(*) AS total FROM orders;")
    total_result = conn.execute(total_sql).fetchone()
    total_records = total_result.total
    total_pages = (total_records + limit - 1) // limit  # Redondeo hacia arriba

    # Consulta principal con JOINs para mostrar cliente y estado
    sql = text("""
        SELECT 
            o.id,
            CONCAT(u.first_name, ' ', u.last_name) AS customer,
            DATE_FORMAT(o.created_at, '%d %b %Y') AS date,
            o.total,
            s.label AS status
        FROM orders o
        JOIN users u ON u.id = o.user_id
        JOIN statuses s ON s.id = o.status_id
        ORDER BY o.created_at DESC
        LIMIT :limit OFFSET :offset;
    """)

    rows = conn.execute(sql, {"limit": limit, "offset": offset}).fetchall()
    conn.close()

    return {
        "page": page,
        "limit": limit,
        "total_records": total_records,
        "total_pages": total_pages,
        "data": [dict(r._mapping) for r in rows]
    }
