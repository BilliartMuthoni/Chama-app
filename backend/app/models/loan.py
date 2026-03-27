from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Loan(Base):
    __tablename__ = "loans"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    interest = Column(Float, default=0.0)
    status = Column(String, default="pending")  # pending, approved, rejected, repaid
    requested_at = Column(DateTime(timezone=True), server_default=func.now())
    due_date = Column(DateTime(timezone=True), nullable=True)
    repaid = Column(Boolean, default=False)
    note = Column(String, nullable=True)

    borrower = relationship("User", back_populates="loans")
