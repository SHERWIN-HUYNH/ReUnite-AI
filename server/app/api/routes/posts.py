import logging
from typing import List, Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, Query, status

from app.helpers.auth import get_current_user
from app.schemas.post import PostResponse, PostListResponse
from app.services.post_service import (
    create_post,
    get_posts,
    get_post_by_id,
    delete_post,
    update_post_status,
)

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.post("/", response_model=PostResponse, status_code=status.HTTP_201_CREATED)
async def create_missing_post(
    # Form fields
    name: str = Form(..., description="Tên người mất tích"),
    gender: str = Form(..., description="Giới tính"),
    contact_info: str = Form(..., description="Thông tin liên hệ"),
    post_status: str = Form("finding", alias="status", description="Trạng thái: finding | found"),
    dob: Optional[str] = Form(None, description="Ngày sinh"),
    missing_since: Optional[str] = Form(None, description="Mất tích từ ngày"),
    description: Optional[str] = Form(None, description="Mô tả chi tiết"),
    relationship: Optional[str] = Form(None, description="Quan hệ với người mất tích"),
    address: Optional[str] = Form(None, description="Địa chỉ / nơi mất tích"),
    # Images (optional — post có thể không có ảnh ngay)
    images: List[UploadFile] = File(default=[], description="Ảnh người mất tích"),
    # Auth
    current_user: dict = Depends(get_current_user),
):
    """
    Tạo bài đăng người mất tích.
    - Yêu cầu đăng nhập (JWT Bearer token)
    - Upload tối đa nhiều ảnh
    - Mỗi ảnh được: upload Cloudinary → CLIP embedding → lưu Qdrant
    - Bài đăng được lưu vào MongoDB
    """
    try:
        post = await create_post(
            account_id=str(current_user["_id"]),
            name=name,
            gender=gender,
            contact_info=contact_info,
            status=post_status,
            images=images,
            dob=dob,
            missing_since=missing_since,
            description=description,
            relationship=relationship,
            address=address,
        )
        return PostResponse(**post)
    except Exception as e:
        logger.error(f"Create post error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Không thể tạo bài đăng: {str(e)}",
        )


@router.get("/", response_model=PostListResponse)
async def list_posts(
    post_status: Optional[str] = Query(None, alias="status", description="Lọc theo trạng thái: finding | found"),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
):
    """
    Lấy danh sách bài đăng người mất tích (public, không cần đăng nhập).
    Hỗ trợ lọc theo status và phân trang.
    """
    try:
        posts, total = await get_posts(status=post_status, skip=skip, limit=limit)
        return PostListResponse(posts=[PostResponse(**p) for p in posts], total=total)
    except Exception as e:
        logger.error(f"List posts error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Không thể lấy danh sách bài đăng",
        )


@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id: str):
    """Lấy chi tiết một bài đăng theo ID."""
    post = await get_post_by_id(post_id)
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy bài đăng",
        )
    return PostResponse(**post)


@router.patch("/{post_id}/status", response_model=PostResponse)
async def change_post_status(
    post_id: str,
    new_status: str = Form(..., description="Trạng thái mới: finding | found"),
    current_user: dict = Depends(get_current_user),
):
    """Cập nhật trạng thái bài đăng (chỉ chủ sở hữu)."""
    if new_status not in ("finding", "found"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Trạng thái không hợp lệ. Dùng: finding | found",
        )
    post = await update_post_status(
        post_id=post_id,
        account_id=str(current_user["_id"]),
        status=new_status,
    )
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy bài đăng hoặc bạn không có quyền",
        )
    return PostResponse(**post)


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_post(
    post_id: str,
    current_user: dict = Depends(get_current_user),
):
    """Xóa bài đăng (chỉ chủ sở hữu hoặc admin)."""
    user_id = str(current_user["_id"])
    is_admin = current_user.get("role") == "admin"

    if is_admin:
        # Admin có thể xóa bất kỳ bài nào
        from app.db.database import posts_collection
        from bson import ObjectId
        await posts_collection.delete_one({"_id": ObjectId(post_id)})
    else:
        deleted = await delete_post(post_id=post_id, account_id=user_id)
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Không tìm thấy bài đăng hoặc bạn không có quyền xóa",
            )
