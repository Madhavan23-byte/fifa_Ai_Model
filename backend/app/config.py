"""
app/config.py — Centralised settings via pydantic-settings.
All environment variables are loaded from .env at startup.
"""
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ── App meta ──────────────────────────────────────────────────────────────
    app_name: str = "StadiumOps AI"
    app_version: str = "1.0.0"
    app_env: str = "development"

    # ── API keys ──────────────────────────────────────────────────────────────
    gemini_api_key: str

    # ── Database (wired up in a future module) ───────────────────────────────
    mongodb_uri: str = "mongodb://localhost:27017/stadiumops"

    # ── CORS ──────────────────────────────────────────────────────────────────
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",")]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


@lru_cache
def get_settings() -> Settings:
    """Singleton settings instance (cached after first call)."""
    return Settings()
