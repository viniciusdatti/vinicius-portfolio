"""Telemetry simulation unit tests."""

from app.websocket.telemetry import SENSORS, _read_sensor


def test_read_sensor_returns_expected_channel_fields() -> None:
    """Simulated sensor readings include id, value, status, and thresholds."""
    reading = _read_sensor(SENSORS[0], t=0.0)
    assert reading["id"] == SENSORS[0]["id"]
    assert reading["label"] == SENSORS[0]["label"]
    assert isinstance(reading["value"], float)
    assert reading["status"] in {"ok", "warn", "critical"}
    assert reading["threshold_warn"] == SENSORS[0]["threshold_warn"]
    assert reading["threshold_critical"] == SENSORS[0]["threshold_critical"]


def test_sensors_catalog_exposes_four_demo_channels() -> None:
    """Telemetry demo exposes four generic industrial-style channels."""
    assert len(SENSORS) == 4
