from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import requests
import csv
import re

DEFAULT_HEADSHOT = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwxCN33LtdMLbWdhafc4HxabqpaU0qVbDxQ&s"
GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1Msco1nZ9vCOP2rR9mAzHvBeRFxImp0nn2sDDvT6t4a4/export?format=csv"

app = FastAPI(
    title="Consult Your Community Roster API",
    description="API for fetching team member information",
    docs_url="/api/py/docs", 
    openapi_url="/api/py/openapi.json", 
    redoc_url="/api/py/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TeamMember(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    major: str
    graduation_year: str
    linkedin: Optional[str] = None
    headshot: str = DEFAULT_HEADSHOT

class ExecutiveMember(TeamMember):
    position: str

class RosterResponse(BaseModel):
    executives: List[ExecutiveMember]
    senior_analysts: List[TeamMember]
    junior_analysts: List[TeamMember]

def fetch_csv_data() -> str:
    try:
        response = requests.get(GOOGLE_SHEET_CSV_URL)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        raise HTTPException(status_code=503, detail="Failed to fetch the CSV data from Google Sheets") from e

def transform_headshot_url(url: str) -> str:
    google_drive_pattern = re.compile(r"https://drive.google.com/file/d/(.*?)/view")
    match = google_drive_pattern.match(url)
    if match:
        file_id = match.group(1)
        return f"https://lh3.googleusercontent.com/d/{file_id}"
    return url or DEFAULT_HEADSHOT

def parse_roster_data(csv_content: str) -> RosterResponse:
    try:
        executives = []
        senior_analysts = []
        junior_analysts = []

        csv_reader = csv.DictReader(csv_content.splitlines())
        for row in csv_reader:
            try:
                position = row["Position"].strip().lower()
                headshot_url = transform_headshot_url(row.get("Headshot", "").strip())

                if "president" in position or "vice president" in position:
                    member = ExecutiveMember(
                        first_name=row["First Name"].strip(),
                        last_name=row["Last Name"].strip(),
                        email=row["Email"].strip(),
                        major=row["Major"].strip(),
                        graduation_year=row["Graduation Year"].strip(),
                        linkedin=row.get("LinkedIn", "").strip() or None,
                        headshot=headshot_url,
                        position=row["Position"].strip()
                    )
                    executives.append(member)
                elif "senior analyst" in position:
                    member = TeamMember(
                        first_name=row["First Name"].strip(),
                        last_name=row["Last Name"].strip(),
                        email=row["Email"].strip(),
                        major=row["Major"].strip(),
                        graduation_year=row["Graduation Year"].strip(),
                        linkedin=row.get("LinkedIn", "").strip() or None,
                        headshot=headshot_url
                    )
                    senior_analysts.append(member)
                elif "junior analyst" in position:
                    member = TeamMember(
                        first_name=row["First Name"].strip(),
                        last_name=row["Last Name"].strip(),
                        email=row["Email"].strip(),
                        major=row["Major"].strip(),
                        graduation_year=row["Graduation Year"].strip(),
                        linkedin=row.get("LinkedIn", "").strip() or None,
                        headshot=headshot_url
                    )
                    junior_analysts.append(member)
            except KeyError as e:
                raise HTTPException(status_code=400, detail=f"Missing or malformed data in the CSV: {e}") from e

        senior_analysts.sort(key=lambda x: (x.first_name, x.last_name))
        junior_analysts.sort(key=lambda x: (x.first_name, x.last_name))

        return RosterResponse(
            executives=executives, 
            senior_analysts=senior_analysts, 
            junior_analysts=junior_analysts
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to parse the roster data") from e

@app.get("/api/py/roster", response_model=RosterResponse)
def get_roster():
    try:
        csv_content = fetch_csv_data()
        return parse_roster_data(csv_content)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="An unexpected error occurred") from e

@app.get("/api/py/health_check")
def health_check():
    return {"status": "OK"}
