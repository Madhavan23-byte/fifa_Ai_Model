"""
app/main.py — FastAPI application entry point.

Registers:
  - CORS middleware (origins from .env)
  - API v1 router (health, copilot, navigation, match, emergency)
  - Root redirect to /docs for convenience
"""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.config import get_settings
from app.routes import health, copilot, navigation, match, emergency

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s — %(message)s",
)
logger = logging.getLogger(__name__)


# ── Lifespan ─────────────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    logger.info(
        "🟢 StadiumOps AI backend starting — env=%s", settings.app_env
    )
    yield
    logger.info("🔴 StadiumOps AI backend shutting down.")


# ── App instance ──────────────────────────────────────────────────────────────
settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description=(
        "GenAI-powered Match Operations & Fan Experience Platform "
        "for FIFA World Cup 2026."
    ),
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── API router ────────────────────────────────────────────────────────────────
API_PREFIX = "/api/v1"

app.include_router(health.router,     prefix=API_PREFIX)
app.include_router(copilot.router,    prefix=API_PREFIX)
app.include_router(navigation.router, prefix=API_PREFIX)
app.include_router(match.router,      prefix=API_PREFIX)
app.include_router(emergency.router,  prefix=API_PREFIX)


# ── Root redirect ─────────────────────────────────────────────────────────────
@app.get("/", include_in_schema=False)
async def root() -> RedirectResponse:
    return RedirectResponse(url="/docs")
