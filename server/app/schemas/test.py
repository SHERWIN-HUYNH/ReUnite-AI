from pydantic import BaseModel, Field
from typing import Optional

class HelloRequest(BaseModel):
    """Schema cho request gửi tên"""
    name: str = Field(..., min_length=1, max_length=50, description="Tên người dùng")
    age: Optional[int] = Field(None, ge=0, le=150, description="Tuổi (tùy chọn)")
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Nguyen Van A",
                "age": 25
            }
        }

class HelloResponse(BaseModel):
    """Schema cho response trả về"""
    message: str
    data: dict
    status: str = "success"
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "Xin chào Nguyen Van A!",
                "data": {"name": "Nguyen Van A", "age": 25},
                "status": "success"
            }
        }