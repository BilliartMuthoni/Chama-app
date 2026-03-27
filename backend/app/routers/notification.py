from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.notification import NotificationCreate, NotificationOut
from app.models.notification import Notification
from typing import List

router = APIRouter(prefix="/api/notifications", tags=["notifications"])

@router.post("/", response_model=NotificationOut, status_code=status.HTTP_201_CREATED)
def create_notification(data: NotificationCreate, db: Session = Depends(get_db)):
    notification = Notification(**data.dict())
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification

@router.get("/", response_model=List[NotificationOut])
def list_notifications(db: Session = Depends(get_db)):
    return db.query(Notification).all()
