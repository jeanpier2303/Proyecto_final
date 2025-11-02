from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from app.db import get_connection

router = APIRouter(tags=["Órdenes"])

# --- Crear orden con sus ítems ---
@router.post("/orders")
def create_order(order: dict):
    """
    Espera un JSON como este:
    {
        "user_id": 5,
        "address_id": 1,
        "status_id": 2,
        "subtotal": 12000,
        "shipping": 4000,
        "tax": 0,
        "total": 16000,
        "note": "Pago completado vía transferencia",
        "items": [
            {"product_id": 1, "qty": 2, "unit_price": 6000, "subtotal": 12000}
        ]
    }
    """
    conn = get_connection()
    trans = conn.begin()

    try:
        # Insertar orden principal
        sql_order = text("""
            INSERT INTO orders (user_id, address_id, status_id, subtotal, shipping, tax, total, note)
            VALUES (:user_id, :address_id, :status_id, :subtotal, :shipping, :tax, :total, :note)
        """)
        conn.execute(sql_order, order)
        order_id = conn.execute(text("SELECT LAST_INSERT_ID() AS id")).mappings().first()["id"]

        # Insertar ítems asociados
        items = order.get("items", [])
        sql_item = text("""
            INSERT INTO order_items (order_id, product_id, qty, unit_price, subtotal)
            VALUES (:order_id, :product_id, :qty, :unit_price, :subtotal)
        """)
        for item in items:
            item["order_id"] = order_id
            conn.execute(sql_item, item)

        trans.commit()
        conn.close()

        return {"message": "✅ Orden registrada correctamente", "order_id": order_id}

    except Exception as e:
        trans.rollback()
        conn.close()
        raise HTTPException(status_code=500, detail=f"Error al crear la orden: {str(e)}")


# --- Consultar órdenes y sus productos ---
@router.get("/orders")
def get_orders():
    conn = get_connection()
    sql = text("""
        SELECT o.id AS order_id, o.user_id, o.total, o.note, o.created_at,
               i.product_id, i.qty, i.unit_price, i.subtotal AS item_subtotal
        FROM orders o
        LEFT JOIN order_items i ON o.id = i.order_id
        ORDER BY o.id DESC
    """)
    result = conn.execute(sql).mappings().all()
    conn.close()
    return result
