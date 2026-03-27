from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ContributionBase(BaseModel):
    amount: float
    type: Optional[str] = "regular"
    note: Optional[str] = None

class ContributionCreate(ContributionBase):
    pass

class ContributionOut(ContributionBase):
    id: int
    user_id: int
    date: datetime

    class Config:
        from_attributes = True
