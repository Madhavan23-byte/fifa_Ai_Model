"""
app/routes/copilot.py
Operations Copilot — powered by Google Gemini.

POST /api/v1/copilot/chat
Receives an organizer query with stadium context and returns a
structured AI-generated action plan.
"""
import json
import logging

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

from app.services.gemini_service import generate_response

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/copilot", tags=["copilot"])

# ── System prompt ─────────────────────────────────────────────────────────────
_SYSTEM_PROMPT = """\
You are StadiumOps AI, an operational intelligence assistant for large football tournaments.
You receive real-time operational queries from stadium organizers and provide concise,
safety-focused recommendations.

Always respond ONLY with a valid JSON object — no markdown, no prose outside the JSON.

Required fields:
{
  "situation":      "<brief description of the situation>",
  "recommendation": "<concrete, numbered action steps>",
  "reason":         "<why this is the best course of action>",
  "priority":       "<CRITICAL | HIGH | MEDIUM | LOW>",
  "impact":         "<expected outcome if recommendation is followed>"
}
"""

# ── Request / Response models ─────────────────────────────────────────────────
class CopilotRequest(BaseModel):
    role: str = Field(default="organizer", description="Role of the requesting user")
    query: str = Field(..., min_length=5, description="Operational question or situation")


class CopilotResponse(BaseModel):
    situation: str
    recommendation: str
    reason: str
    priority: str
    impact: str


# ── Route ─────────────────────────────────────────────────────────────────────
@router.post(
    "/chat",
    response_model=CopilotResponse,
    status_code=status.HTTP_200_OK,
    summary="Operations Copilot — AI decision support",
)
async def copilot_chat(body: CopilotRequest) -> CopilotResponse:
    """
    Send an operational query to Gemini and receive a structured JSON
    action plan back.

    **Input:** `role` + `query`  
    **Output:** Structured `situation / recommendation / reason / priority / impact`
    """
    full_prompt = f"{_SYSTEM_PROMPT}\n\nOrganizer query: {body.query}"

    try:
        raw = await generate_response(full_prompt)
    except RuntimeError as exc:
        logger.error("Gemini service error: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI service is temporarily unavailable. Please try again.",
        ) from exc

    # ── Parse JSON from Gemini output ─────────────────────────────────────────
    # Strip accidental markdown fences that some model versions include.
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        lines = cleaned.splitlines()
        cleaned = "\n".join(
            line for line in lines if not line.startswith("```")
        ).strip()

    try:
        data = json.loads(cleaned)
    except json.JSONDecodeError as exc:
        logger.error("Failed to parse Gemini JSON: %s\nRaw response: %s", exc, raw)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="AI returned an unexpected response format. Please retry.",
        ) from exc

    # Validate presence of all required keys
    required = {"situation", "recommendation", "reason", "priority", "impact"}
    missing = required - data.keys()
    if missing:
        logger.error("Gemini response missing keys: %s", missing)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI response is incomplete. Missing: {', '.join(missing)}",
        )

    return CopilotResponse(**{k: str(data[k]) for k in required})
