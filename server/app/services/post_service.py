import logging
import uuid
from datetime import datetime
from typing import Optional, List

from fastapi import UploadFile

from app.db.database import posts_collection
from app.services.cloudinary_service import cloudinary_service
from app.services.clip_service import clip_service
from app.services.qdrant_service import qdrant_service

logger = logging.getLogger(__name__)


async def create_post(
    account_id: str,
    name: str,
    gender: str,
    contact_info: str,
    status: str,
    images: List[UploadFile],
    dob: Optional[str] = None,
    missing_since: Optional[str] = None,
    description: Optional[str] = None,
    relationship: Optional[str] = None,
    address: Optional[str] = None,
) -> dict:
    """
    Tạo bài đăng người mất tích:
    1. Upload ảnh lên Cloudinary
    2. Tạo CLIP embedding cho mỗi ảnh
    3. Lưu vector vào Qdrant
    4. Lưu bài đăng vào MongoDB
    """
    image_urls: List[str] = []
    qdrant_ids: List[str] = []
    now = datetime.now()

    # 1. Xử lý từng ảnh
    for img_file in images:
        image_bytes = await img_file.read()
        if not image_bytes:
            continue

        point_id = str(uuid.uuid4())

        # Upload lên Cloudinary
        try:
            url = cloudinary_service.upload_image(
                image_bytes=image_bytes,
                filename=point_id,
                folder="reunite_ai/missing_persons",
            )
            image_urls.append(url)
        except Exception as e:
            logger.warning(f"Cloudinary upload failed: {e}")
            continue

        # Tạo CLIP embedding & lưu vào Qdrant
        try:
            vector = clip_service.encode_image(image_bytes)
            payload = {
                "post_owner": account_id,
                "name": name,
                "gender": gender,
                "dob": dob,
                "missing_since": missing_since,
                "description": description,
                "address": address,
                "contact_info": contact_info,
                "image_url": url,
                "status": status,
            }
            success = qdrant_service.upsert_vector(
                point_id=point_id,
                vector=vector,
                payload=payload,
            )
            if success:
                qdrant_ids.append(point_id)
        except Exception as e:
            logger.warning(f"Qdrant upsert failed for {point_id}: {e}")

    # 2. Lưu bài đăng vào MongoDB
    post_doc = {
        "account_id": account_id,
        "name": name,
        "gender": gender,
        "dob": dob,
        "missing_since": missing_since,
        "description": description,
        "relationship": relationship,
        "address": address,
        "contact_info": contact_info,
        "status": status,
        "image_urls": image_urls,
        "qdrant_ids": qdrant_ids,
        "created_at": now,
        "updated_at": now,
    }

    result = await posts_collection.insert_one(post_doc)

    return {
        "id": str(result.inserted_id),
        "account_id": account_id,
        "name": name,
        "gender": gender,
        "dob": dob,
        "missing_since": missing_since,
        "description": description,
        "relationship": relationship,
        "address": address,
        "contact_info": contact_info,
        "status": status,
        "image_urls": image_urls,
        "qdrant_ids": qdrant_ids,
        "created_at": now,
        "updated_at": now,
    }


async def get_posts(
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 20,
) -> tuple[List[dict], int]:
    """Lấy danh sách bài đăng có phân trang."""
    query: dict = {}
    if status:
        query["status"] = status

    total = await posts_collection.count_documents(query)
    cursor = posts_collection.find(query).sort("created_at", -1).skip(skip).limit(limit)
    posts = []
    async for doc in cursor:
        doc["id"] = str(doc.pop("_id"))
        posts.append(doc)

    return posts, total


async def get_post_by_id(post_id: str) -> Optional[dict]:
    """Lấy một bài đăng theo ID."""
    from bson import ObjectId
    try:
        doc = await posts_collection.find_one({"_id": ObjectId(post_id)})
        if doc:
            doc["id"] = str(doc.pop("_id"))
        return doc
    except Exception:
        return None


async def delete_post(post_id: str, account_id: str) -> bool:
    """Xóa bài đăng (chỉ chủ sở hữu mới được xóa)."""
    from bson import ObjectId
    try:
        result = await posts_collection.delete_one({
            "_id": ObjectId(post_id),
            "account_id": account_id,
        })
        return result.deleted_count > 0
    except Exception:
        return False


async def update_post_status(post_id: str, account_id: str, status: str) -> Optional[dict]:
    """Cập nhật trạng thái bài đăng (finding / found)."""
    from bson import ObjectId
    try:
        result = await posts_collection.find_one_and_update(
            {"_id": ObjectId(post_id), "account_id": account_id},
            {"$set": {"status": status, "updated_at": datetime.now()}},
            return_document=True,
        )
        if result:
            result["id"] = str(result.pop("_id"))
        return result
    except Exception:
        return None
