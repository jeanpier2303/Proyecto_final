from sqlalchemy import Column, BigInteger, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.db import Base

class DeliveryAssignment(Base):
    __tablename__ = "delivery_assignments"

    id = Column(BigInteger, primary_key=True, index=True)
    order_id = Column(BigInteger, ForeignKey("orders.id"), nullable=False)
    delivery_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)
    assigned_at = Column(DateTime, default=func.now())

    order = relationship("Order")
    delivery = relationship("User")
