"""Certificates endpoints."""

# Core
from typing import List

# Libraries
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

# App - Core
from app.core.exceptions import NotFoundException

# App - Database
from app.db.session import get_db

# App - Models
from app.models.certificate import Certificate

# App - Schemas
from app.schemas.certificate import CertificateResponse

router = APIRouter()


@router.get("", response_model=List[CertificateResponse])
async def get_certificates(
    active_only: bool = True,
    db: Session = Depends(get_db),
):
    """Get all certificates."""
    query = db.query(Certificate)

    if active_only:
        query = query.filter(Certificate.is_active.is_(True))

    certificates = query.order_by(Certificate.display_order, Certificate.year.desc()).all()
    return certificates


@router.get("/{certificate_id}", response_model=CertificateResponse)
async def get_certificate(certificate_id: int, db: Session = Depends(get_db)):
    """Get a specific certificate by ID."""
    certificate = db.query(Certificate).filter(Certificate.id == certificate_id).first()
    if not certificate:
        raise NotFoundException("Certificate not found")
    return certificate
