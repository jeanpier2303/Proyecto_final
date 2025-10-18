from sqlalchemy import text
from app.db import engine

def obtener_productos(db):
    sql = text("SELECT * FROM products")
    result = db.execute(sql)
    productos = [dict(row._mapping) for row in result]
    return productos

def obtener_producto_por_id(db, id: int):
    sql = text("SELECT * FROM products WHERE id = :id")
    result = db.execute(sql, {"id": id})
    producto = result.fetchone()
    return dict(producto._mapping) if producto else None

def crear_producto(db, producto):
    sql = text("""
        INSERT INTO products (category_id, name, slug, description, price, stock, active)
        VALUES (:category_id, :name, :slug, :description, :price, :stock, :active)
    """)
    db.execute(sql, {
        "category_id": producto.category_id,
        "name": producto.name,
        "slug": producto.slug,
        "description": producto.description,
        "price": producto.price,
        "stock": producto.stock,
        "active": producto.active
    })
    db.commit()
    # devuelve el último producto insertado
    return obtener_producto_por_id(db, db.execute(text("SELECT LAST_INSERT_ID() as id")).fetchone().id)
