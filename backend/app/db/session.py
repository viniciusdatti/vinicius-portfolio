"""Database session configuration."""

from typing import Any, Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import get_settings

settings = get_settings()

# Create engine with appropriate settings for SQLite or PostgreSQL
engine_kwargs: dict[str, Any] = {
    "echo": settings.is_development,
}

# SQLite requires special handling
if settings.is_sqlite:
    engine_kwargs["connect_args"] = {"check_same_thread": False}
else:
    engine_kwargs["pool_pre_ping"] = True

engine = create_engine(settings.database_url, **engine_kwargs)

# Create session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def get_db() -> Generator[Session, None, None]:
    """
    Dependency that provides a database session.

    Yields:
        Database session that will be closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
