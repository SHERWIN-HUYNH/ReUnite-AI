---
description: How to run the ReUnite AI project (client, server, or full stack via Docker)
---

# Run ReUnite AI Project

## Option A — Full Stack with Docker (recommended)

Runs all services (Qdrant, FastAPI server, Next.js client) together.

// turbo
1. Start all services:
```
docker compose up --build
```

To stop:
```
docker compose down
```

---

## Option B — Run Services Locally (without Docker)

### 1. Start Qdrant (required by the server)
```
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
```

### 2. Start the FastAPI Server
Run from the `server/` directory using the project's virtual environment:

// turbo
2. Start the FastAPI server:
```
cd "c:\Users\USER\CODE\AI PROJECTS\ReUnite_AI\server" && ./reunite_ai/Scripts/uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload
```

Server available at: http://127.0.0.1:8000
API docs at: http://127.0.0.1:8000/docs

### 3. Start the Next.js Client
Run from the `client/` directory:

// turbo
3. Start the Next.js client:
```
cd "c:\Users\USER\CODE\AI PROJECTS\ReUnite_AI\client" && pnpm dev
```

Client available at: http://localhost:3000

---

## Quick Reference

| Service       | Command                                                    | URL                        |
|---------------|------------------------------------------------------------|----------------------------|
| Full stack    | `docker compose up --build`                               | —                          |
| FastAPI server| `cd server && ./reunite_ai/Scripts/uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload` | http://localhost:8000 |
| API docs      | *(server must be running)*                                | http://localhost:8000/docs |
| Next.js client| `cd client && pnpm dev`                                   | http://localhost:3000      |
| Qdrant DB     | `docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant`     | http://localhost:6333      |
