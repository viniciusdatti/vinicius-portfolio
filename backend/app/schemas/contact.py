# Core
from datetime import datetime
from typing import Optional

# Libraries
from pydantic import BaseModel, EmailStr, Field

# App - Models
from app.models.contact import ContactStatus


class ContactBase(BaseModel):
    name: str = Field(..., max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=200)
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=10, max_length=5000)


class ContactCreate(ContactBase):
    pass


class ContactUpdate(BaseModel):
    status: Optional[ContactStatus] = None


class ContactResponse(ContactBase):
    id: int
    status: ContactStatus
    created_at: datetime
    replied_at: Optional[datetime] = None

    class Config:
        from_attributes = True
