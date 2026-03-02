"""
Week 1 Tests — CLIP + Qdrant + Search API
Run: docker exec reunite_server pytest tests/test_search.py -v
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


# ── Health ────────────────────────────────────────────────────────────────────

def test_search_health():
    """Qdrant and CLIP must both be operational."""
    response = client.get("/search/health")
    assert response.status_code == 200
    data = response.json()
    assert data["clip"] == "loaded"
    assert data["qdrant"] == "healthy"


# ── CLIP encoding ─────────────────────────────────────────────────────────────

def test_clip_text_encoding():
    """CLIP text encoder must return 512-dim vector."""
    from app.services.clip_service import clip_service
    vector = clip_service.encode_text("người đàn ông đeo kính đen")
    assert isinstance(vector, list)
    assert len(vector) == 512
    # Values should be roughly between -1 and 1 (normalized)
    assert all(-2.0 < v < 2.0 for v in vector)


def test_clip_image_encoding():
    """CLIP image encoder must return 512-dim vector from a small test PNG."""
    import io
    from PIL import Image
    from app.services.clip_service import clip_service

    # Create a tiny 32x32 white PNG in memory
    img = Image.new("RGB", (32, 32), color=(255, 255, 255))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    image_bytes = buf.getvalue()

    vector = clip_service.encode_image(image_bytes)
    assert isinstance(vector, list)
    assert len(vector) == 512


# ── Qdrant ────────────────────────────────────────────────────────────────────

def test_qdrant_connection():
    """Qdrant must be reachable."""
    from app.services.qdrant_service import qdrant_service
    assert qdrant_service.health_check() is True


def test_qdrant_collection_exists():
    """missing_persons collection must exist after server start."""
    from app.services.qdrant_service import qdrant_service
    from app.core.config import get_settings
    settings = get_settings()
    collections = [c.name for c in qdrant_service.client.get_collections().collections]
    assert settings.qdrant_collection in collections


# ── Semantic search endpoint  (no real data needed) ───────────────────────────

def test_semantic_search_returns_valid_schema():
    """
    /search/semantic should return a valid JSON with 'results' list
    even when the collection is empty (returns 0 results, not an error).
    """
    payload = {"query": "bé gái mặc áo đỏ khoảng 6 tuổi", "top_k": 5}
    response = client.post("/search/semantic", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "query" in data
    assert "results" in data
    assert isinstance(data["results"], list)
    assert "total" in data


def test_semantic_search_invalid_query():
    """Query shorter than 3 chars should return 422 validation error."""
    payload = {"query": "hi", "top_k": 5}
    response = client.post("/search/semantic", json=payload)
    assert response.status_code == 422
