from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.producto import ProductoCreate
from app.services import producto_service

router = APIRouter(tags=["Productos"])

@router.get("/")
def listar_productos(db: Session = Depends(get_db)):
    return producto_service.obtener_productos(db)


@router.get("/{id}")
def obtener_producto(id: int, db: Session = Depends(get_db)):
    producto = producto_service.obtener_producto_por_id(db, id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


@router.post("/")
def crear_producto(producto: ProductoCreate, db: Session = Depends(get_db)):
    nuevo = producto_service.crear_producto(db, producto)
    return nuevo
