from sqlalchemy import Column, Integer, String
from app.db import Base

class IdentificationType(Base):
    __tablename__ = "identification_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
