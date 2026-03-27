from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.auth import RegisterSchema, LoginSchema, UserResponseSchema, AuthResponse
from app.services.auth_service import register_user, login_user, get_current_user
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/api/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

@router.post("/register", response_model=UserResponseSchema, status_code=status.HTTP_201_CREATED)
def register(data: RegisterSchema, db: Session = Depends(get_db)):
    return register_user(db, data)

@router.post("/login", response_model=AuthResponse)
def login(data: LoginSchema, db: Session = Depends(get_db)):
    return login_user(db, data.email, data.password)

@router.get("/me", response_model=UserResponseSchema)
def get_me(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    return get_current_user(db, token)