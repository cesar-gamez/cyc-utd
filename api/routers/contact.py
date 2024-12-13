from core.email import send_email
from models.contact_form import ContactForm
from fastapi import APIRouter, HTTPException

router = APIRouter()

EMAIL_TEMPLATES = {
    "contact_form": """
        Someone has filled out the contact form on the CYC UT Dallas website. Here are the details:<br><br>
        Email: {}<br>Subject: {}<br>Message: {}<br>
    """,
    "confirmation": """
        <p>Thank you for contacting Consult Your Community UT Dallas. We've received your message.</p>
        <p>This is a no-reply email. For further inquiries, email <a href="mailto:utdallas@consultyourcommunity.org">utdallas@consultyourcommunity.org</a>.</p>
        <p>Best regards,<br>Consult Your Community UT Dallas Team</p>
        <a href="https://utdcyc.com">utdcyc.com</a>
    """,
}

@router.post("/api/py/contact")
def submit_contact_form(contact_form: ContactForm):
    try:
        send_email(contact_form.email, "Thank you for contacting CYC UT Dallas", EMAIL_TEMPLATES["confirmation"])
        send_email(
            "utdallas@consultyourcommunity.org", 
            contact_form.subject, 
            EMAIL_TEMPLATES["contact_form"].format(contact_form.email, contact_form.subject, contact_form.message)
        )
        return {"message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))