# Rules and shapes of data moving in and out of API.
# controls what frontend can send and what backend returns.

from pydantic import BaseModel, EmailStr
from typing import Optional

# Registration schema
class RegisterSchema(BaseModel):
	first_name: str
	last_name: str
	email: EmailStr
	password: str
	phone_number: Optional[str] = None

# Login schema
class LoginSchema(BaseModel):
	email: EmailStr
	password: str

# User response schema (matches frontend User type)
class UserResponseSchema(BaseModel):
	id: int
	email: EmailStr
	first_name: str
	last_name: str
	phone_number: Optional[str] = None
	role: str
	is_active: bool
	created_at: str

# Auth token response
class Token(BaseModel):
	access_token: str
	token_type: str = "bearer"

class AuthResponse(BaseModel):
	user: UserResponseSchema
	access_token: str
	refresh_token: Optional[str] = None

# Token data for internal use
class TokenData(BaseModel):
	email: Optional[str] = None
	
    



