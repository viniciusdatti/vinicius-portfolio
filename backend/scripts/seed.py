"""Seed script to populate the database with initial data."""

import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import text

from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.models.project import Project
from app.models.technology import Technology
from app.models.skill import Skill, SkillCategory
from app.models.certificate import Certificate
from app.services.portfolio_catalog_sync import sync_portfolio_projects

# Register every model on Base.metadata before create_all (Postgres/Docker prod).
import app.models  # noqa: F401


def create_tables():
    """Create all database tables."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")


def seed_data(force: bool = False):
    """Seed the database with initial portfolio data."""
    db = SessionLocal()

    try:
        existing_projects = db.query(Project).count()
        existing_skills = db.query(Skill).count()
        existing_certificates = db.query(Certificate).count()

        if force and (existing_projects > 0 or existing_skills > 0 or existing_certificates > 0):
            print("Force mode: Deleting existing data...")
            db.execute(text("DELETE FROM project_technologies"))
            db.query(Project).delete()
            db.query(Technology).delete()
            db.query(Certificate).delete()
            db.query(Skill).delete()
            db.commit()
            existing_projects = 0
            existing_skills = 0
            existing_certificates = 0

        should_seed_projects = existing_projects == 0 or force
        should_seed_skills = existing_skills == 0 or force
        should_seed_certificates = existing_certificates == 0 or force

        if not should_seed_projects:
            print(
                f"Database already has {existing_projects} projects. "
                "Syncing with portfolio catalog..."
            )
            synced_count: int = sync_portfolio_projects(db)
            print(
                f"Portfolio catalog sync complete ({synced_count} curated repositories)."
            )
        elif existing_projects > 0:
            db.execute(text("DELETE FROM project_technologies"))
            db.query(Project).delete()
            db.query(Technology).delete()
            db.commit()

        if should_seed_projects:
            print("Seeding projects (titles match GitHub repository names)...")
            synced_count: int = sync_portfolio_projects(db)
            print(
                f"Successfully seeded {synced_count} projects "
                f"from portfolio catalog!"
            )

        if not should_seed_skills:
            print(f"Database already has {existing_skills} skills. Skipping skills seed.")
        elif existing_skills > 0:
            db.query(Skill).delete()
            db.commit()

        if should_seed_skills:
            print("Seeding skills...")
            skill_data = [
                {
                    "name": "React",
                    "name_pt": "React",
                    "category": SkillCategory.FRONTEND,
                    "proficiency": 90,
                    "icon_url": "icons/react.svg",
                    "display_order": 0,
                },
                {
                    "name": "TypeScript",
                    "name_pt": "TypeScript",
                    "category": SkillCategory.FRONTEND,
                    "proficiency": 85,
                    "icon_url": "icons/typescript.svg",
                    "display_order": 1,
                },
                {
                    "name": "JavaScript",
                    "name_pt": "JavaScript",
                    "category": SkillCategory.FRONTEND,
                    "proficiency": 90,
                    "icon_url": "icons/javascript.svg",
                    "display_order": 2,
                },
                {
                    "name": "HTML5",
                    "name_pt": "HTML5",
                    "category": SkillCategory.FRONTEND,
                    "proficiency": 95,
                    "icon_url": "icons/html5.svg",
                    "display_order": 3,
                },
                {
                    "name": "CSS3",
                    "name_pt": "CSS3",
                    "category": SkillCategory.FRONTEND,
                    "proficiency": 90,
                    "icon_url": "icons/css3.svg",
                    "display_order": 4,
                },
                {
                    "name": "Styled Components",
                    "name_pt": "Styled Components",
                    "category": SkillCategory.FRONTEND,
                    "proficiency": 85,
                    "icon_url": "icons/styled-components.svg",
                    "display_order": 5,
                },
                {
                    "name": "Python",
                    "name_pt": "Python",
                    "category": SkillCategory.BACKEND,
                    "proficiency": 85,
                    "icon_url": "icons/python.svg",
                    "display_order": 6,
                },
                {
                    "name": "FastAPI",
                    "name_pt": "FastAPI",
                    "category": SkillCategory.BACKEND,
                    "proficiency": 80,
                    "icon_url": "icons/fastapi.svg",
                    "display_order": 7,
                },
                {
                    "name": "PostgreSQL",
                    "name_pt": "PostgreSQL",
                    "category": SkillCategory.BACKEND,
                    "proficiency": 75,
                    "icon_url": "icons/postgresql.svg",
                    "display_order": 8,
                },
                {
                    "name": "Jest",
                    "name_pt": "Jest",
                    "category": SkillCategory.TESTING,
                    "proficiency": 80,
                    "icon_url": "icons/jest.svg",
                    "display_order": 9,
                },
                {
                    "name": "Playwright",
                    "name_pt": "Playwright",
                    "category": SkillCategory.TESTING,
                    "proficiency": 70,
                    "icon_url": "icons/playwright.svg",
                    "display_order": 10,
                },
                {
                    "name": "Git",
                    "name_pt": "Git",
                    "category": SkillCategory.TOOLS,
                    "proficiency": 85,
                    "icon_url": "icons/git.svg",
                    "display_order": 11,
                },
                {
                    "name": "Docker",
                    "name_pt": "Docker",
                    "category": SkillCategory.TOOLS,
                    "proficiency": 70,
                    "icon_url": "icons/docker.svg",
                    "display_order": 12,
                },
                {
                    "name": "VS Code",
                    "name_pt": "VS Code",
                    "category": SkillCategory.TOOLS,
                    "proficiency": 95,
                    "icon_url": "icons/vscode.svg",
                    "display_order": 13,
                },
                {
                    "name": "Cursor",
                    "name_pt": "Cursor",
                    "category": SkillCategory.TOOLS,
                    "proficiency": 90,
                    "icon_url": "cursor-icon.png",
                    "display_order": 14,
                },
                {
                    "name": "AI tools",
                    "name_pt": "Ferramentas de IA",
                    "category": SkillCategory.TOOLS,
                    "proficiency": 85,
                    "icon_url": "ai-tools-icon.png",
                    "display_order": 15,
                },
                {
                    "name": "WebSocket",
                    "name_pt": "WebSocket",
                    "category": SkillCategory.REALTIME,
                    "proficiency": 75,
                    "icon_url": "icons/socketio.svg",
                    "display_order": 16,
                },
            ]

            for data in skill_data:
                db.add(Skill(**data))

            db.commit()
            print(f"Successfully seeded {len(skill_data)} skills!")

        if not should_seed_certificates:
            print(
                f"Database already has {existing_certificates} certificates. "
                "Skipping certificates seed."
            )
        elif existing_certificates > 0:
            db.query(Certificate).delete()
            db.commit()

        if should_seed_certificates:
            print("Seeding certificates...")
            certificate_data = [
                {
                    "name": "Python Fundamentals",
                    "name_pt": "Fundamentos de Python",
                    "platform": "Rocketseat",
                    "certificate_url": (
                        "https://app.rocketseat.com.br/certificates/"
                        "484a443c-0b2e-4ee7-bd49-8d03919ebd52"
                    ),
                    "year": 2025,
                    "display_order": 0,
                },
                {
                    "name": "Python with Flask",
                    "name_pt": "Python com Flask",
                    "platform": "Rocketseat",
                    "certificate_url": (
                        "https://app.rocketseat.com.br/certificates/"
                        "0bd49b7b-e481-4c67-9f42-e059be4d0a94"
                    ),
                    "year": 2025,
                    "display_order": 1,
                },
                {
                    "name": "Explore React with JavaScript",
                    "name_pt": "Explore React com JavaScript",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/degree/certificate/"
                        "6999f5a9-b6dd-4cce-b756-8d5738dabadb"
                    ),
                    "year": 2023,
                    "display_order": 2,
                },
                {
                    "name": "Improve your React app with automated testing",
                    "name_pt": "Melhore sua aplicação React com testes automatizados",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/degree/certificate/"
                        "42002daa-5432-4bad-96c5-24b80ba06e0d"
                    ),
                    "year": 2023,
                    "display_order": 3,
                },
                {
                    "name": "Complete Web Design: HTML5, CSS3 and JavaScript + 5 projects",
                    "name_pt": "Web Design Completo: HTML5, CSS3 e JavaScript + 5 projetos",
                    "platform": "Udemy",
                    "certificate_url": (
                        "https://udemy-certificate.s3.amazonaws.com/image/"
                        "UC-912d30a6-ed7b-4854-a113-a8f71195a847.jpg"
                    ),
                    "year": 2023,
                    "display_order": 4,
                },
                {
                    "name": "CSS: Deep Dive into Styles",
                    "name_pt": "CSS: aprofunde em estilos",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/degree/certificate/"
                        "43d6018a-d00d-43af-9f54-7fb207c0c28a"
                    ),
                    "year": 2024,
                    "display_order": 5,
                },
                {
                    "name": "React: Global State Management with ContextAPI",
                    "name_pt": "React: gerenciamento de estados globais com ContextAPI",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/certificate/"
                        "b284d47d-01be-482f-9116-85b83cbdc424"
                    ),
                    "year": 2023,
                    "display_order": 6,
                },
                {
                    "name": "Git and GitHub: repository, commit and versions",
                    "name_pt": "Git e GitHub: repositório, commit e versões",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/certificate/"
                        "5659f1f1-973e-4921-b577-de3a9e7472d1"
                    ),
                    "year": 2023,
                    "display_order": 7,
                },
                {
                    "name": "TypeScript Part 1: Evolving Your JavaScript",
                    "name_pt": "TypeScript parte 1: evoluindo seu JavaScript",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/certificate/"
                        "a2a3d58f-ea00-40ca-9590-3d7c6b2a7f8c"
                    ),
                    "year": 2023,
                    "display_order": 8,
                },
                {
                    "name": "TypeScript Part 2: Advancing in the language",
                    "name_pt": "TypeScript parte 2: avançando na linguagem",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/certificate/"
                        "cc58c86c-0467-4c6a-982d-2caedd25b5ae"
                    ),
                    "year": 2023,
                    "display_order": 9,
                },
                {
                    "name": "React with TypeScript: developing an admin area",
                    "name_pt": "React com TypeScript: desenvolvendo uma área administrativa",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/certificate/"
                        "9ee980b3-f18c-4982-ae4c-72e54cf33969"
                    ),
                    "year": 2023,
                    "display_order": 10,
                },
                {
                    "name": "React: abstracting your CSS with Styled Components",
                    "name_pt": "React: abstraindo seu CSS com Styled Components",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/certificate/"
                        "66a1bdb5-5ac1-43dc-9737-949cf5809b06"
                    ),
                    "year": 2023,
                    "display_order": 11,
                },
                {
                    "name": "Angular: write end-to-end tests with Playwright",
                    "name_pt": "Angular: escreva testes end-to-end com Playwright",
                    "platform": "Alura",
                    "certificate_url": (
                        "https://cursos.alura.com.br/certificate/"
                        "4c998df4-9b4e-47fc-a5e2-b4b118568042"
                    ),
                    "year": 2024,
                    "display_order": 12,
                },
            ]

            for data in certificate_data:
                db.add(Certificate(**data))

            db.commit()
            print(f"Successfully seeded {len(certificate_data)} certificates!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--force", action="store_true", help="Force replace existing data")
    args = parser.parse_args()
    
    create_tables()
    seed_data(force=args.force)
