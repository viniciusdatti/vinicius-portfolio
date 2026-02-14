# Core
import enum
import uuid

# Libraries
from sqlalchemy import Column, Integer, String, Enum, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

# App - Database
from app.db.base import Base


class ChatStatus(str, enum.Enum):
    ACTIVE = "active"
    CLOSED = "closed"
    ARCHIVED = "archived"


class SenderType(str, enum.Enum):
    VISITOR = "visitor"
    ADMIN = "admin"


def generate_session_id():
    return str(uuid.uuid4())


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(36), unique=True, index=True, default=generate_session_id)
    visitor_name = Column(String(100), nullable=False)
    visitor_company = Column(String(200), nullable=True)
    status = Column(Enum(ChatStatus), default=ChatStatus.ACTIVE, nullable=False, index=True)
    unread_count = Column(Integer, default=0)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    closed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id", ondelete="CASCADE"), nullable=False, index=True)
    content = Column(Text, nullable=False)
    sender_type = Column(Enum(SenderType), nullable=False)
    is_read = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    session = relationship("ChatSession", back_populates="messages")
