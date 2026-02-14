"""Email service using Resend."""

# Core
import logging
from typing import Optional

# Libraries
import resend

# App - Core
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class EmailService:
    """Service for sending emails via Resend."""

    def __init__(self):
        if settings.resend_api_key:
            resend.api_key = settings.resend_api_key
            self.enabled = True
        else:
            self.enabled = False
            logger.warning("Resend API key not configured. Email service disabled.")

    async def send_contact_notification(
        self,
        name: str,
        email: str,
        message: str,
        company: Optional[str] = None,
        subject: Optional[str] = None,
    ) -> bool:
        """Send notification email when someone submits the contact form."""
        if not self.enabled:
            logger.info("Email service disabled. Skipping contact notification.")
            return False

        try:
            email_subject = f"[Portfolio] Nova mensagem de {name}"
            if subject:
                email_subject += f": {subject}"

            html_content = f"""
            <h2>Nova mensagem de contato</h2>
            <p><strong>Nome:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            {"<p><strong>Empresa:</strong> " + company + "</p>" if company else ""}
            {"<p><strong>Assunto:</strong> " + subject + "</p>" if subject else ""}
            <hr>
            <h3>Mensagem:</h3>
            <p>{message}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
                Esta mensagem foi enviada através do formulário de contato do seu portfólio.
            </p>
            """

            params = {
                "from": settings.email_from,
                "to": [settings.email_to_admin],
                "subject": email_subject,
                "html": html_content,
                "reply_to": email,
            }

            response = resend.Emails.send(params)
            logger.info(f"Contact notification email sent: {response}")
            return True

        except Exception as e:
            logger.error(f"Failed to send contact notification email: {e}")
            return False

    async def send_chat_notification(
        self,
        visitor_name: str,
        message: str,
        session_id: str,
    ) -> bool:
        """Send notification email when someone starts a chat."""
        if not self.enabled:
            logger.info("Email service disabled. Skipping chat notification.")
            return False

        try:
            html_content = f"""
            <h2>Nova conversa no Live Lab</h2>
            <p><strong>Visitante:</strong> {visitor_name}</p>
            <p><strong>Session ID:</strong> {session_id}</p>
            <hr>
            <h3>Primeira mensagem:</h3>
            <p>{message}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
                Acesse o painel admin para responder.
            </p>
            """

            params = {
                "from": settings.email_from,
                "to": [settings.email_to_admin],
                "subject": f"[Portfolio] Nova conversa de {visitor_name}",
                "html": html_content,
            }

            response = resend.Emails.send(params)
            logger.info(f"Chat notification email sent: {response}")
            return True

        except Exception as e:
            logger.error(f"Failed to send chat notification email: {e}")
            return False


# Singleton instance
email_service = EmailService()
