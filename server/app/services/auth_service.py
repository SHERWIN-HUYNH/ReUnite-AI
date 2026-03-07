from datetime import datetime, timedelta
from fastapi import HTTPException, status
from passlib.context import CryptContext
from jose import jwt, JWTError
from bson import ObjectId
from app.db.database import users_collection
from app.core.config import get_settings

# ── Password hashing ───────────────────────────────────────────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# ── JWT ────────────────────────────────────────────────────────────────

def create_token(user_id: str, role: str) -> str:
    """Create a signed JWT containing user_id and role."""
    settings = get_settings()
    payload = {
        "sub": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(minutes=settings.jwt_expire_minutes),
    }
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def decode_token(token: str) -> dict:
    """Decode and verify a JWT. Raises 401 if invalid or expired."""
    settings = get_settings()
    try:
        return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token không hợp lệ hoặc đã hết hạn",
            headers={"WWW-Authenticate": "Bearer"},
        )


# ── User queries ───────────────────────────────────────────────────────

async def get_user_by_email(email: str):
    """Return the user document matching the email, or None."""
    return await users_collection.find_one({"email": email})


async def get_user_by_id(user_id: str):
    """Return the user document matching the ObjectId, or None."""
    return await users_collection.find_one({"_id": ObjectId(user_id)})


async def create_user(username: str, email: str, password: str, phone: str) -> dict:
    """Hash password, insert user into MongoDB, return created user dict."""
    user_doc = {
        "username": username,
        "email": email,
        "phone": phone,
        "hashed_password": get_password_hash(password),
        "role": "user",
        "created_at": datetime.now(),
    }
    result = await users_collection.insert_one(user_doc)
    return {
        "id": str(result.inserted_id),
        "username": username,
        "email": email,
        "phone": phone,
        "role": "user",
        "created_at": user_doc["created_at"],
    }
