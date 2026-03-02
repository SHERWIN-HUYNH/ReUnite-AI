from pydantic import BaseModel, Field, EmailStr
from datetime import datetime


class UserRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: str = Field(..., min_length=5, max_length=100)
    password: str = Field(..., min_length=8, max_length=100)


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    role: str
    created_at: datetime