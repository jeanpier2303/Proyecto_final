from sqlalchemy import text
from app.db import get_connection

def obtener_categorias():
    conn = get_connection()
    result = conn.execute(text("SELECT * FROM categories"))
    categorias = [dict(row._mapping) for row in result.fetchall()]
    conn.close()
    return categorias


def crear_categoria(categoria):
    conn = get_connection()
    sql = text("INSERT INTO categories (name, slug, description) VALUES (:name, :slug, :description)")
    conn.execute(sql, {
        "name": categoria.name,
        "slug": categoria.slug,
        "description": categoria.description
    })
    conn.commit()
    # devolver la categoría recién creada
    nueva = conn.execute(text("SELECT * FROM categories ORDER BY id DESC LIMIT 1")).fetchone()
    conn.close()
    return dict(nueva._mapping)
