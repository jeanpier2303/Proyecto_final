from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from app.db import Base


class Categoria(Base):
    __tablename__ = "categories"  # nombre real en MySQL

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), nullable=False)
    created_at = Column(DateTime)

    # Relación con productos
    productos = relationship("Producto", back_populates="categoria", lazy="select")
