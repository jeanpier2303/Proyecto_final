from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# --- Base ---
class CategoriaBase(BaseModel):
    name: str
    slug: str

# --- Crear categoría ---
class CategoriaCreate(CategoriaBase):
    pass

# --- Respuesta ---
class CategoriaResponse(CategoriaBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # en Pydantic v2 reemplaza orm_mode
