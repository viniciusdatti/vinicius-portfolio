"""Pydantic schemas for Project."""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field


class TechnologyInProject(BaseModel):
    """Nested technology schema for project responses."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str


class ProjectBase(BaseModel):
    """Base schema for Project."""

    title: str
    title_pt: Optional[str] = None
    description: Optional[str] = None
    description_pt: Optional[str] = None
    repository_url: str
    demo_url: Optional[str] = None


class ProjectRead(ProjectBase):
    """Schema for reading a Project with technologies."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    technologies: List[TechnologyInProject] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime


class ProjectList(BaseModel):
    """Schema for list of projects response."""

    model_config = ConfigDict(from_attributes=True)

    projects: List[ProjectRead]
    total: int


class ProjectQueryParams(BaseModel):
    """Query parameters for filtering projects."""

    technology: Optional[str] = Field(
        default=None,
        description="Filter projects by technology name or slug",
    )
