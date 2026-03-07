from fastapi import APIRouter, HTTPException, status, Depends
from app.schemas.user import UserRequest, UserResponse, LoginRequest, TokenResponse
from app.services.auth_service import (
    get_user_by_email,
    create_user,
    verify_password,
    create_token,
)
from app.helpers.auth import get_current_user

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
        phone=request.phone,
    )

    return UserResponse(**user)


@router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
async def login(request: LoginRequest):
    """Đăng nhập và nhận JWT access token."""
    # 1. Tìm user theo email
    user = await get_user_by_email(request.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email không tồn tại"
        )

    # 2. Kiểm tra mật khẩu
    if not verify_password(request.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Mật khẩu không chính xác"
        )

    # 3. Tạo JWT token
    token = create_token(str(user["_id"]), user["role"])

    user_response = UserResponse(
        id=str(user["_id"]),
        username=user["username"],
        email=user["email"],
        phone=user.get("phone", ""),
        role=user["role"],
        created_at=user["created_at"],
    )

    return TokenResponse(access_token=token, user=user_response)


@router.get("/me", response_model=UserResponse)
async def get_me(current_user=Depends(get_current_user)):
    """Trả về thông tin người dùng hiện tại (yêu cầu JWT)."""
    return UserResponse(
        id=str(current_user["_id"]),
        username=current_user["username"],
        email=current_user["email"],
        phone=current_user["phone"],
        role=current_user["role"],
        created_at=current_user["created_at"],
    )
