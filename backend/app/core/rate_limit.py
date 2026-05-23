"""Rate limiting configuration using slowapi."""

# Libraries
from slowapi import Limiter
from slowapi.util import get_remote_address

# App - Core
from app.core.config import get_settings

settings = get_settings()

# Create limiter instance
limiter = Limiter(key_func=get_remote_address)


def get_rate_limit_string(per_minute: int | None = None) -> str:
    """Get rate limit string for slowapi decorator."""
    limit = per_minute or settings.rate_limit_per_minute
    return f"{limit}/minute"


def get_contact_rate_limit() -> str:
    """Get rate limit string for contact endpoint.
    In development, effectively no limit (99999/hour) to avoid 429 during testing.
    """
    if get_settings().is_development:
        return "99999/hour"
    return f"{settings.rate_limit_contact_per_hour}/hour"
