"""Certificates API tests."""

from fastapi.testclient import TestClient

from app.main import socket_app

client = TestClient(socket_app)


def test_get_certificates_returns_seeded_list() -> None:
    """GET /api/v1/certificates returns active certificates from catalog seed."""
    response = client.get("/api/v1/certificates")
    assert response.status_code == 200
    payload = response.json()
    assert isinstance(payload, list)
    assert len(payload) > 0
    assert "name" in payload[0]
    assert "platform" in payload[0]


def test_get_certificate_by_id_returns_certificate_when_present() -> None:
    """GET /api/v1/certificates/{id} returns first seeded certificate."""
    list_response = client.get("/api/v1/certificates")
    certificate_id: int = list_response.json()[0]["id"]

    response = client.get(f"/api/v1/certificates/{certificate_id}")
    assert response.status_code == 200
    assert response.json()["id"] == certificate_id
