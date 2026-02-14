"""Application configuration using pydantic-settings."""

# Core
from functools import lru_cache
from pathlib import Path
from typing import List, Optional

# Libraries
from pydantic_settings import BaseSettings, SettingsConfigDict

# Get the backend directory for SQLite database path
BACKEND_DIR = Path(__file__).parent.parent.parent


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Database - defaults to SQLite for easy development
    database_url: str = f"sqlite:///{BACKEND_DIR}/portfolio.db"

    # CORS
    cors_origins: str = "http://localhost:3000,http://localhost:5173"

    # Environment
    environment: str = "development"

    # Logging
    log_level: str = "INFO"

    # JWT Authentication
    jwt_secret_key: str = "your-super-secret-key-change-in-production"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 30
    jwt_refresh_token_expire_days: int = 7

    # Email (Resend)
    resend_api_key: Optional[str] = None
    email_from: str = "noreply@viniciusdatti.dev"
    email_to_admin: str = "viniciusdatti@gmail.com"

    # Telegram Notifications
    telegram_bot_token: Optional[str] = None
    telegram_chat_id: Optional[str] = None

    # Cloudinary
    cloudinary_cloud_name: Optional[str] = None
    cloudinary_api_key: Optional[str] = None
    cloudinary_api_secret: Optional[str] = None

    # Rate Limiting
    rate_limit_per_minute: int = 60
    rate_limit_contact_per_hour: int = 5

    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins from comma-separated string."""
        return [origin.strip() for origin in self.cors_origins.split(",")]

    @property
    def is_development(self) -> bool:
        """Check if running in development mode."""
        return self.environment.lower() == "development"

    @property
    def is_sqlite(self) -> bool:
        """Check if using SQLite database."""
        return self.database_url.startswith("sqlite")


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()
