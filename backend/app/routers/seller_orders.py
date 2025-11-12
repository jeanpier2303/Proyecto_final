from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from app.db import get_connection
from datetime import datetime

router = APIRouter(prefix="/api/seller", tags=["Ventas Vendedor"])

# --- MODELOS DE ENTRADA ---
class VentaItem(BaseModel):
    product_id: int
    qty: int
    unit_price: float

class VentaCreate(BaseModel):
    vendedor_id: int
    items: list[VentaItem]
    note: str | None = None


# --- ENDPOINT PRINCIPAL ---
@router.post("/sales")
def crear_venta(v: VentaCreate):
    if not v.items:
        raise HTTPException(status_code=400, detail="Debe incluir al menos un producto en la venta.")

    conn = get_connection()
    try:
        subtotal = sum(item.qty * item.unit_price for item in v.items)
        shipping = 0.00
        tax = round(subtotal * 0.19, 2)
        total = round(subtotal + tax, 2)

        # ✅ Estado 4 = ENTREGADO / PAGADO (según tu tabla statuses)
        status_id = 4

        # Crear la orden
        order_sql = text("""
            INSERT INTO orders (user_id, address_id, status_id, subtotal, shipping, tax, total, note, created_at, updated_at)
            VALUES (:user_id, NULL, :status_id, :subtotal, :shipping, :tax, :total, :note, :created_at, :updated_at)
        """)
        conn.execute(order_sql, {
            "user_id": v.vendedor_id,
            "status_id": status_id,
            "subtotal": subtotal,
            "shipping": shipping,
            "tax": tax,
            "total": total,
            "note": v.note or "Venta directa en tienda física",
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
        })

        order_id = conn.execute(text("SELECT LAST_INSERT_ID() AS id")).fetchone().id

        # Insertar productos vendidos
        for item in v.items:
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

            # Reducir el stock disponible
            conn.execute(text("""
                UPDATE products SET stock = stock - :qty
                WHERE id = :pid AND stock >= :qty
            """), {"qty": item.qty, "pid": item.product_id})

        conn.commit()
        conn.close()

        return {
            "success": True,
            "message": "Venta registrada como ENTREGADA / PAGADA",
            "order_id": order_id,
            "total": total,
            "status_id": status_id
        }

    except Exception as e:
        conn.rollback()
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))

# --- HISTORIAL DE VENTAS DEL VENDEDOR ---
@router.get("/orders")
def listar_ventas_vendedor(
    vendedor_id: int,
    page: int = 1,
    limit: int = 10
):
    conn = get_connection()
    try:
        offset = (page - 1) * limit

        # total de ventas del vendedor
        total_result = conn.execute(text("""
            SELECT COUNT(*) AS total
            FROM orders
            WHERE user_id = :vid
        """), {"vid": vendedor_id}).fetchone()
        total = total_result.total if total_result else 0

        # obtener las ventas
        rows = conn.execute(text("""
            SELECT
                o.id,
                o.subtotal,
                o.tax,
                o.total,
                s.label AS status,
                o.created_at
            FROM orders o
            LEFT JOIN statuses s ON s.id = o.status_id
            WHERE o.user_id = :vid
            ORDER BY o.created_at DESC
            LIMIT :limit OFFSET :offset
        """), {"vid": vendedor_id, "limit": limit, "offset": offset}).fetchall()

        ventas = []
        for r in rows:
            row = dict(r._mapping)

            # obtener los items de la venta
            items = conn.execute(text("""
                SELECT
                    p.name AS product_name,
                    oi.qty,
                    oi.unit_price,
                    (oi.qty * oi.unit_price) AS subtotal
                FROM order_items oi
                JOIN products p ON p.id = oi.product_id
                WHERE oi.order_id = :oid
            """), {"oid": row["id"]}).fetchall()
            row["items"] = [dict(i._mapping) for i in items]

            ventas.append(row)

        total_pages = (total + limit - 1) // limit

        return {
            "items": ventas,
            "total": total,
            "page": page,
            "pages": total_pages,
            "limit": limit
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        conn.close()
