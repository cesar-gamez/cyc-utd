from pydantic import BaseModel, EmailStr, HttpUrl
from typing import Optional

class Member(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    major: str
    graduation_year: int
    position: str
    linkedin: Optional[HttpUrl] = None
    headshot: Optional[HttpUrl] = None