from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NotificationBase(BaseModel):
    message: str
    type: Optional[str] = "info"

class NotificationCreate(NotificationBase):
    user_id: Optional[int] = None

class NotificationOut(NotificationBase):
    id: int
    user_id: Optional[int]
    created_at: datetime
    read: bool

    class Config:
        from_attributes = True
