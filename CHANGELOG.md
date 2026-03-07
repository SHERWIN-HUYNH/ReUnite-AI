# CHANGELOG — ReUnite AI

## [3/6/2026] — API Tạo Bài Đăng Người Mất Tích (Server)

### Files mới (Server)
- **`server/app/schemas/post.py`** — Pydantic schemas: `PostCreate`, `PostResponse`, `PostListResponse`
- **`server/app/services/post_service.py`** — Business logic: Cloudinary upload → CLIP embedding → Qdrant upsert → MongoDB insert; thêm `get_posts`, `get_post_by_id`, `delete_post`, `update_post_status`
- **`server/app/api/routes/posts.py`** — FastAPI router `/posts`: POST (tạo), GET (danh sách), GET `/{id}` (chi tiết), PATCH `/{id}/status`, DELETE `/{id}`

### Files sửa (Server)
- **`server/app/main.py`** — Đăng ký `posts.router`

### Files sửa (Client)
- **`client/app/api/posts/route.ts`** — Đổi `FLASK_API_URL` → `API_URL`, đọc JWT từ `Authorization` header, thêm GET handler
- **`client/app/missingreport/page.tsx`** — Gửi JWT qua `Authorization: Bearer` header, thêm `setLoadingState`, bỏ `console.log` debug, sửa `finally` block

---

## [3/6/2026] — Sửa chức năng Login (Client)

### Đánh giá
Rà soát kết nối giữa `LoginForm.tsx` (client Next.js) và endpoint `/auth/login` (server FastAPI).  
Kết nối API cơ bản **đúng**: URL, body, CORS, response mapping đều khớp.  
Tuy nhiên, phát hiện 5 vấn đề cần sửa:

---

### Thay đổi trong `client/validation/login.ts`

**Vấn đề:** Schema chỉ có `email`, thiếu `password` → password không được Zod validate trước khi gọi API.  
Import 6 constant không dùng: `INCORRECT_PASSWORD`, `INPUT_REQUIRED`, `MAX_lENGTH_PHONE`, `MIN_LENGTH_PHONE`, `NAME_LENGTH`.

**Sửa:**
- Thêm `password: z.string().min(8, PASSWORD_LENGTH)` vào `LoginSchema`  
- Xóa 5 import constant không dùng

---

### Thay đổi trong `client/components/forms/LoginForm.tsx`

**Vấn đề 1 (đã sửa):** `currentPassword` dùng `useState` thay vì `react-hook-form/Controller` → không nhất quán, không validate qua Zod.

**Vấn đề 2 (đã sửa):** Bug `isLoading` không reset — khi submit mà password trống, `setIsLoading(true)` được gọi nhưng `return` sớm khiến `finally` block bị bỏ qua, button bị disabled mãi.

**Vấn đề 3 (đã sửa):** 4 `console.log` debug còn sót lại trong code production.

**Vấn đề 4 (đã bỏ):** Import `useEffect` không còn cần thiết sau khi tích hợp password vào form.

**Sửa:**
- Bỏ `useState currentPassword` và kiểm tra thủ công `if (!currentPassword)`
- Bỏ `useEffect` debug `form.formState.errors`  
- Thêm `password: ''` vào `defaultValues`
- Đổi `PasswordInput` sang dùng `Controller` từ `react-hook-form` → password validate đúng qua Zod, lỗi hiển thị inline
- Xóa toàn bộ `console.log` debug thừa (dòng 35, 36, 44, 84)
- Đổi `id="current_password"` → `id="password"` cho đúng tên field
