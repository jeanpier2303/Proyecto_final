from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from app.db import get_connection

router = APIRouter(prefix="/api/seller", tags=["Ventas Vendedor"])

@router.post("/orders")
def create_seller_order(order: dict):
    """
    Crea una nueva venta asociada a un vendedor (rol_id = 7)
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()

        # --- Datos de la orden ---
        vendedor_id = order.get("vendedor_id")
        items = order.get("items", [])
        note = order.get("note", "")
        subtotal = sum(float(i["unit_price"]) * int(i["qty"]) for i in items)
        tax = subtotal * 0.0  # puedes cambiarlo si aplicas IVA
        shipping = 0.0
        total = subtotal + tax + shipping
        status_id = 1  # por ejemplo "completado" o "procesando"

        # --- Insertar en orders ---
        insert_order = text("""
            INSERT INTO orders (user_id, address_id, status_id, subtotal, shipping, tax, total, note)
            VALUES (:user_id, NULL, :status_id, :subtotal, :shipping, :tax, :total, :note)
        """)
        result = conn.execute(insert_order, {
            "user_id": vendedor_id,
            "status_id": status_id,
            "subtotal": subtotal,
            "shipping": shipping,
            "tax": tax,
            "total": total,
            "note": note
        })

        # Obtener ID de la orden creada
        order_id = conn.execute(text("SELECT LAST_INSERT_ID()")).scalar()

        # --- Insertar productos en order_items ---
        insert_item = text("""
            INSERT INTO order_items (order_id, product_id, qty, unit_price, subtotal)
            VALUES (:order_id, :product_id, :qty, :unit_price, :subtotal)
        """)
        for item in items:
            conn.execute(insert_item, {
                "order_id": order_id,
                "product_id": item["product_id"],
                "qty": item["qty"],
                "unit_price": item["unit_price"],
                "subtotal": float(item["unit_price"]) * int(item["qty"])
            })

        conn.commit()
        conn.close()

        return {"success": True, "order_id": order_id, "total": total}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
