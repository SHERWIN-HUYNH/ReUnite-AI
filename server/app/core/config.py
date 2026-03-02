from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ── Qdrant ─────────────────────────────────────────────────────────
    qdrant_host: str = "qdrant"
    qdrant_port: int = 6333
    qdrant_collection: str = "missing_persons"

    # ── Cloudinary ─────────────────────────────────────────────────────
    cloudinary_cloud_name: str = ""
    cloudinary_api_key: str = ""
    cloudinary_api_secret: str = ""

    # ── CLIP Model ─────────────────────────────────────────────────────
    clip_model_name: str = "openai/clip-vit-base-patch32"
    clip_embedding_dim: int = 512

    # ── MongoDB ────────────────────────────────────────────────────────
    mongodb_url: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    """Cached settings singleton — loaded once, reused everywhere."""
    return Settings()
