"""Pydantic schemas for Technology."""

from pydantic import BaseModel, ConfigDict


class TechnologyBase(BaseModel):
    """Base schema for Technology."""

    name: str
    slug: str


class TechnologyRead(TechnologyBase):
    """Schema for reading a Technology."""

    model_config = ConfigDict(from_attributes=True)

    id: int
