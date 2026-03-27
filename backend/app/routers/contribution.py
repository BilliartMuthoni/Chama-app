from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.contribution import ContributionCreate, ContributionOut
from app.models.contribution import Contribution
from app.models.user import User
from typing import List

router = APIRouter(prefix="/api/contributions", tags=["contributions"])

@router.post("/", response_model=ContributionOut, status_code=status.HTTP_201_CREATED)
def create_contribution(data: ContributionCreate, db: Session = Depends(get_db)):
    # For demo, user_id=1. Replace with current user logic.
    contribution = Contribution(user_id=1, **data.dict())
    db.add(contribution)
    db.commit()
    db.refresh(contribution)
    return contribution

@router.get("/", response_model=List[ContributionOut])
def list_contributions(db: Session = Depends(get_db)):
    return db.query(Contribution).all()
