"""Chat sessions and messages endpoints (admin)."""

# Libraries
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc

# App - Database
from app.db.session import get_db

# App - Models
from app.models.chat import ChatSession, ChatMessage, ChatStatus
from app.models.user import User

# App - Schemas
from app.schemas.chat import ChatSessionListItem, ChatMessageAdminResponse

# App - API
from app.api.v1.endpoints.auth import get_current_admin_user

router = APIRouter()


def _last_messages_map(db: Session) -> dict[int, str]:
    """Get last message content per session id (integer). One query."""
    rows = (
        db.query(ChatMessage.session_id, ChatMessage.content)
        .order_by(desc(ChatMessage.created_at))
        .all()
    )
    seen: set[int] = set()
    out: dict[int, str] = {}
    for sid, content in rows:
        if sid not in seen:
            seen.add(sid)
            out[sid] = content
    return out


@router.get("/sessions", response_model=list[ChatSessionListItem])
async def list_sessions(
    status_filter: ChatStatus | None = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    """List chat sessions for admin. Default: active first, then recent closed."""
    q = db.query(ChatSession).order_by(desc(ChatSession.started_at))
    if status_filter is not None:
        q = q.filter(ChatSession.status == status_filter)
    sessions = q.all()
    last_map = _last_messages_map(db)
    return [
        ChatSessionListItem(
            session_id=s.session_id,
            visitor_name=s.visitor_name,
            visitor_company=s.visitor_company,
            status=s.status,
            unread_count=s.unread_count,
            last_message=last_map.get(s.id),
            started_at=s.started_at,
        )
        for s in sessions
    ]


@router.get("/sessions/{session_id}/messages", response_model=list[ChatMessageAdminResponse])
async def list_session_messages(
    session_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    """List messages for a chat session."""
    session = db.query(ChatSession).filter(ChatSession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.session_id == session.id)
        .order_by(ChatMessage.created_at)
        .all()
    )
    return [
        ChatMessageAdminResponse(
            id=m.id,
            content=m.content,
            sender_type=m.sender_type,
            is_read=m.is_read,
            created_at=m.created_at,
            session_id=session.session_id,
        )
        for m in messages
    ]
