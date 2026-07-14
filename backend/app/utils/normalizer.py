import logging
from typing import Dict, Any

from app.schemas.ai import AIResponse

logger = logging.getLogger(__name__)

def normalize_ai_response(raw_data: Any) -> AIResponse:
    """
    Normalizes the raw response from Gemini into a strict AIResponse object.
    Fills in sensible defaults for missing fields, normalizes priority strings,
    and clamps confidence scores.
    """
    # Convert Pydantic object to dict if necessary
    if isinstance(raw_data, AIResponse):
        data = raw_data.model_dump()
    elif isinstance(raw_data, dict):
        data = raw_data
    else:
        logger.warning(f"Unexpected raw_data type: {type(raw_data)}. Resetting to empty dict.")
        data = {}

    # 1. Normalize Summary
    summary = data.get("summary")
    if not summary or not isinstance(summary, str):
        summary = "No summary provided by the AI."

    # 2. Normalize Recommendation
    recommendation = data.get("recommendation")
    if not recommendation or not isinstance(recommendation, str):
        recommendation = "No specific recommendation available."

    # 3. Normalize Priority
    raw_priority = str(data.get("priority", "")).title().strip()
    valid_priorities = {"Low", "Medium", "High", "Critical"}
    if raw_priority in valid_priorities:
        priority = raw_priority
    else:
        priority = "Low" # Sensible default

    # 4. Normalize Confidence (ensure between 0 and 100)
    try:
        raw_conf = data.get("confidence", 0)
        confidence = float(raw_conf)
        # If the model returned a decimal (e.g. 0.85), convert it to 85.0
        if 0.0 < confidence <= 1.0 and isinstance(raw_conf, float):
            confidence = confidence * 100.0
            
        # Clamp between 0 and 100
        confidence = max(0.0, min(100.0, confidence))
    except (ValueError, TypeError):
        confidence = 0.0

    # 5. Normalize Actions
    raw_actions = data.get("actions", [])
    if isinstance(raw_actions, list):
        actions = [str(a) for a in raw_actions if a]
    elif isinstance(raw_actions, str):
        actions = [raw_actions]
    else:
        actions = []

    # 6. Normalize Notes
    notes = data.get("notes")
    if notes is not None and not isinstance(notes, str):
        notes = str(notes)

    return AIResponse(
        summary=summary,
        recommendation=recommendation,
        priority=priority,
        confidence=confidence,
        actions=actions,
        notes=notes
    )
