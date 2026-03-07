"""Email service using Resend."""

# Core
import asyncio
from typing import Optional

# Libraries
import resend

# App - Core
from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger("portfolio")
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

            from_address = settings.email_from
            if "@" in from_address and " <" not in from_address:
                from_address = f"Portfolio <{from_address}>"
            params = {
                "from": from_address,
                "to": [settings.email_to_admin],
                "subject": email_subject,
                "html": html_content,
                "reply_to": email,
            }

            # Resend SDK is sync; run in thread to avoid blocking the event loop
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info(
                "Contact notification email sent to %s",
                settings.email_to_admin,
            )
            return True

        except Exception as e:
            logger.error(
                "Failed to send contact notification email: %s. "
                "Check RESEND_API_KEY, EMAIL_FROM (must be verified domain in Resend), and Resend dashboard.",
                e,
                exc_info=True,
            )
            return False

    async def send_test_email(self) -> tuple[bool, str]:
        """
        Send a single test email to EMAIL_TO_ADMIN (for debugging).
        Returns (success, error_message). error_message is empty when success is True.
        """
        if not self.enabled:
            return (
                False,
                "Email service disabled: RESEND_API_KEY not set in backend/.env",
            )
        try:
            params = {
                "from": settings.email_from,
                "to": [settings.email_to_admin],
                "subject": "[Portfolio] Teste de envio",
                "html": "<p>E-mail de teste do portfólio. Se você recebeu, o Resend está OK.</p>",
            }
            await asyncio.to_thread(resend.Emails.send, params)
            logger.info("Test email sent to %s", settings.email_to_admin)
            return (True, "")
        except Exception as e:  # noqa: BLE001
            msg = f"{type(e).__name__}: {e}"
            logger.exception("Test email failed: %s", msg)
            return (False, msg)

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

            await asyncio.to_thread(resend.Emails.send, params)
            logger.info("Chat notification email sent to %s", settings.email_to_admin)
            return True

        except Exception as e:
            logger.error(f"Failed to send chat notification email: {e}")
            return False


# Singleton instance
email_service = EmailService()
