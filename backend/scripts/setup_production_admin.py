"""
Create users table (if missing) and admin user in the database.
Run with DATABASE_URL pointing to your production DB (e.g. Neon).

Security: you will be prompted for a password (no default). Do not use a
weak or shared password.

Example (PowerShell, use single quotes for the URL):
  $env:DATABASE_URL = 'postgresql://user:pass@host/db?sslmode=require'
  python scripts/setup_production_admin.py
"""

# Core
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

# App - ensure all models are loaded so create_all creates users table
from app.db.base import Base
from app.db.session import engine
from app.models.user import User, UserRole
from app.models.project import Project
from app.models.technology import Technology

# Other models so all tables exist
from app.models import (  # noqa: F401
    Skill,
    Certificate,
    ChatSession,
    ChatMessage,
    ContactSubmission,
)

# App - create admin
from scripts.create_admin import create_admin_user

ADMIN_EMAIL = "admin@viniciusdatti.com"
ADMIN_NAME = "Vinicius Datti"


def read_password() -> str:
    """Read password from prompt or env. No default for security."""
    if sys.stdin.isatty():
        try:
            import getpass
            pwd: str = getpass.getpass("Digite a senha do admin (não será exibida): ")
            if len(pwd) < 8:
                print("Erro: senha deve ter no mínimo 8 caracteres.")
                sys.exit(1)
            pwd2: str = getpass.getpass("Confirme a senha: ")
            if pwd != pwd2:
                print("Erro: senhas não conferem.")
                sys.exit(1)
            return pwd
        except Exception as e:
            print(f"Erro ao ler senha: {e}")
            sys.exit(1)
    # Non-interactive: require env var
    pwd = os.environ.get("ADMIN_PASSWORD")
    if not pwd or len(pwd) < 8:
        print(
            "Modo não-interativo: defina a variável ADMIN_PASSWORD (mín. 8 caracteres)."
        )
        sys.exit(1)
    return pwd


def main() -> None:
    print("Ensuring database tables exist...")
    Base.metadata.create_all(bind=engine)
    print("Tables OK.")

    password: str = read_password()
    print("Creating admin user...")
    create_admin_user(
        email=ADMIN_EMAIL,
        password=password,
        name=ADMIN_NAME,
        role=UserRole.SUPER_ADMIN,
    )
    print("Done. Use this email and your chosen password at /admin/login.")


if __name__ == "__main__":
    main()
