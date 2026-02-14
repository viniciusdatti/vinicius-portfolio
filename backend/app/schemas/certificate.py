# Core
from typing import Optional

# Libraries
from pydantic import BaseModel, Field


class CertificateBase(BaseModel):
    name: str = Field(..., max_length=200)
    name_pt: Optional[str] = Field(None, max_length=200)
    platform: str = Field(..., max_length=100)
    platform_logo_url: Optional[str] = Field(None, max_length=500)
    certificate_url: Optional[str] = Field(None, max_length=500)
    image_url: Optional[str] = Field(None, max_length=500)
    year: Optional[int] = None
    display_order: int = 0
    is_active: bool = True


class CertificateCreate(CertificateBase):
    pass


class CertificateUpdate(BaseModel):
    name: Optional[str] = Field(None, max_length=200)
    name_pt: Optional[str] = Field(None, max_length=200)
    platform: Optional[str] = Field(None, max_length=100)
    platform_logo_url: Optional[str] = Field(None, max_length=500)
    certificate_url: Optional[str] = Field(None, max_length=500)
    image_url: Optional[str] = Field(None, max_length=500)
    year: Optional[int] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class CertificateResponse(CertificateBase):
    id: int

    class Config:
        from_attributes = True
