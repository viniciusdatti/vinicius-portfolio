"""API 404 responses use standardized detail JSON payloads."""

from fastapi.testclient import TestClient

from app.main import socket_app

client = TestClient(socket_app)


def test_skill_not_found_returns_detail_json() -> None:
    """GET /api/v1/skills/{id} returns 404 with detail message."""
    response = client.get("/api/v1/skills/999999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Skill not found"}


def test_certificate_not_found_returns_detail_json() -> None:
    """GET /api/v1/certificates/{id} returns 404 with detail message."""
    response = client.get("/api/v1/certificates/999999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Certificate not found"}
