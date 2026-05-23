"""WebSocket server for real-time chat using Socket.IO."""

# Core
import logging
import asyncio
# Libraries
import socketio
from sqlalchemy.orm import Session

# App - Database
from app.db.session import SessionLocal

# App - Models
from app.models.chat import SenderType
from app.models.user import User, UserRole

# App - Core
from app.core.config import get_settings
from app.core.security import decode_token

# App - Services
from app.services.telegram import telegram_service
from app.services.chat_service import ChatService
from app.services import chat_connection_registry as registry

# App - Telemetry
from app.websocket.telemetry import start_telemetry_loop

logger = logging.getLogger(__name__)
settings = get_settings()


def _socket_cors_origins() -> list[str] | str:
    """
    Socket.IO CORS (Engine.IO validates Origin on polling POST).
    Dev: '*' avoids localhost vs 127.0.0.1 mismatch.
    Prod: strict list from CORS_ORIGINS — must include every public frontend URL
    (e.g. Vercel app URL) when VITE_API_URL points at this API host.
    """
    if settings.is_development:
        return '*'
    return settings.cors_origins_list


# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=_socket_cors_origins(),
    logger=settings.is_development,
    engineio_logger=settings.is_development,
)

async def _emit_admin_lobby(event: str, data: dict) -> None:
    """Broadcast admin-scoped events to the shared lobby room."""
    await sio.emit(
        event,
        data,
        room=registry.ADMIN_LOBBY_ROOM,
        namespace="/admin-chat",
    )


async def _emit_admin_presence_to_visitors() -> None:
    """Notify visitors how many admin sockets are connected."""
    await sio.emit(
        "admin_status",
        {
            "is_online": registry.has_connected_admin(),
            "admin_count": registry.connected_admin_count(),
        },
        namespace="/chat",
    )


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
        {
            "is_online": registry.has_connected_admin(),
            "admin_count": registry.connected_admin_count(),
        },
        room=sid,
        namespace="/chat",
    )


@sio.on("disconnect", namespace="/chat")
async def visitor_disconnect(sid):
    """Handle visitor disconnection."""
    logger.info(f"Visitor disconnected: {sid}")
    # Remove from visitor sessions
    session_id = registry.unbind_visitor_socket(sid)
    if session_id:
        await _emit_admin_lobby(
            "visitor_disconnected",
            {"session_id": session_id},
        )


@sio.on("start_session", namespace="/chat")
async def start_session(sid, data):
    """Start a new chat session."""
    visitor_name = data.get("visitor_name", "Visitor")
    visitor_company = data.get("visitor_company")

    db = get_db()
    try:
        chat = ChatService(db)
        session = chat.create_session(visitor_name, visitor_company)
        registry.bind_visitor_session(session.session_id, sid)

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
        await _emit_admin_lobby(
            "new_session",
            chat.new_session_payload(session),
        )

        # Send Telegram notification if no admin is online
        if not registry.has_connected_admin():
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
        chat = ChatService(db)
        session = chat.get_session_by_uuid(session_id, active_only=True)
        if not session:
            return

        registry.bind_visitor_session(session_id, sid)
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
        chat = ChatService(db)
        session = chat.get_session_by_uuid(session_id)
        if not session:
            return

        message = chat.create_message(
            session,
            content,
            SenderType.VISITOR,
            increment_unread=True,
        )
        message_data = chat.message_payload(message, session)

        # Send to visitor (confirmation)
        await sio.emit(
            "message",
            message_data,
            room=session_id,
            namespace="/chat",
        )

        await _emit_admin_lobby("new_message", message_data)

        # Send Telegram notification if no admin is online
        if not registry.has_connected_admin():
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
        await _emit_admin_lobby(
            "visitor_typing",
            {"session_id": session_id},
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
    registry.register_admin(sid)
    await sio.enter_room(sid, registry.ADMIN_LOBBY_ROOM, namespace="/admin-chat")
    await _emit_admin_presence_to_visitors()


@sio.on("disconnect", namespace="/admin-chat")
async def admin_disconnect(sid):
    """Handle admin disconnection."""
    logger.info(f"Admin disconnected: {sid}")
    registry.unregister_admin(sid)

    if not registry.has_connected_admin():
        await _emit_admin_presence_to_visitors()


@sio.on("join_session", namespace="/admin-chat")
async def admin_join_session(sid, data):
    """Admin joins a chat session."""
    session_id = data.get("session_id")
    if session_id:
        await sio.enter_room(
            sid,
            registry.admin_session_room(session_id),
            namespace="/admin-chat",
        )
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
        chat = ChatService(db)
        session = chat.get_session_by_uuid(session_id)
        if not session:
            return

        message = chat.create_message(
            session,
            content,
            SenderType.ADMIN,
            mark_read=True,
        )
        message_data = chat.message_payload(message, session)

        # Send to visitor
        await sio.emit(
            "message",
            message_data,
            room=session_id,
            namespace="/chat",
        )

        await _emit_admin_lobby("new_message", message_data)

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
        chat = ChatService(db)
        session = chat.get_session_by_uuid(session_id)
        if session:
            chat.mark_visitor_messages_read(session)
            db.refresh(session)
            await _emit_admin_lobby(
                "session_updated",
                chat.session_updated_payload(session),
            )
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
        chat = ChatService(db)
        session = chat.get_session_by_uuid(session_id)
        if session:
            chat.close_session(session)

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


# ============================================
# Telemetry Namespace (/telemetry)
# ============================================

_telemetry_task = None
_telemetry_clients = 0


@sio.on("connect", namespace="/telemetry")
async def telemetry_connect(sid, environ):
    """Start telemetry loop when first client connects."""
    global _telemetry_task, _telemetry_clients
    _telemetry_clients += 1
    logger.info(f"Telemetry client connected: {sid} (total: {_telemetry_clients})")
    if _telemetry_task is None or _telemetry_task.done():
        _telemetry_task = asyncio.create_task(start_telemetry_loop(sio))
        logger.info("Telemetry loop started")


@sio.on("disconnect", namespace="/telemetry")
async def telemetry_disconnect(sid):
    """Track client disconnections."""
    global _telemetry_clients
    _telemetry_clients = max(0, _telemetry_clients - 1)
    logger.info(f"Telemetry client disconnected: {sid} (total: {_telemetry_clients})")
