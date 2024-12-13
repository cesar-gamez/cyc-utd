from core.config import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from fastapi import HTTPException

sg = SendGridAPIClient(settings.sendgrid_api_key)

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
        raise HTTPException(status_code=500, detail=str(e))