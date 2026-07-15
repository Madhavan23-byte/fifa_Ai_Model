from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from app.config import get_settings
from app.api import health, ai_query
from app.core.db import connect_to_mongo, close_mongo_connection

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="Backend foundation for StadiumOps AI",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

cors_kwargs = {
    "allow_methods": ["*"],
    "allow_headers": ["*"],
    "allow_credentials": True,
}
if "*" in settings.cors_origins_list:
    cors_kwargs["allow_origins"] = ["*"]
    cors_kwargs["allow_credentials"] = False
else:
    cors_kwargs["allow_origins"] = settings.cors_origins_list

app.add_middleware(CORSMiddleware, **cors_kwargs)

# API router
app.include_router(health.router, prefix="/api/v1")
app.include_router(ai_query.router, prefix="/api/v1")

@app.get("/", include_in_schema=False)
async def root() -> RedirectResponse:
    return RedirectResponse(url="/docs")
