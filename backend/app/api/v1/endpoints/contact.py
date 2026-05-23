"""Contact form endpoints."""

# Core
import asyncio

# Libraries
from fastapi import APIRouter, BackgroundTasks, Depends, status
from sqlalchemy.orm import Session

# App - Core
from app.core.logging import get_logger

# App - Database
from app.db.session import get_db

# App - Models
from app.models.contact import ContactSubmission

# App - Schemas
from app.schemas.contact import ContactCreate, ContactResponse

# App - Services
from app.services import email_service, telegram_service

router = APIRouter()
logger = get_logger("portfolio")


async def send_contact_notifications(
    name: str,
    email: str,
    message: str,
    company: str | None,
    subject: str | None,
):
    """Send email and telegram notifications in background."""
    logger.info(
        "Sending contact notifications (email + telegram) for %s", name
    )
    results = await asyncio.gather(
        email_service.send_contact_notification(name, email, message, company, subject),
        telegram_service.send_contact_notification(name, email, message, company, subject),
        return_exceptions=True,
    )
    email_result = results[0]
    email_ok = email_result if not isinstance(email_result, BaseException) else False
    if isinstance(email_result, BaseException):
        logger.exception(
            "Contact email failed (Resend error): %s",
            email_result,
        )
    elif not email_ok:
        logger.warning(
            "Contact email was NOT sent. Check logs above for Resend error."
        )


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(
    contact_data: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """Submit a contact form (no rate limit in dev; add in production if needed)."""
    logger.info(
        "Contact form received from %s (%s), sending email to %s",
        contact_data.name,
        contact_data.email,
        getattr(email_service, "enabled", False),
    )
    contact = ContactSubmission(**contact_data.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)

    background_tasks.add_task(
        send_contact_notifications,
        contact_data.name,
        contact_data.email,
        contact_data.message,
        contact_data.company,
        contact_data.subject,
    )

    return contact
