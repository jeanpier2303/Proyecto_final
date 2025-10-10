from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Product(BaseModel):
    id: int
    sku: Optional[str] = None
    name: str
    slug: str
    short_desc: Optional[str] = None
    price: float
    stock: int
    active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
