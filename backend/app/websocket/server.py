"""WebSocket server for real-time chat using Socket.IO."""

# Core
import logging
import asyncio
from typing import Dict, Set

# Libraries
import socketio
from sqlalchemy.orm import Session

# App - Database
from app.db.session import SessionLocal

# App - Models
from app.models.chat import ChatSession, ChatMessage, ChatStatus, SenderType
from app.models.user import User, UserRole

# App - Core
from app.core.config import get_settings
from app.core.security import decode_token

# App - Services
from app.services.telegram import telegram_service

logger = logging.getLogger(__name__)
settings = get_settings()

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=settings.cors_origins_list,
    logger=settings.is_development,
    engineio_logger=settings.is_development,
)

# Track connected admins and their socket IDs
connected_admins: Set[str] = set()

# Track visitor sessions: session_id -> socket_id
visitor_sessions: Dict[str, str] = {}


def get_db() -> Session:
    """Get database session."""
    db = SessionLocal()
    try:
        return db
    finally:
        pass  # Session will be closed after use


# ============================================
# Visitor Namespace (/chat)
# ============================================

@sio.on("connect", namespace="/chat")
async def visitor_connect(sid, environ):
    """Handle visitor connection."""
    logger.info(f"Visitor connected: {sid}")
    # Send admin online status
    await sio.emit(
        "admin_status",
        {"is_online": len(connected_admins) > 0},
        room=sid,
        namespace="/chat",
    )


@sio.on("disconnect", namespace="/chat")
async def visitor_disconnect(sid):
    """Handle visitor disconnection."""
    logger.info(f"Visitor disconnected: {sid}")
    # Remove from visitor sessions
    for session_id, socket_id in list(visitor_sessions.items()):
        if socket_id == sid:
            del visitor_sessions[session_id]
            # Notify admins
            await sio.emit(
                "visitor_disconnected",
                {"session_id": session_id},
                namespace="/admin-chat",
            )
            break


@sio.on("start_session", namespace="/chat")
async def start_session(sid, data):
    """Start a new chat session."""
    visitor_name = data.get("visitor_name", "Visitor")
    visitor_company = data.get("visitor_company")

    db = get_db()
    try:
        # Create new session
        session = ChatSession(
            visitor_name=visitor_name,
            visitor_company=visitor_company,
        )
        db.add(session)
        db.commit()
        db.refresh(session)

        # Track visitor
        visitor_sessions[session.session_id] = sid

        # Join room for this session
        await sio.enter_room(sid, session.session_id, namespace="/chat")

        # Send session info back to visitor
        await sio.emit(
            "session_started",
            {
                "session_id": session.session_id,
                "visitor_name": visitor_name,
            },
            room=sid,
            namespace="/chat",
        )

        # Notify admins
        await sio.emit(
            "new_session",
            {
                "session_id": session.session_id,
                "visitor_name": visitor_name,
                "visitor_company": visitor_company,
                "started_at": session.started_at.isoformat(),
            },
            namespace="/admin-chat",
        )

        # Send Telegram notification if no admin is online
        if len(connected_admins) == 0:
            asyncio.create_task(
                telegram_service.send_chat_notification(
                    visitor_name=visitor_name,
                    message="Nova conversa iniciada",
                    visitor_company=visitor_company,
                )
            )

        logger.info(f"New chat session started: {session.session_id}")
    finally:
        db.close()


@sio.on("rejoin_session", namespace="/chat")
async def rejoin_session(sid, data):
    """Rejoin an existing session after reconnect (visitor back in room)."""
    session_id = data.get("session_id")
    if not session_id:
        return

    db = get_db()
    try:
        session = db.query(ChatSession).filter(
            ChatSession.session_id == session_id,
            ChatSession.status == ChatStatus.ACTIVE,
        ).first()
        if not session:
            return

        visitor_sessions[session_id] = sid
        await sio.enter_room(sid, session_id, namespace="/chat")
        await sio.emit(
            "rejoin_ok",
            {"session_id": session_id},
            room=sid,
            namespace="/chat",
        )
        logger.info(f"Visitor rejoined session: {session_id}")
    finally:
        db.close()


@sio.on("send_message", namespace="/chat")
async def visitor_send_message(sid, data):
    """Handle message from visitor."""
    session_id = data.get("session_id")
    content = data.get("content", "").strip()

    if not session_id or not content:
        return

    db = get_db()
    try:
        # Find session
        session = db.query(ChatSession).filter(
            ChatSession.session_id == session_id
        ).first()

        if not session:
            return

        # Create message
        message = ChatMessage(
            session_id=session.id,
            content=content[:5000],  # Limit message length
            sender_type=SenderType.VISITOR,
        )
        db.add(message)
        
        # Update unread count
        session.unread_count += 1
        
        db.commit()
        db.refresh(message)

        message_data = {
            "id": message.id,
            "session_id": session_id,
            "content": message.content,
            "sender_type": "visitor",
            "created_at": message.created_at.isoformat(),
        }

        # Send to visitor (confirmation)
        await sio.emit(
            "message",
            message_data,
            room=session_id,
            namespace="/chat",
        )

        # Send to admins
        await sio.emit(
            "new_message",
            message_data,
            namespace="/admin-chat",
        )

        # Send Telegram notification if no admin is online
        if len(connected_admins) == 0:
            asyncio.create_task(
                telegram_service.send_new_message_notification(
                    visitor_name=session.visitor_name,
                    message=content,
                )
            )

        logger.info(f"Message from visitor in session {session_id}")
    finally:
        db.close()


@sio.on("typing", namespace="/chat")
async def visitor_typing(sid, data):
    """Handle visitor typing indicator."""
    session_id = data.get("session_id")
    if session_id:
        await sio.emit(
            "visitor_typing",
            {"session_id": session_id},
            namespace="/admin-chat",
        )


# ============================================
# Admin Namespace (/admin-chat)
# ============================================

@sio.on("connect", namespace="/admin-chat")
async def admin_connect(sid, environ, auth):
    """Handle admin connection with authentication. Only admin roles allowed."""
    token = (auth or {}).get("token") if isinstance(auth, dict) else None
    if not token:
        raise socketio.exceptions.ConnectionRefusedError("Missing token")
    payload = decode_token(token)
    if not payload or payload.get("type") != "access":
        raise socketio.exceptions.ConnectionRefusedError("Invalid token")
    email = payload.get("sub")
    if not email:
        raise socketio.exceptions.ConnectionRefusedError("Invalid token")
    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user or not user.is_active:
            raise socketio.exceptions.ConnectionRefusedError("User not found")
        if user.role not in (UserRole.ADMIN, UserRole.SUPER_ADMIN):
            raise socketio.exceptions.ConnectionRefusedError("Admin access required")
    finally:
        db.close()
    logger.info(f"Admin connected: {sid}")
    connected_admins.add(sid)
    
    # Notify all visitors that admin is online
    await sio.emit(
        "admin_status",
        {"is_online": True},
        namespace="/chat",
    )


@sio.on("disconnect", namespace="/admin-chat")
async def admin_disconnect(sid):
    """Handle admin disconnection."""
    logger.info(f"Admin disconnected: {sid}")
    connected_admins.discard(sid)
    
    # If no more admins, notify visitors
    if len(connected_admins) == 0:
        await sio.emit(
            "admin_status",
            {"is_online": False},
            namespace="/chat",
        )


@sio.on("join_session", namespace="/admin-chat")
async def admin_join_session(sid, data):
    """Admin joins a chat session."""
    session_id = data.get("session_id")
    if session_id:
        await sio.enter_room(sid, f"admin_{session_id}", namespace="/admin-chat")
        logger.info(f"Admin {sid} joined session {session_id}")


@sio.on("send_message", namespace="/admin-chat")
async def admin_send_message(sid, data):
    """Handle message from admin."""
    session_id = data.get("session_id")
    content = data.get("content", "").strip()

    if not session_id or not content:
        return

    db = get_db()
    try:
        # Find session
        session = db.query(ChatSession).filter(
            ChatSession.session_id == session_id
        ).first()

        if not session:
            return

        # Create message
        message = ChatMessage(
            session_id=session.id,
            content=content[:5000],
            sender_type=SenderType.ADMIN,
            is_read=True,  # Admin messages are already "read"
        )
        db.add(message)
        db.commit()
        db.refresh(message)

        message_data = {
            "id": message.id,
            "session_id": session_id,
            "content": message.content,
            "sender_type": "admin",
            "created_at": message.created_at.isoformat(),
        }

        # Send to visitor
        await sio.emit(
            "message",
            message_data,
            room=session_id,
            namespace="/chat",
        )

        # Send to all admins
        await sio.emit(
            "new_message",
            message_data,
            namespace="/admin-chat",
        )

        logger.info(f"Message from admin in session {session_id}")
    finally:
        db.close()


@sio.on("typing", namespace="/admin-chat")
async def admin_typing(sid, data):
    """Handle admin typing indicator."""
    session_id = data.get("session_id")
    if session_id:
        await sio.emit(
            "admin_typing",
            {"session_id": session_id},
            room=session_id,
            namespace="/chat",
        )


@sio.on("mark_read", namespace="/admin-chat")
async def mark_messages_read(sid, data):
    """Mark messages as read."""
    session_id = data.get("session_id")
    
    if not session_id:
        return

    db = get_db()
    try:
        session = db.query(ChatSession).filter(
            ChatSession.session_id == session_id
        ).first()

        if session:
            # Mark all visitor messages as read
            db.query(ChatMessage).filter(
                ChatMessage.session_id == session.id,
                ChatMessage.sender_type == SenderType.VISITOR,
                ChatMessage.is_read == False,
            ).update({"is_read": True})
            
            session.unread_count = 0
            db.commit()
    finally:
        db.close()


@sio.on("close_session", namespace="/admin-chat")
async def close_session(sid, data):
    """Close a chat session."""
    session_id = data.get("session_id")
    
    if not session_id:
        return

    db = get_db()
    try:
        session = db.query(ChatSession).filter(
            ChatSession.session_id == session_id
        ).first()

        if session:
            from datetime import datetime, timezone
            session.status = ChatStatus.CLOSED
            session.closed_at = datetime.now(timezone.utc)
            db.commit()

            # Notify visitor
            await sio.emit(
                "session_closed",
                {"session_id": session_id},
                room=session_id,
                namespace="/chat",
            )

            logger.info(f"Session {session_id} closed")
    finally:
        db.close()
