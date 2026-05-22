"""FastAPI application entry point."""

# Core
from contextlib import asynccontextmanager

# Libraries
import socketio
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

# App - API
from app.api.v1.router import api_router

# App - Core
from app.core.config import get_settings
from app.core.exceptions import register_exception_handlers
from app.core.logging import setup_logging
from app.core.rate_limit import limiter

# App - Database
from app.db.base import Base
from app.db.session import engine

# App - Services (for health diagnostic in dev)
from app.services import email_service

# App - WebSocket
from app.websocket.server import sio

# Setup logging
logger = setup_logging()

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    logger.info("Starting Portfolio API...")

    # Log email (Resend) status so we can confirm contact form emails will be sent
    if settings.resend_api_key:
        key_suffix: str = (
            settings.resend_api_key[-4:]
            if len(settings.resend_api_key) >= 4
            else "****"
        )
        logger.info(
            "Email (Resend): enabled. Notifications to %s (key ends with ...%s)",
            settings.email_to_admin,
            key_suffix,
        )
    else:
        from app.core.config import BACKEND_DIR
        env_path = BACKEND_DIR / ".env"
        logger.warning(
            "Email (Resend): disabled. Set RESEND_API_KEY in backend/.env to receive "
            "contact form emails at %s. (Loaded .env from: %s)",
            settings.email_to_admin,
            env_path if env_path.exists() else "FILE NOT FOUND",
        )

    # Create database tables when not using Docker entrypoint seed (dev/SQLite).
    if settings.is_development or settings.is_sqlite:
        logger.info("Creating database tables...")
        import app.models  # noqa: F401 — register models on Base.metadata
        Base.metadata.create_all(bind=engine)

    yield

    # Shutdown
    logger.info("Shutting down Portfolio API...")


# Create FastAPI application
app = FastAPI(
    title="Portfolio API",
    description="REST API for the professional portfolio, serving projects and technologies data.",
    version="2.0.0",
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None,
    openapi_url="/openapi.json" if settings.is_development else None,
    lifespan=lifespan,
)

# Add rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allow_headers=["*"],
)

# Register exception handlers
register_exception_handlers(app)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.get("/health", tags=["health"])
async def health_check():
    """Health check endpoint. In development, includes email_configured for debugging."""
    payload: dict = {"status": "healthy", "version": "2.0.0"}
    if settings.is_development:
        payload["email_configured"] = email_service.enabled
        payload["email_to_admin"] = settings.email_to_admin
    return payload


@app.get("/debug-email", tags=["debug"], include_in_schema=False)
async def debug_email():
    """
    Test Resend email (development only). No auth required.
    Returns ok/error so you can see why emails are not arriving.
    """
    if not settings.is_development:
        raise HTTPException(status_code=404, detail="Not found")
    ok: bool
    err: str
    ok, err = await email_service.send_test_email()
    if ok:
        return {"ok": True, "message": "Test email sent. Check your inbox (and spam)."}
    return {"ok": False, "error": err}


# Create ASGI app with Socket.IO
socket_app = socketio.ASGIApp(sio, app)
