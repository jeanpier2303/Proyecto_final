from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.db import Base

class Payment(Base):
    __tablename__ = "payments"
    __table_args__ = {"extend_existing": True}  # 👈 evita la redefinición

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    payment_method_id = Column(Integer, ForeignKey("payment_methods.id"), nullable=False)
    amount = Column(Float, nullable=False)
    payment_date = Column(DateTime, default=func.now())

    # Relationships
    order = relationship("Order", back_populates="payments")
    payment_method = relationship("PaymentMethod", back_populates="payments")
