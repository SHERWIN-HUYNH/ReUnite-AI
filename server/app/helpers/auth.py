from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from app.services.auth_service import decode_token, get_user_by_id

bearer = HTTPBearer()


async def get_current_user(token=Depends(bearer)):
    """FastAPI dependency — extracts and verifies the JWT, returns the user document."""
    payload = decode_token(token.credentials)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token không hợp lệ")

    user = await get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Người dùng không tồn tại")

    return user
