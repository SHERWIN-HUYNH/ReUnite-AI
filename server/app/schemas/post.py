from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field


class PostCreate(BaseModel):
    """Schema cho dữ liệu tạo bài đăng — nhận từ form data."""
    name: str = Field(..., min_length=1, max_length=100, description="Tên người mất tích")
    gender: str = Field(..., description="Giới tính")
    dob: Optional[str] = Field(None, description="Ngày sinh (YYYY-MM-DD)")
    missing_since: Optional[str] = Field(None, description="Mất tích từ ngày (YYYY-MM-DD)")
    description: Optional[str] = Field(None, description="Mô tả chi tiết")
    relationship: Optional[str] = Field(None, description="Quan hệ với người đăng")
    address: Optional[str] = Field(None, description="Địa chỉ / nơi mất tích")
    contact_info: str = Field(..., description="Thông tin liên hệ")
    status: str = Field("finding", description="Trạng thái: finding | found")


class PostResponse(BaseModel):
    """Schema trả về sau khi tạo bài đăng."""
    id: str
    account_id: str
    name: str
    gender: str
    dob: Optional[str] = None
    missing_since: Optional[str] = None
    description: Optional[str] = None
    relationship: Optional[str] = None
    address: Optional[str] = None
    contact_info: str
    status: str
    image_urls: List[str] = []
    qdrant_ids: List[str] = []
    created_at: datetime
    updated_at: datetime


class PostListResponse(BaseModel):
    """Schema danh sách bài đăng."""
    posts: List[PostResponse]
    total: int
