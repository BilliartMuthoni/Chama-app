from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.auth import RegisterSchema, LoginSchema, UserResponseSchema, AuthResponse
from app.core.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException, status
from datetime import datetime

def register_user(db: Session, data: RegisterSchema):
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    new_user = User(
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        phone_number=data.phone_number,
        hashed_password=hash_password(data.password),
        role="member"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return UserResponseSchema(
        id=new_user.id,
        email=new_user.email,
        first_name=new_user.first_name,
        last_name=new_user.last_name,
        phone_number=new_user.phone_number,
        role=new_user.role,
        is_active=new_user.is_active,
        created_at=new_user.created_at.isoformat() if isinstance(new_user.created_at, datetime) else str(new_user.created_at)
    )

def login_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    token = create_access_token(data={"sub": user.email})
    return AuthResponse(
        user=UserResponseSchema(
            id=user.id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            phone_number=user.phone_number,
            role=user.role,
            is_active=user.is_active,
            created_at=user.created_at.isoformat() if isinstance(user.created_at, datetime) else str(user.created_at)
        ),
        access_token=token
    )

def get_current_user(db: Session, token: str):
    from app.core.security import verify_access_token
    payload = verify_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    email = payload.get("sub")
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    return UserResponseSchema(
        id=user.id,
        email=user.email,
        first_name=user.first_name,
        last_name=user.last_name,
        phone_number=user.phone_number,
        role=user.role,
        is_active=user.is_active,
        created_at=user.created_at.isoformat() if isinstance(user.created_at, datetime) else str(user.created_at)
    )