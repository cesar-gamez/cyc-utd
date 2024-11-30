import os
import csv
import re
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from pydantic import BaseModel, EmailStr
from typing import List, Optional

DEFAULT_HEADSHOT = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwxCN33LtdMLbWdhafc4HxabqpaU0qVbDxQ&s"
GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1Msco1nZ9vCOP2rR9mAzHvBeRFxImp0nn2sDDvT6t4a4/export?format=csv"
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY", "")

EMAIL_TEMPLATES = {
    "contact_form": """
        Someone has filled out the contact form on the CYC UT Dallas website. Here are the details:<br><br>
        Email: {}<br>Subject: {}<br>Message: {}<br>
    """,
    "confirmation": """
        <p>Thank you for contacting Consult Your Community UT Dallas. We've received your message.</p>
        <p>This is a no-reply email. For further inquiries, email <a href="mailto:utdallas@consultyourcommunity.org">utdallas@consultyourcommunity.org</a>.</p>
        <p>Best regards,<br>Consult Your Community UT Dallas Team</p>
        <p><a href="https://utdcyc.com">utdcyc.com</a></p>
    """,
}

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

class ContactForm(BaseModel):
    email: EmailStr
    subject: str
    message: str

app = FastAPI(
    title="Consult Your Community API",
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
    allow_headers=["*"]
)

sg = SendGridAPIClient(SENDGRID_API_KEY)

def send_email(recipient: str, subject: str, content: str):
    try:
        message = Mail(
            from_email="noreply@utdcyc.com", 
            to_emails=recipient, 
            subject=subject, 
            html_content=content
        )
        sg.send(message)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Failed to send email: {str(e)}")

def transform_headshot_url(url: Optional[str]) -> str:
    match = re.search(r"https://drive.google.com/file/d/(.*?)/view", url or "")
    return f"https://lh3.googleusercontent.com/d/{match.group(1)}" if match else (url or DEFAULT_HEADSHOT)

def parse_roster_data(csv_content: str) -> RosterResponse:
    positions = {"executives": [], "senior_analysts": [], "junior_analysts": []}
    
    for row in csv.DictReader(csv_content.splitlines()):
        position = row.get("Position", "").lower()
        member_data = {
            "first_name": row.get("First Name", "").strip(),
            "last_name": row.get("Last Name", "").strip(),
            "email": row.get("Email", "").strip(),
            "major": row.get("Major", "").strip(),
            "graduation_year": f"'{row.get('Graduation Year', '')[-2:]}",
            "linkedin": row.get("LinkedIn", "").strip() or None,
            "headshot": transform_headshot_url(row.get("Headshot", "")),
        }
        
        if "president" in position:
            positions["executives"].append(ExecutiveMember(position=row.get("Position", "").strip(), **member_data))
        elif "senior analyst" in position:
            positions["senior_analysts"].append(TeamMember(**member_data))
        elif "junior analyst" in position:
            positions["junior_analysts"].append(TeamMember(**member_data))
    
    return RosterResponse(
        executives=positions["executives"],
        senior_analysts=sorted(positions["senior_analysts"], key=lambda x: x.first_name),
        junior_analysts=sorted(positions["junior_analysts"], key=lambda x: x.first_name),
    )

@app.get("/api/py/roster", response_model=RosterResponse)
def get_roster():
    try:
        response = requests.get(GOOGLE_SHEET_CSV_URL)
        response.raise_for_status()
        return parse_roster_data(response.text)
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch roster: {str(e)}")

@app.post("/api/py/contact_form")
def submit_contact_form(contact_form: ContactForm):
    try:
        send_email(contact_form.email, "Thank you for contacting CYC UT Dallas", EMAIL_TEMPLATES["confirmation"])
        send_email(
            "utdallas@consultyourcommunity.org", 
            contact_form.subject, 
            EMAIL_TEMPLATES["contact_form"].format(contact_form.email, contact_form.subject, contact_form.message)
        )
        return {"message": "Email sent successfully"}
    except HTTPException as e:
        raise e
    except Exception:
        raise HTTPException(status_code=500, detail="Email sending failed")

@app.get("/api/py/health_check")
def health_check():
    return {"status": "healthy"}
