"""Telegram notification service."""

# Core
import logging
from typing import Optional

# Libraries
import httpx

# App - Core
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class TelegramService:
    """Service for sending Telegram notifications."""

    def __init__(self):
        self.bot_token = settings.telegram_bot_token
        self.chat_id = settings.telegram_chat_id
        self.enabled = bool(self.bot_token and self.chat_id)

        if not self.enabled:
            logger.warning("Telegram not configured. Notifications disabled.")

    @property
    def api_url(self) -> str:
        return f"https://api.telegram.org/bot{self.bot_token}"

    async def send_message(self, text: str, parse_mode: str = "HTML") -> bool:
        """Send a message to the configured chat."""
        if not self.enabled:
            logger.info("Telegram service disabled. Skipping notification.")
            return False

        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.api_url}/sendMessage",
                    json={
                        "chat_id": self.chat_id,
                        "text": text,
                        "parse_mode": parse_mode,
                    },
                )
                response.raise_for_status()
                logger.info("Telegram message sent successfully")
                return True

        except Exception as e:
            logger.error(f"Failed to send Telegram message: {e}")
            return False

    async def send_contact_notification(
        self,
        name: str,
        email: str,
        message: str,
        company: Optional[str] = None,
        subject: Optional[str] = None,
    ) -> bool:
        """Send notification when someone submits the contact form."""
        text = f"""
📬 <b>Nova mensagem de contato</b>

<b>Nome:</b> {name}
<b>Email:</b> {email}
{f"<b>Empresa:</b> {company}" if company else ""}
{f"<b>Assunto:</b> {subject}" if subject else ""}

<b>Mensagem:</b>
{message[:500]}{"..." if len(message) > 500 else ""}
        """.strip()

        return await self.send_message(text)


# Singleton instance
telegram_service = TelegramService()
