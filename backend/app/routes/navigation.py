"""
app/routes/navigation.py
Stadium navigation and wayfinding endpoints.
Dummy implementation — real POI + directions logic will be added in a future module.
"""
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

router = APIRouter(prefix="/navigation", tags=["navigation"])


# ── Models ────────────────────────────────────────────────────────────────────
class DirectionsRequest(BaseModel):
    from_location: str = Field(..., description="Starting location or section")
    to_destination: str = Field(..., description="Target: seat, gate, amenity, etc.")
    accessibility: bool = Field(default=False, description="Accessibility mode")


class DirectionsResponse(BaseModel):
    from_location: str
    to_destination: str
    steps: list[str]
    estimated_minutes: int
    accessibility: bool


class POIResponse(BaseModel):
    id: str
    name: str
    type: str
    level: int
    section: str


# ── Routes ────────────────────────────────────────────────────────────────────
@router.post(
    "/directions",
    response_model=DirectionsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get step-by-step directions inside the stadium",
)
async def get_directions(body: DirectionsRequest) -> DirectionsResponse:
    """Returns dummy step-by-step walking directions between two stadium points."""
    return DirectionsResponse(
        from_location=body.from_location,
        to_destination=body.to_destination,
        steps=[
            f"Start at {body.from_location}",
            "Head towards the main concourse",
            "Take the ramp to Level 1",
            f"Arrive at {body.to_destination}",
        ],
        estimated_minutes=4,
        accessibility=body.accessibility,
    )


@router.get(
    "/pois",
    response_model=list[POIResponse],
    status_code=status.HTTP_200_OK,
    summary="List all points of interest in the stadium",
)
async def get_pois() -> list[POIResponse]:
    """Returns a static list of stadium POIs (seeded data placeholder)."""
    return [
        POIResponse(id="g1", name="Gate A", type="gate", level=0, section="North"),
        POIResponse(id="g2", name="Gate B", type="gate", level=0, section="South"),
        POIResponse(id="f1", name="Crescent Kitchen", type="food", level=1, section="East"),
        POIResponse(id="m1", name="Medical Station 1", type="medical", level=0, section="West"),
        POIResponse(id="t1", name="Toilets — Level 1 North", type="toilet", level=1, section="North"),
    ]
