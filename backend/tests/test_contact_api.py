"""Contact API tests."""

from fastapi.testclient import TestClient

from app.main import socket_app

client = TestClient(socket_app)

VALID_CONTACT_PAYLOAD: dict[str, str] = {
    "name": "Test Visitor",
    "email": "visitor@example.com",
    "message": "Hello from pytest contact submission.",
}


def test_submit_contact_returns_201_with_persisted_fields() -> None:
    """POST /api/v1/contact creates a submission and returns ContactResponse."""
    response = client.post("/api/v1/contact", json=VALID_CONTACT_PAYLOAD)
    assert response.status_code == 201
    payload = response.json()
    assert payload["name"] == VALID_CONTACT_PAYLOAD["name"]
    assert payload["email"] == VALID_CONTACT_PAYLOAD["email"]
    assert payload["message"] == VALID_CONTACT_PAYLOAD["message"]
    assert payload["status"] == "pending"
    assert isinstance(payload["id"], int)


def test_submit_contact_rejects_short_message() -> None:
    """POST /api/v1/contact returns 422 when message is too short."""
    response = client.post(
        "/api/v1/contact",
        json={
            **VALID_CONTACT_PAYLOAD,
            "message": "short",
        },
    )
    assert response.status_code == 422
