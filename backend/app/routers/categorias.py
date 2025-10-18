from fastapi import APIRouter
from app.schemas.categoria import CategoriaCreate
from app.services import categoria_service

router = APIRouter(tags=["Categorias"])

@router.get("/")
def listar_categorias():
    return categoria_service.obtener_categorias()

@router.post("/")
def crear_categoria(categoria: CategoriaCreate):
    return categoria_service.crear_categoria(categoria)
