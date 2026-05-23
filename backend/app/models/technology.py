"""Technology model and association table."""

from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.project import Project

# Association table for Many-to-Many relationship
project_technologies = Table(
    "project_technologies",
    Base.metadata,
    Column(
        "project_id",
        Integer,
        ForeignKey("projects.id", ondelete="CASCADE"),
        primary_key=True,
    ),
    Column(
        "technology_id",
        Integer,
        ForeignKey("technologies.id", ondelete="CASCADE"),
        primary_key=True,
    ),
)


class Technology(Base):
    """Technology model representing a programming technology/framework."""

    __tablename__ = "technologies"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)

    # Relationship back to projects
    projects: Mapped[list["Project"]] = relationship(
        "Project",
        secondary=project_technologies,
        back_populates="technologies",
    )

    def __repr__(self) -> str:
        return f"<Technology(id={self.id}, name='{self.name}')>"
