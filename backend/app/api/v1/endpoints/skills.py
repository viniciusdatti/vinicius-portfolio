"""Skills endpoints."""

# Core
from typing import List, Optional

# Libraries
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

# App - Database
from app.db.session import get_db

# App - Models
from app.models.skill import Skill, SkillCategory
from app.models.user import User

# App - Schemas
from app.schemas.skill import SkillCreate, SkillUpdate, SkillResponse

# App - API
from app.api.v1.endpoints.auth import get_current_admin_user

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
        query = query.filter(Skill.is_active == True)
    
    if category:
        query = query.filter(Skill.category == category)
    
    skills = query.order_by(Skill.display_order, Skill.name).all()
    return skills


@router.get("/{skill_id}", response_model=SkillResponse)
async def get_skill(skill_id: int, db: Session = Depends(get_db)):
    """Get a specific skill by ID."""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found",
        )
    return skill


# Admin endpoints
@router.post("", response_model=SkillResponse, status_code=status.HTTP_201_CREATED)
async def create_skill(
    skill_data: SkillCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    """Create a new skill (admin only)."""
    skill = Skill(**skill_data.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


@router.put("/{skill_id}", response_model=SkillResponse)
async def update_skill(
    skill_id: int,
    skill_data: SkillUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    """Update a skill (admin only)."""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found",
        )
    
    update_data = skill_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(skill, field, value)
    
    db.commit()
    db.refresh(skill)
    return skill


@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    """Delete a skill (admin only)."""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Skill not found",
        )
    
    db.delete(skill)
    db.commit()
