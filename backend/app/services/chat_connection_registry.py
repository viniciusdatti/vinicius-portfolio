"""
In-process registry for Socket.IO chat connections.

Isolated from handlers so a future Redis adapter can replace this module
without touching event handler signatures.
"""

# Core
from typing import Dict, Set

ADMIN_LOBBY_ROOM: str = "admin_lobby"

connected_admin_sids: Set[str] = set()
visitor_session_sockets: Dict[str, str] = {}


def register_admin(sid: str) -> None:
    """Track an authenticated admin socket."""
    connected_admin_sids.add(sid)


def unregister_admin(sid: str) -> None:
    """Remove admin socket from registry."""
    connected_admin_sids.discard(sid)


def has_connected_admin() -> bool:
    """True when at least one admin socket is connected."""
    return len(connected_admin_sids) > 0


def connected_admin_count() -> int:
    """Number of admin sockets currently connected."""
    return len(connected_admin_sids)


def admin_session_room(session_id: str) -> str:
    """Socket.IO room for admins focused on a session."""
    return f"admin_{session_id}"


def bind_visitor_session(session_id: str, sid: str) -> None:
    """Map public session UUID to visitor socket id."""
    visitor_session_sockets[session_id] = sid


def unbind_visitor_socket(sid: str) -> str | None:
    """
    Remove visitor mapping by socket id.
    Returns session_id if a mapping was removed.
    """
    for session_id, socket_id in list(visitor_session_sockets.items()):
        if socket_id == sid:
            del visitor_session_sockets[session_id]
            return session_id
    return None


def get_visitor_socket(session_id: str) -> str | None:
    """Return visitor socket id for session, if connected."""
    return visitor_session_sockets.get(session_id)
