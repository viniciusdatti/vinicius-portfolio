# Core
from typing import Optional

# Libraries
from pydantic import BaseModel, Field

# App - Models
from app.models.skill import SkillCategory


class SkillBase(BaseModel):
    name: str = Field(..., max_length=100)
    name_pt: Optional[str] = Field(None, max_length=100)
    category: SkillCategory
    proficiency: int = Field(50, ge=0, le=100)
    icon_url: Optional[str] = Field(None, max_length=500)
    display_order: int = 0
    is_active: bool = True


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=100)
    name_pt: Optional[str] = Field(None, max_length=100)
    category: Optional[SkillCategory] = None
    proficiency: Optional[int] = Field(None, ge=0, le=100)
    icon_url: Optional[str] = Field(None, max_length=500)
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class SkillResponse(SkillBase):
    id: int

    class Config:
        from_attributes = True
