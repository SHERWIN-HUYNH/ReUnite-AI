from typing import Optional

from pydantic import BaseModel, Field
from datetime import datetime


class UserRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: str = Field(..., min_length=5, max_length=100)
    password: str = Field(..., min_length=8, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=5, max_length=100)
    password: str = Field(..., min_length=8, max_length=100)


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    phone: Optional[str] = None
    role: str
    created_at: datetime


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse