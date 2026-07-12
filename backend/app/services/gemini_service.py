"""
app/services/gemini_service.py
Thin wrapper around the google-genai SDK (the successor to google-generativeai).
Initialised once at import time; reused for every request.
"""
import logging

from google import genai

from app.config import get_settings

logger = logging.getLogger(__name__)

# ── Module-level singleton client ─────────────────────────────────────────────
_client: genai.Client | None = None
_MODEL = "gemini-2.0-flash"


def _get_client() -> genai.Client:
    """Lazy-initialise the Gemini client exactly once."""
    global _client
    if _client is None:
        settings = get_settings()
        _client = genai.Client(api_key=settings.gemini_api_key)
        logger.info("Gemini client initialised (model=%s).", _MODEL)
    return _client


async def generate_response(prompt: str) -> str:
    """
    Send *prompt* to Gemini and return clean text.

    Raises
    ------
    RuntimeError
        If the Gemini API call fails for any reason.
    """
    try:
        client = _get_client()
        response = client.models.generate_content(
            model=_MODEL,
            contents=prompt,
        )
        return response.text.strip()
    except Exception as exc:
        logger.exception("Gemini API call failed: %s", exc)
        raise RuntimeError(f"Gemini API error: {exc}") from exc
