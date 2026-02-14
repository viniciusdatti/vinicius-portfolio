"""Project model."""

from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.technology import project_technologies

if TYPE_CHECKING:
    from app.models.technology import Technology


class Project(Base):
    """Project model representing a portfolio project."""

    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    title_pt: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    description_pt: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    repository_url: Mapped[str] = mapped_column(String(500), nullable=False)
    demo_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Many-to-Many relationship with technologies
    technologies: Mapped[List["Technology"]] = relationship(
        "Technology",
        secondary=project_technologies,
        back_populates="projects",
        lazy="selectin",
    )

    def __repr__(self) -> str:
        return f"<Project(id={self.id}, title='{self.title}')>"
