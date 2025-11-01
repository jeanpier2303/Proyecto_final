# app/routers/invoice_routes.py
from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from app.db import get_connection

router = APIRouter(prefix="/api", tags=["Facturación"])


@router.get("/admin/orders/{order_id}")
def get_invoice(order_id: int):
    conn = get_connection()
    try:
        # ✅ Consulta principal: pedido + cliente + estado + dirección
        order_sql = text("""
                SELECT
                    o.id,
                    o.subtotal,
                    o.tax AS tax_rate,
                    o.shipping AS shipping_cost,
                    o.total,
                    o.note,
                    o.created_at AS date,
                    s.label AS status,
                    o.address_id,
                    o.user_id,
                    u.first_name,
                    u.last_name,
                    u.email,
                    u.phone,
                    u.identification_number,
                    CONCAT(a.street, ', ', IFNULL(a.complement, ''), ', ', c.name) AS address
                FROM orders o
                JOIN users u ON u.id = o.user_id
                JOIN statuses s ON s.id = o.status_id
                LEFT JOIN addresses a ON a.id = o.address_id
                LEFT JOIN cities c ON c.id = a.city_id
                WHERE o.id = :order_id
            """)

        order_row = conn.execute(order_sql, {"order_id": order_id}).fetchone()
        if not order_row:
            raise HTTPException(status_code=404, detail="Pedido no encontrado")

        order = dict(order_row._mapping)

        # ✅ Items del pedido
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
        items = [dict(i._mapping) for i in conn.execute(sql_items, {"order_id": order_id}).fetchall()]


        # ✅ Datos del cliente
        user = {
            "id": order["user_id"],
            "first_name": order["first_name"],
            "last_name": order["last_name"],
            "email": order["email"],
            "phone": order["phone"],
            "identification_number": order["identification_number"],
        }

        # ✅ Armar respuesta final
        invoice = {
            "order": {
                "id": order["id"],
                "subtotal": float(order["subtotal"] or 0),
                "tax_rate": float(order["tax_rate"] or 0),
                "shipping_cost": float(order["shipping_cost"] or 0),
                "total": float(order["total"] or 0),
                "note": order["note"] or "",
                "date": order["date"],
                "status": order["status"],
                "payment_method": "Pago no especificado",  # 💡 Valor temporal hasta agregar columna real
            },
            "items": items,
            "user": user,
            "address": order.get("address", None)
        }

        return invoice

    except HTTPException:
        raise
    except Exception as e:
        print("❌ Error en get_invoice:", e)
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")
    finally:
        conn.close()
