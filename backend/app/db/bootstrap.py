"""Database bootstrap — create tables and seed portfolio catalog when incomplete."""

# Core
import importlib.util
import logging
import sys
from pathlib import Path
from types import ModuleType

# App - Database
from app.db.base import Base
from app.db.session import SessionLocal, engine

logger = logging.getLogger(__name__)

_BACKEND_ROOT: Path = Path(__file__).resolve().parent.parent.parent


def _load_seed_module() -> ModuleType | None:
    """Load scripts/seed.py without requiring scripts to be a Python package."""
    seed_path: Path = _BACKEND_ROOT / "scripts" / "seed.py"
    if not seed_path.is_file():
        logger.warning("Seed script missing at %s", seed_path)
        return None

    if str(_BACKEND_ROOT) not in sys.path:
        sys.path.insert(0, str(_BACKEND_ROOT))

    spec = importlib.util.spec_from_file_location("portfolio_seed_script", seed_path)
    if spec is None or spec.loader is None:
        logger.warning("Could not load seed module spec from %s", seed_path)
        return None

    module: ModuleType = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def ensure_catalog_seeded() -> None:
    """
    Ensure schema exists and portfolio skills/certificates are present.
    Safe for production: only runs seed_data when counts are zero per entity type.
    """
    import app.models  # noqa: F401 — register models on Base.metadata
    from app.models.certificate import Certificate
    from app.models.skill import Skill

    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        skill_count: int = db.query(Skill).count()
        cert_count: int = db.query(Certificate).count()
        if skill_count > 0 and cert_count > 0:
            return
        logger.info(
            "Incomplete catalog (skills=%s, certificates=%s); running seed.",
            skill_count,
            cert_count,
        )
    finally:
        db.close()

    seed_module: ModuleType | None = _load_seed_module()
    if seed_module is None:
        return

    create_tables = getattr(seed_module, "create_tables", None)
    seed_data = getattr(seed_module, "seed_data", None)

    if callable(create_tables):
        create_tables()
    if callable(seed_data):
        seed_data(force=False)
