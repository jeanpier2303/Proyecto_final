# app/routers/seller_history.py
from fastapi import APIRouter, Query, HTTPException
from sqlalchemy import text
from app.db import get_connection

router = APIRouter(prefix="/api/seller", tags=["Historial Vendedor"])

@router.get("/history")
def historial_vendedor(
    vendedor_id: int = Query(..., description="ID del vendedor"),
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=200)
):
    """Historial de ventas paginado del vendedor"""
    conn = get_connection()
    try:
        total_q = conn.execute(
            text("SELECT COUNT(*) AS cnt FROM orders WHERE user_id = :vid"),
            {"vid": vendedor_id}
        ).fetchone()
        total = int(total_q._mapping["cnt"] or 0)
        offset = (page - 1) * limit

        sql = text("""
            SELECT id, subtotal, shipping, tax, total, status_id, note, created_at
            FROM orders
            WHERE user_id = :vid
            ORDER BY created_at DESC
            LIMIT :limit OFFSET :offset
        """)
        rows = conn.execute(sql, {"vid": vendedor_id, "limit": limit, "offset": offset}).fetchall()

        items = []
        for r in rows:
            row = dict(r._mapping)
            items_q = conn.execute(text("""
                SELECT oi.product_id, p.name as product_name, oi.qty, oi.unit_price, oi.subtotal
                FROM order_items oi
                LEFT JOIN products p ON p.id = oi.product_id
                WHERE oi.order_id = :oid
            """), {"oid": row["id"]}).fetchall()
            row["items"] = [dict(i._mapping) for i in items_q]
            items.append(row)

        conn.close()
        pages = (total + limit - 1) // limit

        return {"items": items, "total": total, "page": page, "pages": pages, "limit": limit}
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=str(e))
