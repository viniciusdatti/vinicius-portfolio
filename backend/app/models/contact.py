# Core
import enum

# Libraries
from sqlalchemy import Column, Integer, String, Enum, DateTime, Text
from sqlalchemy.sql import func

# App - Database
from app.db.base import Base


class ContactStatus(str, enum.Enum):
    PENDING = "pending"
    READ = "read"
    REPLIED = "replied"
    ARCHIVED = "archived"


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    company = Column(String(200), nullable=True)
    subject = Column(String(200), nullable=True)
    message = Column(Text, nullable=False)
    status = Column(Enum(ContactStatus), default=ContactStatus.PENDING, nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    replied_at = Column(DateTime(timezone=True), nullable=True)
