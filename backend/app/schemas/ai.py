from typing import List, Optional, Literal
from pydantic import BaseModel, Field, constr

class AIResponse(BaseModel):
    """
    Common structured response format for all AI interactions.
    Designed to be used as a standardized output schema across Fan, Volunteer, and Organizer roles.
    """
    summary: str = Field(..., description="A brief, 1-2 sentence summary of the AI's understanding or response.")
    recommendation: str = Field(..., description="The main advice, answer, or suggested course of action.")
    priority: str = Field(..., description="The priority level of the situation (e.g., 'low', 'medium', 'high', 'critical').")
    confidence: float = Field(..., description="A confidence score between 0.0 and 100.0 indicating how certain the AI is.")
    actions: List[str] = Field(..., description="A list of specific, actionable steps to take.")
    notes: Optional[str] = Field(default=None, description="Any additional context, warnings, or secondary information.")

class AIQueryRequest(BaseModel):
    """
    Standard request payload for AI queries.
    """
    role: Literal["fan", "volunteer", "organizer"] = Field(..., description="The persona the AI should adopt.")
    query: str = Field(..., min_length=1, description="The user's query. Must not be empty.")
