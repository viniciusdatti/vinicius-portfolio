"""Telemetry simulation — emits sensor data via WebSocket for the Live Lab demo."""

# Core
import asyncio
import logging
import math
import random
import time

logger = logging.getLogger(__name__)

# ============================================================
# Sensor definitions — mimics industrial equipment monitoring
# ============================================================

SENSORS = [
    {
        "id": "crusher_rpm",
        "label": "Crusher RPM",
        "unit": "rpm",
        "base": 1450,
        "amplitude": 80,
        "noise": 15,
        "threshold_warn": 1550,
        "threshold_critical": 1600,
        "period": 18,
    },
    {
        "id": "motor_temp",
        "label": "Motor Temp",
        "unit": "°C",
        "base": 72,
        "amplitude": 12,
        "noise": 2,
        "threshold_warn": 80,
        "threshold_critical": 88,
        "period": 25,
    },
    {
        "id": "feed_pressure",
        "label": "Feed Pressure",
        "unit": "bar",
        "base": 4.2,
        "amplitude": 1.1,
        "noise": 0.15,
        "threshold_warn": 5.0,
        "threshold_critical": 5.4,
        "period": 12,
    },
    {
        "id": "vibration",
        "label": "Vibration",
        "unit": "mm/s",
        "base": 3.8,
        "amplitude": 2.2,
        "noise": 0.4,
        "threshold_warn": 5.5,
        "threshold_critical": 7.0,
        "period": 8,
    },
]


def _read_sensor(sensor: dict, t: float) -> dict:
    """Generate a realistic sensor reading using sine wave + noise."""
    wave = sensor["amplitude"] * math.sin(2 * math.pi * t / sensor["period"])
    noise = random.uniform(-sensor["noise"], sensor["noise"])
    value = round(sensor["base"] + wave + noise, 2)

    if value >= sensor["threshold_critical"]:
        status = "critical"
    elif value >= sensor["threshold_warn"]:
        status = "warn"
    else:
        status = "ok"

    return {
        "id": sensor["id"],
        "label": sensor["label"],
        "unit": sensor["unit"],
        "value": value,
        "threshold_warn": sensor["threshold_warn"],
        "threshold_critical": sensor["threshold_critical"],
        "status": status,
        "ts": round(time.time() * 1000),
    }


async def start_telemetry_loop(sio) -> None:
    """Continuously emit sensor readings to all connected telemetry clients."""
    logger.info("Telemetry loop started")
    t = 0.0
    while True:
        readings = [_read_sensor(s, t) for s in SENSORS]
        await sio.emit(
            "telemetry_tick",
            {"readings": readings, "ts": round(time.time() * 1000)},
            namespace="/telemetry",
        )
        t += 2.0
        await asyncio.sleep(2.0)
