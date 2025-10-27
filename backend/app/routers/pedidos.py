from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from app.db import get_connection

router = APIRouter(tags=["Pedidos"])

@router.post("/pedidos")
def crear_pedido(pedido: dict):
    """
    Inserta un nuevo pedido en la base de datos.
    Espera un JSON con: user_id, producto_id, cantidad, total.
    """
    try:
        conn = get_connection()
        sql = text("""
            INSERT INTO orders (user_id, product_id, quantity, total)
            VALUES (:user_id, :producto_id, :cantidad, :total)
        """)
        conn.execute(sql, pedido)
        conn.commit()
        conn.close()
        return {"success": True, "message": "Pedido registrado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
