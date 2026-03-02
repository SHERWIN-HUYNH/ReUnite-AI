import motor.motor_asyncio
from app.core.config import get_settings

settings = get_settings()

# ── Motor async client ─────────────────────────────────────────────────
client = motor.motor_asyncio.AsyncIOMotorClient(settings.mongodb_url)

# ── Database ───────────────────────────────────────────────────────────
database = client["reunite_ai"]

# ── Collections ────────────────────────────────────────────────────────
users_collection = database["users"]
posts_collection = database["posts"]
