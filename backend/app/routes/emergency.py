"""
app/routes/emergency.py
Emergency and incident management endpoints.
Dummy implementation — real incident logging + notifications arrive in a future module.
"""
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

router = APIRouter(prefix="/emergency", tags=["emergency"])


# ── Models ────────────────────────────────────────────────────────────────────
class IncidentRequest(BaseModel):
    type: str = Field(..., description="medical | crowd | fire | security | other")
    location: str = Field(..., description="Section, gate or description of location")
    description: str = Field(default="", description="Optional free-text description")
    reported_by: str = Field(default="anonymous", description="Role of the reporter")


class IncidentResponse(BaseModel):
    incident_id: str
    status: str
    triage_message: str
    nearest_help: str
    reported_at: str


class EmergencyContactResponse(BaseModel):
    name: str
    role: str
    phone: str
    zone: str


# ── Routes ────────────────────────────────────────────────────────────────────
@router.post(
    "/report",
    response_model=IncidentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Report an emergency incident",
)
async def report_incident(body: IncidentRequest) -> IncidentResponse:
    """
    Logs an incident and returns immediate triage guidance.
    AI classification and real logging will be added in a future module.
    """
    incident_id = f"INC-{uuid.uuid4().hex[:8].upper()}"
    now = datetime.now(timezone.utc).isoformat()

    # Triage message keyed on incident type
    triage_map = {
        "medical": "Stay calm. Medical staff have been notified and are on their way.",
        "crowd":   "Please move away from the crowded area. Follow steward instructions.",
        "fire":    "Evacuate calmly using the nearest marked exit. Do not use elevators.",
        "security": "Stay where you are. Security personnel have been alerted.",
    }
    triage_message = triage_map.get(
        body.type.lower(),
        "Help is on the way. Please follow the instructions of stadium staff.",
    )

    return IncidentResponse(
        incident_id=incident_id,
        status="received",
        triage_message=triage_message,
        nearest_help="Medical Station 1 — West Concourse, Level 0 (approx. 3 min walk)",
        reported_at=now,
    )


@router.get(
    "/contacts",
    response_model=list[EmergencyContactResponse],
    status_code=status.HTTP_200_OK,
    summary="Get emergency contact list",
)
async def get_emergency_contacts() -> list[EmergencyContactResponse]:
    """Returns the stadium emergency contact directory."""
    return [
        EmergencyContactResponse(name="James Okafor",   role="Operations Director", phone="+1 (555) 071-3900", zone="All"),
        EmergencyContactResponse(name="Dr. Sara Lee",   role="Chief Medical Officer",phone="+1 (555) 071-3901", zone="Medical"),
        EmergencyContactResponse(name="Tom Reynolds",   role="Security Lead",       phone="+1 (555) 071-3902", zone="Gates"),
        EmergencyContactResponse(name="Priya Sharma",   role="Crowd Safety",        phone="+1 (555) 071-3903", zone="Stands"),
    ]
