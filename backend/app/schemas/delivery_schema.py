from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class DeliveryAssignRequest(BaseModel):
    delivery_id: int

class DeliveryStatusUpdate(BaseModel):
    status_id: int

class DeliveryAssignmentResponse(BaseModel):
    id: int
    order_id: int
    delivery_id: int
    assigned_at: datetime

    class Config:
        orm_mode = True
