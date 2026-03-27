from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship 
from sqlalchemy.sql import func # used for default timestamp
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone_number = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default='member')
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    contributions = relationship("Contribution", back_populates="owner")
    loans = relationship("Loan", back_populates="borrower")


