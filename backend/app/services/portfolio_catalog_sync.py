"""Keep database projects aligned with app.core.portfolio_catalog."""

from typing import Dict, List, Tuple

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.portfolio_catalog import (
    PORTFOLIO_PROJECTS,
    PORTFOLIO_REPOSITORY_URLS,
)
from app.models.project import Project
from app.models.technology import Technology

TECHNOLOGY_DEFINITIONS: Dict[str, Tuple[str, str]] = {
    "react": ("React", "react"),
    "typescript": ("TypeScript", "typescript"),
    "python": ("Python", "python"),
    "javascript": ("JavaScript", "javascript"),
    "flask": ("Flask", "flask"),
    "mysql": ("MySQL", "mysql"),
    "websocket": ("WebSockets", "websocket"),
}


def ensure_portfolio_technologies(db: Session) -> Dict[str, Technology]:
    """Return technology rows keyed by slug, creating any missing slugs from the catalog."""
    technologies: Dict[str, Technology] = {}

    for slug, (name, tech_slug) in TECHNOLOGY_DEFINITIONS.items():
        row: Technology | None = db.execute(
            select(Technology).where(Technology.slug == tech_slug),
        ).scalar_one_or_none()

        if row is None:
            row = Technology(name=name, slug=tech_slug)
            db.add(row)

        technologies[slug] = row

    db.flush()
    return technologies


def sync_portfolio_projects(db: Session) -> int:
    """
    Upsert catalog projects and remove rows whose repository_url is not in the catalog.

    Returns:
        Number of catalog entries processed.
    """
    technologies: Dict[str, Technology] = ensure_portfolio_technologies(db)

    stale_projects: List[Project] = list(
        db.execute(
            select(Project).where(
                Project.repository_url.notin_(PORTFOLIO_REPOSITORY_URLS),
            ),
        ).scalars().all(),
    )
    for stale_project in stale_projects:
        db.delete(stale_project)

    for entry in PORTFOLIO_PROJECTS:
        project: Project | None = db.execute(
            select(Project).where(Project.repository_url == entry.repository_url),
        ).scalar_one_or_none()

        tech_list: List[Technology] = [
            technologies[tech_key] for tech_key in entry.technology_slugs
        ]

        if project is None:
            project = Project(
                title=entry.title,
                title_pt=entry.title,
                description=entry.description_en,
                description_pt=entry.description_pt,
                repository_url=entry.repository_url,
                demo_url=None,
                is_featured=entry.is_featured,
                technologies=tech_list,
            )
            db.add(project)
            continue

        project.title = entry.title
        project.title_pt = entry.title
        project.description = entry.description_en
        project.description_pt = entry.description_pt
        project.is_featured = entry.is_featured
        project.technologies = tech_list

    db.commit()
    return len(PORTFOLIO_PROJECTS)
