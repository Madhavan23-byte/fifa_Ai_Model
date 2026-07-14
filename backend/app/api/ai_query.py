from fastapi import APIRouter, Body
from app.schemas.ai import AIQueryRequest, AIResponse
from app.services.ai_service import process_ai_query

router = APIRouter(prefix="/ai", tags=["AI Engine"])

@router.post("/query", response_model=AIResponse, summary="Query the StadiumOps AI Engine")
async def ai_query_endpoint(request: AIQueryRequest = Body(...)) -> AIResponse:
    """
    Central AI Query endpoint.
    Accepts a role (fan, volunteer, organizer) and a user query.
    Returns a structured AIResponse (summary, recommendation, priority, confidence, actions, notes).
    """
    return await process_ai_query(request)
