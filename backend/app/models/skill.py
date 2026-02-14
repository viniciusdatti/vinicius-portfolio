# Core
import enum

# Libraries
from sqlalchemy import Column, Integer, String, Enum, Boolean

# App - Database
from app.db.base import Base


class SkillCategory(str, enum.Enum):
    FRONTEND = "frontend"
    BACKEND = "backend"
    TESTING = "testing"
    REALTIME = "realtime"
    TOOLS = "tools"
    IOT = "iot"


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    name_pt = Column(String(100), nullable=True)
    category = Column(Enum(SkillCategory), nullable=False, index=True)
    proficiency = Column(Integer, default=50)  # 0-100
    icon_url = Column(String(500), nullable=True)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True, nullable=False)
