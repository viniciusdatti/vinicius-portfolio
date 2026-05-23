# Core
import enum

# Libraries
from sqlalchemy import Boolean, Enum, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

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

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    name_pt: Mapped[str | None] = mapped_column(String(100), nullable=True)
    category: Mapped[SkillCategory] = mapped_column(
        Enum(SkillCategory),
        nullable=False,
        index=True,
    )
    proficiency: Mapped[int] = mapped_column(Integer, default=50)  # 0-100
    icon_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    display_order: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
