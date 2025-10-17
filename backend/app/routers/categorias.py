from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.schemas.categoria import CategoriaCreate, CategoriaResponse
from app.services import categoria_service

router = APIRouter( tags=["Categorias"])

@router.get("/", response_model=list[CategoriaResponse])
def listar_categorias(db: Session = Depends(get_db)):
    return categoria_service.obtener_categorias(db)

@router.post("/", response_model=CategoriaResponse)
def crear_categoria(categoria: CategoriaCreate, db: Session = Depends(get_db)):
    return categoria_service.crear_categoria(db, categoria)
