from datetime import datetime
from passlib.context import CryptContext
from app.db.database import users_collection

# ── Password hashing ───────────────────────────────────────────────────
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# ── User queries ───────────────────────────────────────────────────────

async def get_user_by_email(email: str):
    """Return the user document matching the email, or None."""
    return await users_collection.find_one({"email": email})


async def create_user(username: str, email: str, password: str) -> dict:
    """Hash password, insert user into MongoDB, return created user dict."""
    user_doc = {
        "username": username,
        "email": email,
        "hashed_password": get_password_hash(password),
        "role": "user",
        "created_at": datetime.now(),
    }
    result = await users_collection.insert_one(user_doc)
    return {
        "id": str(result.inserted_id),
        "username": username,
        "email": email,
        "role": "user",
        "created_at": user_doc["created_at"],
    }
