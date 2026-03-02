import uuid
import logging
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional
from app.schemas.search import IndexRequest, SearchRequest, SearchResponse, SearchResult
from app.services.clip_service import clip_service
from app.services.qdrant_service import qdrant_service
from app.services.cloudinary_service import cloudinary_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/search", tags=["Semantic Search"])


@router.post("/index", summary="Index a new missing person")
async def index_person(
    # Image file
    file: UploadFile = File(..., description="Photo of the missing person"),
    # Metadata fields sent as form fields alongside the file
    name: str = Form(...),
    age: Optional[int] = Form(None),
    gender: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    contact_info: Optional[str] = Form(None),
):
    """
    Upload an image + metadata for a missing person.
    - Stores the image on Cloudinary
    - Generates a CLIP embedding
    - Saves the vector + metadata to Qdrant
    """
    try:
        image_bytes = await file.read()

        # 1. Upload image to Cloudinary
        point_id = str(uuid.uuid4())
        image_url = cloudinary_service.upload_image(
            image_bytes=image_bytes,
            filename=point_id,
        )

        # 2. Generate CLIP embedding from image
        vector = clip_service.encode_image(image_bytes)

        # 3. Build metadata payload
        payload = {
            "name": name,
            "age": age,
            "gender": gender,
            "location": location,
            "description": description,
            "contact_info": contact_info,
            "image_url": image_url,
        }

        # 4. Store in Qdrant
        success = qdrant_service.upsert_vector(
            point_id=point_id,
            vector=vector,
            payload=payload,
        )

        if not success:
            raise HTTPException(status_code=500, detail="Failed to store vector in Qdrant")

        return {
            "message": "Person indexed successfully",
            "id": point_id,
            "image_url": image_url,
        }

    except Exception as e:
        logger.error(f"Index error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/semantic", response_model=SearchResponse, summary="Search by text description")
async def semantic_search(request: SearchRequest):
    """
    Search for missing persons using a natural language description.
    Example query: 'người đàn ông đeo kính đen, mặc áo xanh'
    Returns top-K most similar persons from the database.
    """
    try:
        # 1. Encode query text with CLIP
        query_vector = clip_service.encode_text(request.query)

        # 2. Search Qdrant for top-K similar vectors
        hits = qdrant_service.search_vectors(
            vector=query_vector,
            top_k=request.top_k,
        )

        # 3. Map results to response schema
        results = [
            SearchResult(
                id=str(hit.id),
                score=round(hit.score, 4),
                name=hit.payload.get("name", "Unknown"),
                age=hit.payload.get("age"),
                gender=hit.payload.get("gender"),
                location=hit.payload.get("location"),
                description=hit.payload.get("description"),
                contact_info=hit.payload.get("contact_info"),
                image_url=hit.payload.get("image_url"),
            )
            for hit in hits
        ]

        return SearchResponse(
            query=request.query,
            results=results,
            total=len(results),
        )

    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health", summary="Check Qdrant + CLIP health")
async def search_health():
    """Check that the CLIP model and Qdrant are both operational."""
    qdrant_ok = qdrant_service.health_check()
    return {
        "qdrant": "healthy" if qdrant_ok else "unreachable",
        "clip": "loaded",
        "status": "ok" if qdrant_ok else "degraded",
    }
