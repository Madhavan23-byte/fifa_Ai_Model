from fastapi import APIRouter, Body, HTTPException
from app.schemas.ai import AIQueryRequest, AIResponse
from app.services.ai_service import process_ai_query
from app.crud.crud_logs import log_ai_query

router = APIRouter(prefix="/ai", tags=["AI Engine"])

@router.post("/query", response_model=AIResponse, summary="Query the StadiumOps AI Engine")
async def ai_query_endpoint(request: AIQueryRequest = Body(...)) -> AIResponse:
    """
    Central AI Query endpoint.
    Accepts a role (fan, volunteer, organizer) and a user query.
    Returns a structured AIResponse (summary, recommendation, priority, confidence, actions, notes).
    """
    try:
        response = await process_ai_query(request)
        # Log success
        await log_ai_query(
            role=request.role,
            query=request.query,
            success=True,
            priority=response.priority
        )
        return response
    except HTTPException as e:
        # Log failure
        await log_ai_query(
            role=request.role,
            query=request.query,
            success=False,
            priority=None
        )
        raise e
    except Exception as e:
        # Log failure
        await log_ai_query(
            role=request.role,
            query=request.query,
            success=False,
            priority=None
        )
        raise e
