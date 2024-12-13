from models.member import Member
from pydantic import BaseModel
from typing import List

class Roster(BaseModel):
    executives: List[Member]
    senior_analysts: List[Member]
    junior_analysts: List[Member]