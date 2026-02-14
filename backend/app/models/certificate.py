# Libraries
from sqlalchemy import Column, Integer, String, Boolean

# App - Database
from app.db.base import Base


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    name_pt = Column(String(200), nullable=True)
    platform = Column(String(100), nullable=False)
    platform_logo_url = Column(String(500), nullable=True)
    certificate_url = Column(String(500), nullable=True)
    image_url = Column(String(500), nullable=True)
    year = Column(Integer, nullable=True)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True, nullable=False)
