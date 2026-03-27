# Rules and shapes of data moving in and out of API.
# controls what frontend can send and what backend returns.

from pydantic import BaseModel, EmailStr
from typing import Optional

# user logs in with email and password. 
class Member(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    phone_number: Optional[str] = None

class MemberCreate(Member):
    password: str

class MemberOut(Member):
    id: int
    is_active: bool

class MemberInDB(Member):
    id: int
    hashed_password: str

class MemberUpdate(BaseModel):
    full_name: Optional[str] = None
    phone_number: Optional[str] = None


