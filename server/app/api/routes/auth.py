from fastapi import APIRouter, HTTPException, status
from app.schemas.user import UserRequest, UserResponse
from app.services.auth_service import get_user_by_email, create_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(request: UserRequest):
    """Tạo tài khoản người dùng mới."""
    # 1. Kiểm tra email đã tồn tại chưa
    existing = await get_user_by_email(request.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email đã được đăng ký"
        )

    # 2. Tạo user mới (hash password bên trong service)
    user = await create_user(
        username=request.username,
        email=request.email,
        password=request.password,
    )

    return UserResponse(**user)
