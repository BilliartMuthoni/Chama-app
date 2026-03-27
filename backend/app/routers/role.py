from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.role import RoleCreate, RoleOut
from app.models.role import Role
from typing import List

router = APIRouter(prefix="/api/roles", tags=["roles"])

@router.post("/", response_model=RoleOut, status_code=status.HTTP_201_CREATED)
def create_role(data: RoleCreate, db: Session = Depends(get_db)):
    role = Role(**data.dict())
    db.add(role)
    db.commit()
    db.refresh(role)
    return role

@router.get("/", response_model=List[RoleOut])
def list_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()
