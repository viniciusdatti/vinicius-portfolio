"""WebSocket server for Live Lab telemetry using Socket.IO."""

# Core
import asyncio
import logging

# Libraries
import socketio

# App - Core
from app.core.config import get_settings

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
