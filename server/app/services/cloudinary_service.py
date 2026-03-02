import logging
import cloudinary
import cloudinary.uploader
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

# Configure Cloudinary once at import time
cloudinary.config(
    cloud_name=settings.cloudinary_cloud_name,
    api_key=settings.cloudinary_api_key,
    api_secret=settings.cloudinary_api_secret,
    secure=True,
)


class CloudinaryService:
    """Handles image upload to Cloudinary."""

    def upload_image(
        self,
        image_bytes: bytes,
        filename: str,
        folder: str = "reunite_ai/missing_persons",
    ) -> str:
        """
        Upload image bytes to Cloudinary.
        Returns the secure HTTPS URL of the uploaded image.
        """
        try:
            result = cloudinary.uploader.upload(
                image_bytes,
                folder=folder,
                public_id=filename,
                overwrite=True,
                resource_type="image",
            )
            url: str = result.get("secure_url", "")
            logger.info(f"Uploaded image to Cloudinary: {url}")
            return url
        except Exception as e:
            logger.error(f"Cloudinary upload failed for {filename}: {e}")
            raise


# Singleton
cloudinary_service = CloudinaryService()
