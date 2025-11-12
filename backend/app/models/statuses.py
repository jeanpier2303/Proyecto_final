from sqlalchemy import Column, Integer, String
from app.db import Base

class Status(Base):
    __tablename__ = "statuses"

    id = Column(Integer, primary_key=True, index=True)
    entity = Column(String(50), nullable=False)
    code = Column(String(60), nullable=False)
    label = Column(String(120), nullable=False)
    description = Column(String(255))
    