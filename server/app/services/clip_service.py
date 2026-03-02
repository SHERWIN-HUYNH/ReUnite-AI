import logging
from typing import List
from io import BytesIO
import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class CLIPService:
    """Encodes text and images into CLIP embeddings (512-dim vectors)."""

    def __init__(self):
        logger.info(f"Loading CLIP model: {settings.clip_model_name}")
        self.model = CLIPModel.from_pretrained(settings.clip_model_name)
        self.processor = CLIPProcessor.from_pretrained(settings.clip_model_name)
        self.model.eval()
        logger.info("CLIP model loaded successfully.")

    def encode_text(self, text: str) -> List[float]:
        """Convert a text description into a 512-dim embedding vector."""
        inputs = self.processor(
            text=[text],
            return_tensors="pt",
            padding=True,
            truncation=True,
        )
        with torch.no_grad():
            features = self.model.get_text_features(**inputs)
            # Normalize to unit vector for cosine similarity
            features = features / features.norm(dim=-1, keepdim=True)
        return features[0].tolist()

    def encode_image(self, image_bytes: bytes) -> List[float]:
        """Convert raw image bytes into a 512-dim embedding vector."""
        image = Image.open(BytesIO(image_bytes)).convert("RGB")
        inputs = self.processor(images=image, return_tensors="pt")
        with torch.no_grad():
            features = self.model.get_image_features(**inputs)
            features = features / features.norm(dim=-1, keepdim=True)
        return features[0].tolist()


# Singleton — loaded once at server startup (heavy model)
clip_service = CLIPService()
