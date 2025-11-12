from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db import Base

class PaymentMethod(Base):
    __tablename__ = "payment_methods"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(80), nullable=False, unique=True)
    code = Column(String(60), nullable=True)

    # Relationships
    payments = relationship("Payment", back_populates="payment_method")
