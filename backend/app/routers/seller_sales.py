from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from sqlalchemy import text
from app.db import get_connection

router = APIRouter(prefix="/api/seller", tags=["Ventas Vendedor"])

# ----- MODELOS DE ENTRADA -----
class ItemVenta(BaseModel):
    product_id: int
    qty: int
    unit_price: float

class VentaCreate(BaseModel):
    vendedor_id: int
    items: List[ItemVenta]
    note: str | None = None


# ----- ENDPOINT PRINCIPAL -----
@router.post("/sales")
def crear_venta(data: VentaCreate):
    """
    Crea una venta hecha por un vendedor.
    Guarda en 'orders' y 'order_items' con el user_id del vendedor.
    """
    try:
        conn = get_connection()

        subtotal = sum([i.qty * i.unit_price for i in data.items])
        total = subtotal  # (por ahora sin envío ni impuestos)

        insert_order = text("""
            INSERT INTO orders (user_id, status_id, subtotal, shipping, tax, total, note)
            VALUES (:user_id, 1, :subtotal, 0.00, 0.00, :total, :note)
        """)
        result = conn.execute(insert_order, {
            "user_id": data.vendedor_id,
            "subtotal": subtotal,
            "total": total,
            "note": data.note
        })

        # Obtener el ID de la orden recién creada
        order_id = conn.execute(text("SELECT LAST_INSERT_ID() as id")).fetchone().id

        # Insertar los productos vendidos
        for item in data.items:
            conn.execute(text("""
                INSERT INTO order_items (order_id, product_id, qty, unit_price, subtotal)
                VALUES (:order_id, :product_id, :qty, :unit_price, :subtotal)
            """), {
                "order_id": order_id,
                "product_id": item.product_id,
                "qty": item.qty,
                "unit_price": item.unit_price,
                "subtotal": item.qty * item.unit_price
            })

            # Actualizar el stock del producto
            conn.execute(text("""
                UPDATE products
                SET stock = stock - :qty
                WHERE id = :product_id
            """), {"qty": item.qty, "product_id": item.product_id})

        conn.commit()
        conn.close()

        return {
            "success": True,
            "message": "Venta registrada correctamente",
            "order_id": order_id,
            "total": total
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
