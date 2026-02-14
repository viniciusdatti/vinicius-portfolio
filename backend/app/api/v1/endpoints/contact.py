"""Contact form endpoints."""

# Core
import asyncio
from typing import List

# Libraries
from fastapi import APIRouter, Depends, HTTPException, status, Request, BackgroundTasks
from sqlalchemy.orm import Session

# App - Database
from app.db.session import get_db

# App - Models
from app.models.contact import ContactSubmission, ContactStatus
from app.models.user import User

# App - Schemas
from app.schemas.contact import ContactCreate, ContactUpdate, ContactResponse

# App - API
from app.api.v1.endpoints.auth import get_current_user

# App - Core
from app.core.rate_limit import limiter, get_contact_rate_limit

# App - Services
from app.services import email_service, telegram_service

router = APIRouter()


async def send_contact_notifications(
    name: str,
    email: str,
    message: str,
    company: str | None,
    subject: str | None,
):
    """Send email and telegram notifications in background."""
    await asyncio.gather(
        email_service.send_contact_notification(name, email, message, company, subject),
        telegram_service.send_contact_notification(name, email, message, company, subject),
        return_exceptions=True,
    )


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit(get_contact_rate_limit())
async def submit_contact(
    request: Request,
    contact_data: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """Submit a contact form (rate limited)."""
    contact = ContactSubmission(**contact_data.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    
    # Send notifications in background
    background_tasks.add_task(
        send_contact_notifications,
        contact_data.name,
        contact_data.email,
        contact_data.message,
        contact_data.company,
        contact_data.subject,
    )
    
    return contact


# Admin endpoints
@router.get("", response_model=List[ContactResponse])
async def get_contacts(
    status_filter: ContactStatus | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all contact submissions (admin only)."""
    query = db.query(ContactSubmission)
    
    if status_filter:
        query = query.filter(ContactSubmission.status == status_filter)
    
    contacts = query.order_by(ContactSubmission.created_at.desc()).all()
    return contacts


@router.get("/{contact_id}", response_model=ContactResponse)
async def get_contact(
    contact_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a specific contact submission (admin only)."""
    contact = db.query(ContactSubmission).filter(ContactSubmission.id == contact_id).first()
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact submission not found",
        )
    return contact


@router.patch("/{contact_id}", response_model=ContactResponse)
async def update_contact_status(
    contact_id: int,
    contact_data: ContactUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update contact submission status (admin only)."""
    contact = db.query(ContactSubmission).filter(ContactSubmission.id == contact_id).first()
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact submission not found",
        )
    
    if contact_data.status:
        contact.status = contact_data.status
        if contact_data.status == ContactStatus.REPLIED:
            from datetime import datetime, timezone
            contact.replied_at = datetime.now(timezone.utc)
    
    db.commit()
    db.refresh(contact)
    return contact


@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contact(
    contact_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete a contact submission (admin only)."""
    contact = db.query(ContactSubmission).filter(ContactSubmission.id == contact_id).first()
    if not contact:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contact submission not found",
        )
    
    db.delete(contact)
    db.commit()
