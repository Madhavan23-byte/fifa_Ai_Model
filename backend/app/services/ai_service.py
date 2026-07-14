import json
import logging
from typing import Dict, Any

from fastapi import HTTPException
from google.genai import types

from app.core.gemini import get_gemini_client, is_gemini_available
from app.schemas.ai import AIResponse, AIQueryRequest
from app.prompts.fan_assistant import FAN_ASSISTANT_PROMPT
from app.prompts.volunteer_assistant import VOLUNTEER_ASSISTANT_PROMPT
from app.prompts.organizer_copilot import ORGANIZER_COPILOT_PROMPT

logger = logging.getLogger(__name__)

# Map roles to their respective prompts
PROMPT_MAP = {
    "fan": FAN_ASSISTANT_PROMPT,
    "volunteer": VOLUNTEER_ASSISTANT_PROMPT,
    "organizer": ORGANIZER_COPILOT_PROMPT
}

async def process_ai_query(request: AIQueryRequest) -> AIResponse:
    """
    Central AI Query processor.
    Routes the query to Gemini using the appropriate persona prompt,
    enforcing a strict AIResponse JSON schema.
    """
    # 1. Check Gemini Availability
    status = is_gemini_available()
    if not status["available"]:
        logger.error(f"Gemini is unavailable: {status['reason']}")
        raise HTTPException(
            status_code=503,
            detail=f"AI Service is currently unavailable. Reason: {status['reason']}"
        )

    client = get_gemini_client()
    if not client:
         raise HTTPException(status_code=503, detail="Gemini client could not be initialized.")

    # 2. Get Persona Prompt
    system_prompt = PROMPT_MAP.get(request.role)
    if not system_prompt:
        raise HTTPException(status_code=400, detail=f"Unsupported role: {request.role}")

    # 3. Call Gemini
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=request.query,
            config=types.GenerateContentConfig(
                system_instruction=system_prompt,
                response_mime_type="application/json",
                response_schema=AIResponse,
                temperature=0.2, # Keep it deterministic and factual
            )
        )
        
        # Extract raw data to pass to normalizer
        raw_data = {}
        if hasattr(response, 'parsed') and response.parsed:
            raw_data = response.parsed
        elif response.text:
            try:
                raw_data = json.loads(response.text)
            except json.JSONDecodeError:
                raw_data = {}

        if not raw_data:
            raise ValueError("Empty response from Gemini")
            
        from app.utils.normalizer import normalize_ai_response
        return normalize_ai_response(raw_data)

    except Exception as e:
        logger.error(f"Gemini generation failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Failed to generate AI response. Please try again later."
        )

# Kept for backwards compatibility / future direct usage
async def generate_fan_response(user_query: str) -> AIResponse:
    return await process_ai_query(AIQueryRequest(role="fan", query=user_query))

async def generate_volunteer_response(user_query: str) -> AIResponse:
    return await process_ai_query(AIQueryRequest(role="volunteer", query=user_query))

async def generate_organizer_response(context_data: dict) -> AIResponse:
    query = json.dumps(context_data)
    return await process_ai_query(AIQueryRequest(role="organizer", query=query))
