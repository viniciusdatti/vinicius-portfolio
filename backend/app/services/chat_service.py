"""
Chat domain service — persistence and session rules (HTTP + WebSocket).
"""

# Core
from datetime import datetime, timezone
from typing import Any, Optional

# Libraries
from sqlalchemy.orm import Session

# App - Models
from app.models.chat import ChatSession, ChatMessage, ChatStatus, SenderType


class ChatService:
    """Encapsulates chat DB operations used by REST and Socket.IO handlers."""

    def __init__(self, db: Session) -> None:
        self._db = db

    def get_session_by_uuid(
        self, session_id: str, *, active_only: bool = False
    ) -> Optional[ChatSession]:
        """Find session by public UUID."""
        q = self._db.query(ChatSession).filter(ChatSession.session_id == session_id)
        if active_only:
            q = q.filter(ChatSession.status == ChatStatus.ACTIVE)
        return q.first()

    def create_session(
        self, visitor_name: str, visitor_company: Optional[str] = None
    ) -> ChatSession:
        """Create a new active chat session."""
        session = ChatSession(
            visitor_name=visitor_name,
            visitor_company=visitor_company,
        )
        self._db.add(session)
        self._db.commit()
        self._db.refresh(session)
        return session

    def create_message(
        self,
        session: ChatSession,
        content: str,
        sender_type: SenderType,
        *,
        mark_read: bool = False,
        increment_unread: bool = False,
    ) -> ChatMessage:
        """Persist a chat message and optionally bump unread count."""
        message = ChatMessage(
            session_id=session.id,
            content=content[:5000],
            sender_type=sender_type,
            is_read=mark_read,
        )
        self._db.add(message)
        if increment_unread:
            session.unread_count += 1
        self._db.commit()
        self._db.refresh(message)
        return message

    def mark_visitor_messages_read(self, session: ChatSession) -> None:
        """Mark all visitor messages read and reset unread counter."""
        self._db.query(ChatMessage).filter(
            ChatMessage.session_id == session.id,
            ChatMessage.sender_type == SenderType.VISITOR,
            ChatMessage.is_read == False,
        ).update({"is_read": True})
        session.unread_count = 0
        self._db.commit()

    def close_session(self, session: ChatSession) -> None:
        """Close session with timestamp."""
        session.status = ChatStatus.CLOSED
        session.closed_at = datetime.now(timezone.utc)
        self._db.commit()

    def list_messages(self, session: ChatSession) -> list[ChatMessage]:
        """Ordered messages for a session."""
        return (
            self._db.query(ChatMessage)
            .filter(ChatMessage.session_id == session.id)
            .order_by(ChatMessage.created_at)
            .all()
        )

    @staticmethod
    def message_payload(
        message: ChatMessage,
        session: ChatSession,
    ) -> dict[str, Any]:
        """Serialize message for Socket.IO clients (includes server unread_count)."""
        return {
            "id": message.id,
            "session_id": session.session_id,
            "content": message.content,
            "sender_type": message.sender_type.value,
            "created_at": message.created_at.isoformat(),
            "unread_count": session.unread_count,
        }

    @staticmethod
    def new_session_payload(session: ChatSession) -> dict[str, Any]:
        """Serialize new session event for admin clients."""
        return {
            "session_id": session.session_id,
            "visitor_name": session.visitor_name,
            "visitor_company": session.visitor_company,
            "started_at": session.started_at.isoformat(),
            "unread_count": session.unread_count,
        }

    @staticmethod
    def session_updated_payload(session: ChatSession) -> dict[str, Any]:
        """Serialize session counter updates for admin sidebar."""
        return {
            "session_id": session.session_id,
            "unread_count": session.unread_count,
        }
