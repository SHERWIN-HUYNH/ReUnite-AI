# 📖 Week 1 — Vector Search & AI Core (CLIP + Qdrant + Cloudinary)

## Tổng quan

Week 1 xây dựng "bộ não" tìm kiếm mới cho hệ thống: thay vì chỉ tìm kiếm theo metadata (tên, tuổi...), hệ thống giờ đây có thể **tìm người bằng mô tả ngôn ngữ tự nhiên** như:

> _"bé gái khoảng 6 tuổi, mặc áo đỏ, đang khóc"_

---

## Kiến trúc

```
[Upload ảnh + metadata]          [Tìm kiếm bằng text]
        │                                 │
        ▼                                 ▼
POST /search/index           POST /search/semantic
        │                                 │
        ├─► Cloudinary                    ├─► CLIP (encode text → vector)
        │   (lưu ảnh, trả URL)           │
        ├─► CLIP (encode ảnh → vector)   └─► Qdrant (tìm top-K vector gần nhất)
        │                                          │
        └─► Qdrant (lưu vector + metadata)         └─► trả về danh sách kết quả + ảnh URL
```

---

## Các files đã tạo

### `app/core/config.py`
Quản lý toàn bộ cấu hình từ file `.env`:
- Địa chỉ Qdrant (`QDRANT_HOST`, `QDRANT_PORT`)  
- Thông tin Cloudinary (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`)
- Tên CLIP model (`clip-vit-base-patch32`)

---

### `app/services/clip_service.py`
Bộ chuyển đổi text/ảnh → vector số (512 chiều).

| Method | Input | Output |
|---|---|---|
| `encode_text(text)` | Chuỗi mô tả tiếng Việt/Anh | List 512 số thực |
| `encode_image(bytes)` | Bytes của ảnh | List 512 số thực |

> Model load 1 lần duy nhất khi server khởi động để tiết kiệm thời gian.

---

### `app/services/qdrant_service.py`
Kết nối với Qdrant và quản lý collection `missing_persons`.

| Method | Chức năng |
|---|---|
| `upsert_vector(id, vector, payload)` | Lưu 1 embedding + metadata vào Qdrant |
| `search_vectors(vector, top_k)` | Tìm top-K kết quả giống nhất |
| `health_check()` | Kiểm tra Qdrant có đang chạy không |

> Collection tự động được tạo khi server khởi động nếu chưa tồn tại.

---

### `app/services/cloudinary_service.py`
Upload ảnh lên Cloudinary và trả về URL công khai (HTTPS).

| Method | Input | Output |
|---|---|---|
| `upload_image(bytes, filename)` | Bytes ảnh + tên file | URL ảnh trên Cloudinary |

---

## API Endpoints

### `POST /search/index`
**Mục đích:** Thêm 1 người mất tích mới vào hệ thống.

**Request:** `multipart/form-data`
```
file        = [file ảnh]
name        = "Nguyễn Văn A"
age         = 10
gender      = "Nam"
location    = "Hà Nội"
description = "Tóc ngắn, mặc đồng phục xanh"
contact_info = "0912345678"
```

**Response:**
```json
{
  "message": "Person indexed successfully",
  "id": "uuid-của-điểm-trong-qdrant",
  "image_url": "https://res.cloudinary.com/..."
}
```

---

### `POST /search/semantic`
**Mục đích:** Tìm kiếm người bằng mô tả ngôn ngữ tự nhiên.

**Request:** `application/json`
```json
{
  "query": "người đàn ông đeo kính đen, mặc áo trắng",
  "top_k": 5
}
```

**Response:**
```json
{
  "query": "người đàn ông đeo kính đen, mặc áo trắng",
  "total": 3,
  "results": [
    {
      "id": "...",
      "score": 0.87,
      "name": "Trần Văn B",
      "age": 35,
      "gender": "Nam",
      "location": "TP.HCM",
      "image_url": "https://res.cloudinary.com/..."
    }
  ]
}
```

> `score` là độ tương đồng cosine (0 → 1). Càng cao càng khớp.

---

### `GET /search/health`
Kiểm tra trạng thái CLIP model và Qdrant.

```json
{
  "qdrant": "healthy",
  "clip": "loaded",
  "status": "ok"
}
```

---

## Cách chạy và kiểm tra

### 1. Chuẩn bị `.env`
```env
QDRANT_HOST=qdrant
QDRANT_PORT=6333
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Khởi động Docker
```bash
docker-compose up --build
```

### 3. Mở Swagger UI
Truy cập **http://localhost:8000/docs** để test các endpoint trực tiếp.

### 4. Kiểm tra Qdrant Dashboard
Truy cập **http://localhost:6333/dashboard** → xem collection `missing_persons` và các vector đã được index.

### 5. Chạy Tests
```bash
docker exec reunite_server pytest tests/test_search.py -v
```

---

## Luồng hoạt động điển hình

```
1. Admin upload ảnh người mất tích      → POST /search/index
   → Ảnh lưu trên Cloudinary            → Qdrant có thêm 1 vector mới

2. Người dùng tìm kiếm bằng mô tả      → POST /search/semantic
   → CLIP chuyển text thành vector
   → Qdrant tìm 5 vector gần nhất
   → Trả về danh sách người + ảnh URL
```

---

## Tech Stack Week 1

| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| CLIP (ViT-B/32) | `openai/clip-vit-base-patch32` | Chuyển text/ảnh thành vector |
| Qdrant | latest | Vector database, tìm kiếm cosine similarity |
| Cloudinary | 1.36.0 | Lưu trữ ảnh trên cloud |
| FastAPI | 0.104.1 | REST API server |
