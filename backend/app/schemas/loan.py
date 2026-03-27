from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LoanBase(BaseModel):
    amount: float
    interest: Optional[float] = 0.0
    due_date: Optional[datetime] = None
    note: Optional[str] = None

class LoanCreate(LoanBase):
    pass

class LoanOut(LoanBase):
    id: int
    user_id: int
    status: str
    requested_at: datetime
    repaid: bool

    class Config:
        from_attributes = True
