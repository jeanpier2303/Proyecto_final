from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# --- Base ---
class ProductoBase(BaseModel):
    name: str
    slug: Optional[str] = None
    price: float
    category_id: int

# --- Crear producto ---
class ProductoCreate(ProductoBase):
    pass

# --- Respuesta ---
class ProductoResponse(ProductoBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True  
