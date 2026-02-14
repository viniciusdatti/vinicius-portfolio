"""Rate limiting configuration using slowapi."""

# Libraries
from slowapi import Limiter
from slowapi.util import get_remote_address

# App - Core
from app.core.config import get_settings

settings = get_settings()

# Create limiter instance
limiter = Limiter(key_func=get_remote_address)


def get_rate_limit_string(per_minute: int = None) -> str:
    """Get rate limit string for slowapi decorator."""
    limit = per_minute or settings.rate_limit_per_minute
    return f"{limit}/minute"


def get_contact_rate_limit() -> str:
    """Get rate limit string for contact endpoint."""
    return f"{settings.rate_limit_contact_per_hour}/hour"
