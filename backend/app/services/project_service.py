"""Project service for business logic and data access."""

import logging
from typing import List, Optional

from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.core.portfolio_catalog import (
    PORTFOLIO_PROJECTS,
    PORTFOLIO_REPOSITORY_URLS,
)
from app.models.project import Project
from app.models.technology import Technology

logger = logging.getLogger("portfolio")


class ProjectService:
    """Service class for project-related operations."""

    def __init__(self, db: Session):
        """
        Initialize the service with a database session.

        Args:
            db: SQLAlchemy database session.
        """
        self.db = db

    def get_all_projects(
        self,
        technology: Optional[str] = None,
    ) -> List[Project]:
        """
        Get all projects, optionally filtered by technology.

        Args:
            technology: Optional technology name or slug to filter by.

        Returns:
            List of projects matching the criteria.
        """
        query = select(Project).where(
            Project.repository_url.in_(PORTFOLIO_REPOSITORY_URLS),
        )

        if technology:
            # Filter by technology name or slug (case-insensitive)
            query = query.join(Project.technologies).where(
                or_(
                    Technology.name.ilike(f"%{technology}%"),
                    Technology.slug.ilike(f"%{technology}%"),
                )
            )

        # Order by most recent first
        query = query.order_by(Project.created_at.desc())

        result = self.db.execute(query)
        projects = list(result.scalars().unique().all())

        catalog_order: dict[str, int] = {
            entry.repository_url: index
            for index, entry in enumerate(PORTFOLIO_PROJECTS)
        }
        projects.sort(
            key=lambda project: catalog_order.get(project.repository_url, 999),
        )

        logger.info(
            f"Retrieved {len(projects)} projects"
            + (f" filtered by technology: {technology}" if technology else "")
        )

        return projects

    def get_project_by_id(self, project_id: int) -> Optional[Project]:
        """
        Get a single project by ID.

        Args:
            project_id: The project ID to look up.

        Returns:
            Project if found, None otherwise.
        """
        query = select(Project).where(Project.id == project_id)
        result = self.db.execute(query)
        return result.scalar_one_or_none()
