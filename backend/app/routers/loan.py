from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.loan import LoanCreate, LoanOut
from app.models.loan import Loan
from app.models.user import User
from typing import List

router = APIRouter(prefix="/api/loans", tags=["loans"])

@router.post("/", response_model=LoanOut, status_code=status.HTTP_201_CREATED)
def apply_loan(data: LoanCreate, db: Session = Depends(get_db)):
    # For demo, user_id=1. Replace with current user logic.
    loan = Loan(user_id=1, status="pending", **data.dict())
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return loan

@router.get("/", response_model=List[LoanOut])
def list_loans(db: Session = Depends(get_db)):
    return db.query(Loan).all()
