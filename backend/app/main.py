"""FastAPI application entry point."""

# Core
from contextlib import asynccontextmanager
from typing import cast

# Libraries
import socketio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from starlette.types import ExceptionHandler

# App - API
from app.api.v1.router import api_router

# App - Core
from app.core.config import get_settings
from app.core.exceptions import register_exception_handlers
from app.core.logging import setup_logging
from app.core.rate_limit import limiter

# App - Database
from app.db.bootstrap import ensure_catalog_seeded

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

    ensure_catalog_seeded()

    yield

    # Shutdown
    logger.info("Shutting down Portfolio API...")


# Create FastAPI application
app = FastAPI(
    title="Portfolio API",
    description="REST API for the professional portfolio, serving projects and technologies data.",
    version="2.0.0",
    redirect_slashes=False,
    docs_url="/docs" if settings.is_development else None,
    redoc_url="/redoc" if settings.is_development else None,
    openapi_url="/openapi.json" if settings.is_development else None,
    lifespan=lifespan,
)

# Add rate limiter
app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded,
    cast(ExceptionHandler, _rate_limit_exceeded_handler),
)

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
    """Health check endpoint."""
    return {"status": "healthy", "version": "2.0.0"}


# Create ASGI app with Socket.IO
socket_app = socketio.ASGIApp(sio, app)
