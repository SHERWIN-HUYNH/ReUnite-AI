# ReUnite AI 🔍

AI-powered missing person search platform using CLIP embeddings and Qdrant vector search.

---

## 🚀 Running the Project

### Option A — Full Stack with Docker *(recommended)*

Starts all three services (Qdrant, FastAPI, Next.js) in one command.

```bash
# From the project root
docker compose up --build
```

| Service       | URL                          |
|---------------|------------------------------|
| Next.js client | http://localhost:3000       |
| FastAPI server | http://localhost:8000       |
| API docs (Swagger) | http://localhost:8000/docs |
| Qdrant dashboard | http://localhost:6333/dashboard |

To stop:
```bash
docker compose down
```

---

### Option B — Run Locally (without Docker)

Run each service separately in its own terminal.

#### 1. Qdrant Vector Database
```bash
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
```

#### 2. FastAPI Server
```bash
cd server
./reunite_ai/Scripts/uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload
```
> Available at http://127.0.0.1:8000 — docs at http://127.0.0.1:8000/docs

#### 3. Next.js Client
```bash
cd client
pnpm dev
```
> Available at http://localhost:3000

---

## 📦 Project Structure

```
ReUnite_AI/
├── client/          # Next.js 16 frontend (pnpm)
├── server/          # FastAPI backend + CLIP/Qdrant
│   ├── app/         # Application code
│   ├── reunite_ai/  # Python virtual environment
│   ├── run.sh       # Convenience start script
│   └── .env         # Secrets (never commit)
├── docker-compose.yml
└── README.md
```

---

## 🛠️ First-time Setup (local)

```bash
# Server — create & activate venv, install deps
cd server
python -m venv reunite_ai
./reunite_ai/Scripts/activate    # Windows
pip install -r requirements.txt

# Client — install deps
cd client
pnpm install
```
