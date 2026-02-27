from fastapi import APIRouter, HTTPException, Query, Path
from typing import Optional
from app.schemas.test import HelloRequest, HelloResponse

router = APIRouter(
    prefix="/hello",
    tags=["Hello API"]
)

# 1. GET request đơn giản
@router.get("/")
async def hello_world():
    """
    Endpoint đơn giản nhất - GET /hello/
    Trả về message chào mừng
    """
    return {
        "message": "Hello World from ReUnite AI!",
        "status": "success"
    }

# 2. GET request với query parameters
@router.get("/greet")
async def greet_user(
    name: str = Query(..., description="Tên người dùng"),
    age: Optional[int] = Query(None, ge=0, le=150, description="Tuổi")
):
    """
    GET request với query parameters
    Ví dụ: GET /hello/greet?name=John&age=25
    """
    message = f"Xin chào {name}!"
    if age:
        message += f" Bạn {age} tuổi."
    
    return {
        "message": message,
        "data": {
            "name": name,
            "age": age
        },
        "status": "success"
    }

# 3. GET request với path parameters
@router.get("/user/{user_id}")
async def get_user(
    user_id: int = Path(..., ge=1, description="ID người dùng")
):
    """
    GET request với path parameter
    Ví dụ: GET /hello/user/123
    """
    # Giả lập dữ liệu user
    fake_users = {
        1: {"id": 1, "name": "Nguyen Van A", "email": "a@example.com"},
        2: {"id": 2, "name": "Tran Thi B", "email": "b@example.com"},
    }
    
    user = fake_users.get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=404,
            detail=f"Không tìm thấy user với ID {user_id}"
        )
    
    return {
        "message": "Lấy thông tin user thành công",
        "data": user,
        "status": "success"
    }

# 4. POST request với request body
@router.post("/create", response_model=HelloResponse)
async def create_greeting(request: HelloRequest):
    """
    POST request với request body (JSON)
    Body: {"name": "John", "age": 25}
    """
    message = f"Xin chào {request.name}!"
    if request.age:
        message += f" Bạn {request.age} tuổi."
    
    return HelloResponse(
        message=message,
        data=request.dict(),
        status="success"
    )

# 5. PUT request - Cập nhật thông tin
@router.put("/update/{user_id}")
async def update_user(
    user_id: int = Path(..., ge=1),
    request: HelloRequest = None
):
    """
    PUT request để cập nhật thông tin
    Ví dụ: PUT /hello/update/1
    Body: {"name": "New Name", "age": 30}
    """
    return {
        "message": f"Đã cập nhật thông tin user ID {user_id}",
        "data": {
            "user_id": user_id,
            "name": request.name,
            "age": request.age
        },
        "status": "success"
    }

# 6. DELETE request
@router.delete("/delete/{user_id}")
async def delete_user(user_id: int = Path(..., ge=1)):
    """
    DELETE request để xóa user
    Ví dụ: DELETE /hello/delete/1
    """
    return {
        "message": f"Đã xóa user ID {user_id}",
        "data": {"user_id": user_id},
        "status": "success"
    }