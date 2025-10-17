from sqlalchemy.orm import Session
from app.models.categoria import Categoria
from app.schemas.categoria import CategoriaCreate

def obtener_categorias(db: Session):
    return db.query(Categoria).all()

def crear_categoria(db: Session, categoria: CategoriaCreate):
    nueva_categoria = Categoria(**categoria.dict())
    db.add(nueva_categoria)
    db.commit()
    db.refresh(nueva_categoria)
    return nueva_categoria
