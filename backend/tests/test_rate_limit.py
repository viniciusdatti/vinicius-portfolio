"""Rate limit helper tests."""

from app.core.rate_limit import get_contact_rate_limit, get_rate_limit_string


def test_get_rate_limit_string_uses_per_minute_value() -> None:
    """Rate limit string follows slowapi {count}/minute format."""
    assert get_rate_limit_string(12) == "12/minute"


def test_get_contact_rate_limit_is_relaxed_in_development() -> None:
    """Contact endpoint uses high dev limit to avoid 429 during local testing."""
    assert get_contact_rate_limit() == "99999/hour"
