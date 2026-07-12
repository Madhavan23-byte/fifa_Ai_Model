"""
app/routes/health.py
System health and version information endpoints.
"""
from fastapi import APIRouter
from pydantic import BaseModel

from app.config import get_settings

router = APIRouter(prefix="/health", tags=["health"])


class HealthResponse(BaseModel):
    status: str
    environment: str


class VersionResponse(BaseModel):
    name: str
    version: str


@router.get("", response_model=HealthResponse, summary="Health check")
async def health_check() -> HealthResponse:
    """Returns 200 OK when the service is running."""
    settings = get_settings()
    return HealthResponse(status="ok", environment=settings.app_env)


@router.get("/version", response_model=VersionResponse, summary="API version")
async def get_version() -> VersionResponse:
    """Returns the application name and current version."""
    settings = get_settings()
    return VersionResponse(name=settings.app_name, version=settings.app_version)
