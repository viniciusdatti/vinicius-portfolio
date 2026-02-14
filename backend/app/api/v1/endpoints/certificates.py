"""Certificates endpoints."""

# Core
from typing import List

# Libraries
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

# App - Database
from app.db.session import get_db

# App - Models
from app.models.certificate import Certificate
from app.models.user import User

# App - Schemas
from app.schemas.certificate import CertificateCreate, CertificateUpdate, CertificateResponse

# App - API
from app.api.v1.endpoints.auth import get_current_user

router = APIRouter()


@router.get("", response_model=List[CertificateResponse])
async def get_certificates(
    active_only: bool = True,
    db: Session = Depends(get_db),
):
    """Get all certificates."""
    query = db.query(Certificate)
    
    if active_only:
        query = query.filter(Certificate.is_active == True)
    
    certificates = query.order_by(Certificate.display_order, Certificate.year.desc()).all()
    return certificates


@router.get("/{certificate_id}", response_model=CertificateResponse)
async def get_certificate(certificate_id: int, db: Session = Depends(get_db)):
    """Get a specific certificate by ID."""
    certificate = db.query(Certificate).filter(Certificate.id == certificate_id).first()
    if not certificate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certificate not found",
        )
    return certificate


# Admin endpoints
@router.post("", response_model=CertificateResponse, status_code=status.HTTP_201_CREATED)
async def create_certificate(
    certificate_data: CertificateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create a new certificate (admin only)."""
    certificate = Certificate(**certificate_data.model_dump())
    db.add(certificate)
    db.commit()
    db.refresh(certificate)
    return certificate


@router.put("/{certificate_id}", response_model=CertificateResponse)
async def update_certificate(
    certificate_id: int,
    certificate_data: CertificateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Update a certificate (admin only)."""
    certificate = db.query(Certificate).filter(Certificate.id == certificate_id).first()
    if not certificate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certificate not found",
        )
    
    update_data = certificate_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(certificate, field, value)
    
    db.commit()
    db.refresh(certificate)
    return certificate


@router.delete("/{certificate_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_certificate(
    certificate_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Delete a certificate (admin only)."""
    certificate = db.query(Certificate).filter(Certificate.id == certificate_id).first()
    if not certificate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Certificate not found",
        )
    
    db.delete(certificate)
    db.commit()
