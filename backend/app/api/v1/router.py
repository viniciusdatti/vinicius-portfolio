"""API v1 router configuration."""

# Libraries
from fastapi import APIRouter

# App - API Endpoints
from app.api.v1.endpoints import projects
from app.api.v1.endpoints import auth
from app.api.v1.endpoints import skills
from app.api.v1.endpoints import certificates
from app.api.v1.endpoints import contact
from app.api.v1.endpoints import chat

api_router = APIRouter()

api_router.include_router(
    projects.router,
    prefix="/projects",
    tags=["projects"],
)

api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["auth"],
)

api_router.include_router(
    skills.router,
    prefix="/skills",
    tags=["skills"],
)

api_router.include_router(
    certificates.router,
    prefix="/certificates",
    tags=["certificates"],
)

api_router.include_router(
    contact.router,
    prefix="/contact",
    tags=["contact"],
)

api_router.include_router(
    chat.router,
    prefix="/chat",
    tags=["chat"],
)
