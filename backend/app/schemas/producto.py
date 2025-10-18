from pydantic import BaseModel
from typing import Optional

class ProductoCreate(BaseModel):
    category_id: int
    name: str
    slug: str
    description: Optional[str] = None
    price: float
    stock: int
    active: bool = True
