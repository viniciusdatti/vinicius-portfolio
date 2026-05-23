"""Skills endpoints."""

# Core
from typing import List, Optional

# Libraries
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

# App - Core
from app.core.exceptions import NotFoundException

# App - Database
from app.db.session import get_db

# App - Models
from app.models.skill import Skill, SkillCategory

# App - Schemas
from app.schemas.skill import SkillResponse

router = APIRouter()


@router.get("", response_model=List[SkillResponse])
async def get_skills(
    category: Optional[SkillCategory] = None,
    active_only: bool = True,
    db: Session = Depends(get_db),
):
    """Get all skills, optionally filtered by category."""
    query = db.query(Skill)

    if active_only:
        query = query.filter(Skill.is_active.is_(True))

    if category:
        query = query.filter(Skill.category == category)

    skills = query.order_by(Skill.display_order, Skill.name).all()
    return skills


@router.get("/{skill_id}", response_model=SkillResponse)
async def get_skill(skill_id: int, db: Session = Depends(get_db)):
    """Get a specific skill by ID."""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise NotFoundException("Skill not found")
    return skill
