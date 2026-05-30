"""Skills API tests."""

from fastapi.testclient import TestClient

from app.main import socket_app

client = TestClient(socket_app)


def test_get_skills_returns_seeded_list() -> None:
    """GET /api/v1/skills returns active skills from catalog seed."""
    response = client.get("/api/v1/skills")
    assert response.status_code == 200
    payload = response.json()
    assert isinstance(payload, list)
    assert len(payload) > 0
    assert "name" in payload[0]
    assert "category" in payload[0]


def test_get_skill_by_id_returns_skill_when_present() -> None:
    """GET /api/v1/skills/{id} returns first seeded skill."""
    list_response = client.get("/api/v1/skills")
    skill_id: int = list_response.json()[0]["id"]

    response = client.get(f"/api/v1/skills/{skill_id}")
    assert response.status_code == 200
    assert response.json()["id"] == skill_id
