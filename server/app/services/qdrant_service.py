import logging
from typing import List, Optional, Dict, Any
from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    VectorParams,
    PointStruct,
    ScoredPoint,
)
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class QdrantService:
    """Handles all Qdrant vector database operations."""

    def __init__(self):
        self.client = QdrantClient(
            host=settings.qdrant_host,
            port=settings.qdrant_port,
        )
        self.collection = settings.qdrant_collection
        self._ensure_collection()

    def _ensure_collection(self):
        """Create the collection if it doesn't exist yet."""
        existing = [c.name for c in self.client.get_collections().collections]
        if self.collection not in existing:
            self.client.create_collection(
                collection_name=self.collection,
                vectors_config=VectorParams(
                    size=settings.clip_embedding_dim,   # 512
                    distance=Distance.COSINE,
                ),
            )
            logger.info(f"Created Qdrant collection: {self.collection}")
        else:
            logger.info(f"Qdrant collection already exists: {self.collection}")

    def upsert_vector(
        self,
        point_id: str,
        vector: List[float],
        payload: Dict[str, Any],
    ) -> bool:
        """Store an embedding with its metadata payload."""
        try:
            self.client.upsert(
                collection_name=self.collection,
                points=[
                    PointStruct(
                        id=point_id,
                        vector=vector,
                        payload=payload,
                    )
                ],
            )
            return True
        except Exception as e:
            logger.error(f"Failed to upsert vector {point_id}: {e}")
            return False

    def search_vectors(
        self,
        vector: List[float],
        top_k: int = 5,
        score_threshold: Optional[float] = None,
    ) -> List[ScoredPoint]:
        """Find top-K most similar vectors."""
        try:
            results = self.client.search(
                collection_name=self.collection,
                query_vector=vector,
                limit=top_k,
                score_threshold=score_threshold,
                with_payload=True,
            )
            return results
        except Exception as e:
            logger.error(f"Vector search failed: {e}")
            return []

    def health_check(self) -> bool:
        """Return True if Qdrant is reachable."""
        try:
            self.client.get_collections()
            return True
        except Exception:
            return False


# Singleton — one shared instance per server process
qdrant_service = QdrantService()
