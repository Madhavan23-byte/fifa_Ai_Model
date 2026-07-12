"""
app/routes/match.py
Live match information endpoints.
Dummy implementation — real match data from DB will be wired in a future module.
"""
from fastapi import APIRouter, HTTPException, Path, status
from pydantic import BaseModel

router = APIRouter(prefix="/match", tags=["match"])


# ── Models ────────────────────────────────────────────────────────────────────
class TeamInfo(BaseModel):
    name: str
    code: str
    flag: str
    score: int


class MatchEvent(BaseModel):
    minute: int
    type: str          # goal | yellow | red | sub
    team: str
    player: str
    note: str


class MatchResponse(BaseModel):
    match_id: str
    home_team: TeamInfo
    away_team: TeamInfo
    status: str        # LIVE | FT | UPCOMING
    minute: int
    venue: str
    group: str
    events: list[MatchEvent]


class MatchSummaryResponse(BaseModel):
    match_id: str
    summary: str       # AI narrative — placeholder for now


# ── Routes ────────────────────────────────────────────────────────────────────
@router.get(
    "/live",
    response_model=MatchResponse,
    status_code=status.HTTP_200_OK,
    summary="Get the currently live match for the venue",
)
async def get_live_match() -> MatchResponse:
    """Returns seeded live match data (Brazil vs Germany, QF)."""
    return MatchResponse(
        match_id="match-2026-qf-01",
        home_team=TeamInfo(name="Brazil", code="BRA", flag="🇧🇷", score=2),
        away_team=TeamInfo(name="Germany", code="GER", flag="🇩🇪", score=1),
        status="LIVE",
        minute=78,
        venue="MetLife Stadium, New Jersey",
        group="Quarter Final",
        events=[
            MatchEvent(minute=22, type="goal",   team="BRA", player="Vinicius Jr.", note="Penalty kick"),
            MatchEvent(minute=35, type="goal",   team="GER", player="F. Wirtz",    note="Long range"),
            MatchEvent(minute=67, type="goal",   team="BRA", player="Rodrygo",     note="Header"),
            MatchEvent(minute=71, type="yellow", team="GER", player="T. Müller",   note="Tactical foul"),
        ],
    )


@router.get(
    "/{match_id}/summary",
    response_model=MatchSummaryResponse,
    status_code=status.HTTP_200_OK,
    summary="Get AI-generated match narrative summary",
)
async def get_match_summary(
    match_id: str = Path(..., description="Match identifier"),
) -> MatchSummaryResponse:
    """Returns a placeholder AI narrative — Gemini integration arrives in a future module."""
    return MatchSummaryResponse(
        match_id=match_id,
        summary=(
            "Brazil has dominated the quarter-final with two goals from set pieces. "
            "Germany pulled one back in the 35th minute through a stunning long-range strike. "
            "The match remains tense heading into the final 12 minutes."
        ),
    )
