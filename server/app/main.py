from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import test

app = FastAPI(
    title="ReUnite AI API",
    description="API cho hệ thống tìm kiếm người thất lạc",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js client
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(test.router)

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