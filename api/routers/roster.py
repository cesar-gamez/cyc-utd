from api.core.notion import get_cyc_roster
from api.services.parse_roster import parse_roster
from api.models.roster import Roster
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/api/py/roster", response_model=Roster)
def get_roster():
    try:
        return parse_roster(get_cyc_roster())
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))