from fastapi import APIRouter, HTTPException
from app.db import get_db
from app.schemas.product_schema import Product

router = APIRouter(tags=["Productos"])

@router.get("/", response_model=list[Product])
def listar_productos():
    """
    Devuelve todos los productos activos (según tu tabla real).
    """
    try:
        conn = get_db()
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT id, sku, name, slug, short_desc, price, stock, active, created_at, updated_at
            FROM products
            WHERE active = 1;
        """
        cursor.execute(query)
        productos = cursor.fetchall()

        cursor.close()
        conn.close()

        return productos

    except Exception as e:
        print(" Error al obtener productos:", e)
        raise HTTPException(status_code=500, detail="Error al obtener productos")
