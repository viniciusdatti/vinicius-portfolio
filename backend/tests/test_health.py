"""Health endpoint tests."""

from fastapi.testclient import TestClient

from app.main import socket_app

client = TestClient(socket_app)


def test_health_returns_healthy_payload() -> None:
    """GET /health returns status and version."""
    response = client.get("/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "healthy"
    assert payload["version"] == "2.0.0"
