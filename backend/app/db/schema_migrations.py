"""Lightweight schema patches for existing databases (no Alembic)."""

# Core
import logging

# Libraries
from sqlalchemy import inspect, text

# App - Core
from app.core.config import get_settings

# App - Database
from app.db.session import engine

logger = logging.getLogger(__name__)


def ensure_projects_is_featured_column() -> None:
    """Add projects.is_featured when the column is missing (SQLite or PostgreSQL)."""
    inspector = inspect(engine)
    table_names: list[str] = inspector.get_table_names()

    if "projects" not in table_names:
        return

    column_names: set[str] = {
        column["name"] for column in inspector.get_columns("projects")
    }
    if "is_featured" in column_names:
        return

    settings = get_settings()
    ddl: str = (
        "ALTER TABLE projects ADD COLUMN is_featured BOOLEAN NOT NULL DEFAULT 0"
        if settings.is_sqlite
        else "ALTER TABLE projects ADD COLUMN is_featured BOOLEAN NOT NULL DEFAULT FALSE"
    )

    with engine.begin() as connection:
        connection.execute(text(ddl))

    logger.info("Added missing column projects.is_featured")


def apply_schema_migrations() -> None:
    """Run idempotent schema patches after create_all."""
    ensure_projects_is_featured_column()
