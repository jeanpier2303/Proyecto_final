# app/routers/admin.py
from fastapi import APIRouter, Query, Body, Depends
from sqlalchemy import text
from app.db import get_connection
import re #para generar slugs
from fastapi import APIRouter, HTTPException 
from app.services.admin_service import (
    get_admin_stats,
    get_sales_data,
    get_categories_data,
    get_orders,
    get_products,
    get_users,
    get_categories,
    create_category,
    delete_category,
    get_sales_details
)

router = APIRouter(tags=["Administrativo"])

@router.get("/stats")
def admin_get_stats():
    return get_admin_stats()

@router.get("/sales")
def admin_get_sales(range: int = Query(7, ge=7, le=90)):
    return get_sales_data(range)

@router.get("/categories")
def admin_get_categories_chart():
    return get_categories_data()

#para filtrar los pedidos
@router.get("/orders")
def admin_get_orders(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    status: str | None = Query(None)
):
    from app.services.admin_service import get_orders_paginated
    try:
        return get_orders_paginated(page=page, limit=limit, status=status)
    except Exception as e:
        print(" Error en /admin/orders:", e)
        raise




@router.get("/products")
def admin_get_products(category_id: int | None = Query(None), search: str | None = Query(None)):
    return get_products(category_id, search)

@router.get("/users")
def admin_get_users(role_id: int | None = Query(None)):
    return get_users(role_id)

@router.get("/categories/all")
def admin_get_all_categories():
    return get_categories()

@router.post("/categories")
def admin_add_category(name: str = Body(..., embed=True)):
    return create_category(name)

@router.delete("/categories/{category_id}")
def admin_remove_category(category_id: int):
    return delete_category(category_id)

@router.get("/sales/details")
def admin_get_sales_details():
    return get_sales_details()


#----------------------------------------------
def generate_slug(name: str) -> str:    #ya que para agregar un producto necesitamos un slug obligatoriamente
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', name.lower()).strip('-')
    return slug

@router.post("/products")
def create_product(
    name: str = Body(...),
    price: float = Body(...),
    stock: int = Body(...),
    category_id: int = Body(...),
    conn=Depends(get_connection)
):
    try:
        slug = generate_slug(name)

        query = text("""
            INSERT INTO products (name, slug, price, stock, category_id)
            VALUES (:name, :slug, :price, :stock, :category_id)
        """)
        conn.execute(query, {
            "name": name,
            "slug": slug,
            "price": price,
            "stock": stock,
            "category_id": category_id
        })
        conn.commit()

        result = conn.execute(text("""
            SELECT p.id, p.name, p.slug, p.price, p.stock, c.name AS category
            FROM products p
            LEFT JOIN categories c ON c.id = p.category_id
            ORDER BY p.id DESC
            LIMIT 1
        """)).fetchone()

        return dict(result._mapping)

    except Exception as e:
        print(" Error creando producto:", e)
        return {"error": str(e)}
    
# --------------------------------------------------------
# DETALLE DE UN PEDIDO ESPECÍFICO (FACTURA)

@router.get("/orders/{order_id}")
def admin_get_order_details(order_id: int):
    conn = get_connection()
    try:
        sql = text("""
            SELECT
                o.id,
                o.created_at,
                o.total,
                o.subtotal,
                o.tax,
                o.shipping AS shipping_cost,
                s.label AS status,
                CONCAT(u.first_name, ' ', u.last_name) AS customer_name,
                u.email,
                u.phone,
                u.identification_number AS document,
                CONCAT(a.street, ', ', IFNULL(a.complement, ''), ', ', c.name) AS address
            FROM orders o
            JOIN users u ON u.id = o.user_id
            JOIN statuses s ON s.id = o.status_id
            LEFT JOIN addresses a ON a.id = o.address_id
            LEFT JOIN cities c ON c.id = a.city_id
            WHERE o.id = :order_id
        """)
        order = conn.execute(sql, {"order_id": order_id}).fetchone()

        if not order:
            raise HTTPException(status_code=404, detail="Pedido no encontrado")

        #  Items del pedido (sin discount ni sku)
        sql_items = text("""
            SELECT
                p.name AS product_name,
                oi.qty AS quantity,
                oi.unit_price,
                (oi.qty * oi.unit_price) AS subtotal
            FROM order_items oi
            JOIN products p ON p.id = oi.product_id
            WHERE oi.order_id = :order_id
        """)
        items = conn.execute(sql_items, {"order_id": order_id}).fetchall()

        result = dict(order._mapping)
        result["items"] = [dict(i._mapping) for i in items]
        result["payment_method"] = "Pago no especificado"  # temporal

        return result

    except Exception as e:
        print(f" Error en get_order_details: {e}")
        raise HTTPException(status_code=500, detail=f"Error interno: {e}")
    finally:
        conn.close()


# ---------------------------------------- Todo de soporte / mensajes
from app.services.admin_service import (
    get_support_messages,
    get_support_message_by_id,
    update_support_message_status
)

# Módulo de soporte / mensajes
@router.get("/support/messages")
def admin_get_messages():
    try:
        return get_support_messages()
    except Exception as e:
        print("Error en /support/messages:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/support/messages/{message_id}")
def admin_get_message_detail(message_id: int):
    msg = get_support_message_by_id(message_id)
    if not msg:
        raise HTTPException(status_code=404, detail="Mensaje no encontrado")
    return msg


@router.put("/support/messages/{message_id}/status")
def admin_update_message_status(message_id: int, status_id: int = Body(..., embed=True)):
    return update_support_message_status(message_id, status_id)
