from sqlalchemy.orm import Session
from app.models.producto import Producto
from app.schemas.producto import ProductoCreate

def obtener_productos(db: Session):
    return db.query(Producto).all()

def obtener_producto_por_id(db: Session, id: int):
    return db.query(Producto).filter(Producto.id == id).first()

def crear_producto(db: Session, producto: ProductoCreate):
    nuevo_producto = Producto(**producto.dict())
    db.add(nuevo_producto)
    db.commit()
    db.refresh(nuevo_producto)
    return nuevo_producto
