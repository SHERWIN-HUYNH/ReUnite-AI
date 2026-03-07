from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from app.api.routes import test     # Week 1 - CLIP search (needs cloudinary/qdrant)
from app.api.routes import search
from app.api.routes import auth
from app.api.routes import posts

app = FastAPI(
    title="ReUnite AI API",
    description="API cho hệ thống tìm kiếm người thất lạc",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:3001"],  # Next.js client
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
# app.include_router(test.router)    # Week 1 - enable after cloudinary is set up
app.include_router(search.router)
app.include_router(auth.router)
app.include_router(posts.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to ReUnite AI API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "ReUnite AI API"
    }