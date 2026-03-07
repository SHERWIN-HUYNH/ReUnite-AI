from typing import List, Optional
from pydantic import BaseModel, Field


class IndexRequest(BaseModel):
    """Metadata sent alongside an image upload to index a new person."""
    name: str = Field(..., description="Full name of the missing person")
    age: Optional[int] = Field(None, ge=0, le=120, description="Age")
    gender: Optional[str] = Field(None, description="Gender")
    location: Optional[str] = Field(None, description="Last known location")
    description: Optional[str] = Field(None, description="Additional details")
    contact_info: Optional[str] = Field(None, description="Contact information")


class SearchRequest(BaseModel):
    """Text query for semantic search."""
    query: str = Field(..., min_length=3, description="Natural language description, e.g. 'người đàn ông đeo kính đen'")
    top_k: int = Field(5, ge=1, le=20, description="Number of results to return")


class SearchResult(BaseModel):
    """A single search result returned to the client."""
    id: str
    score: float = Field(..., description="Cosine similarity score (0-1)")
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    contact_info: Optional[str] = None
    image_url: Optional[str] = None


class SearchResponse(BaseModel):
    """Response wrapping a list of search results."""
    query: Optional[str] = None   # None for image-based searches
    results: List[SearchResult]
    total: int
