import resend
from app.core.config import settings

resend.api_key = settings.RESEND_API_KEY


def send_shortlist_email(candidate_email: str, filename: str):
    resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": candidate_email,
        "subject": "Congratulations! You’ve been shortlisted",
        "html": f"""
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Congratulations!</h2>
            <p>Your resume <strong>{filename}</strong> has been shortlisted.</p>
            <p>Our recruitment team was impressed with your profile.</p>
            <p>We will contact you soon with the next interview steps.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>AI Resume Screening Team</strong></p>
        </div>
        """
    })


def send_rejection_email(candidate_email: str, filename: str):
    resend.Emails.send({
        "from": "onboarding@resend.dev",
        "to": candidate_email,
        "subject": "Update on your application",
        "html": f"""
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Application Update</h2>
            <p>Thank you for applying with resume <strong>{filename}</strong>.</p>
            <p>After review, we have decided not to move forward at this time.</p>
            <p>We appreciate your interest and wish you success in your journey.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>AI Resume Screening Team</strong></p>
        </div>
        """
    })