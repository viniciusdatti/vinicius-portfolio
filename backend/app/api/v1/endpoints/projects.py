"""Projects API endpoints."""

from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.project import ProjectRead
from app.services.project_service import ProjectService

router = APIRouter()


@router.get(
    "",
    response_model=List[ProjectRead],
    summary="Get all projects",
    description="Retrieve all portfolio projects, optionally filtered by technology.",
)
async def get_projects(
    technology: Optional[str] = Query(
        default=None,
        description="Filter projects by technology name or slug",
        examples=["React", "typescript", "python"],
    ),
    db: Session = Depends(get_db),
) -> List[ProjectRead]:
    """
    Get all projects with optional technology filter.

    - **technology**: Optional filter by technology name or slug (case-insensitive)

    Returns a list of projects with their associated technologies.
    """
    service = ProjectService(db)
    projects = service.get_all_projects(technology=technology)
    return projects
