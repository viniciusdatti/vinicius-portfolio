"""Seed script to populate the database with initial data."""

import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.models.project import Project
from app.models.technology import Technology


def create_tables():
    """Create all database tables."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")


def seed_data():
    """Seed the database with initial portfolio data."""
    db = SessionLocal()

    try:
        # Check if data already exists
        existing_projects = db.query(Project).count()
        if existing_projects > 0:
            print(f"Database already has {existing_projects} projects. Skipping seed.")
            return

        print("Seeding technologies...")

        # Create technologies
        technologies = {
            "react": Technology(name="React", slug="react"),
            "typescript": Technology(name="TypeScript", slug="typescript"),
            "storybook": Technology(name="Storybook", slug="storybook"),
            "styled_components": Technology(
                name="Styled Components", slug="styled-components"
            ),
            "chartjs": Technology(name="Chart.js", slug="chartjs"),
            "rest_api": Technology(name="REST API", slug="rest-api"),
            "nodejs": Technology(name="Node.js", slug="nodejs"),
            "postgresql": Technology(name="PostgreSQL", slug="postgresql"),
            "python": Technology(name="Python", slug="python"),
            "fastapi": Technology(name="FastAPI", slug="fastapi"),
        }

        for tech in technologies.values():
            db.add(tech)

        db.flush()  # Flush to get IDs

        print("Seeding projects...")

        # Create projects
        projects = [
            Project(
                title="Corporate Design System",
                title_pt="Sistema de Design Corporativo",
                description="Reusable component library and living documentation to standardize enterprise product interfaces, with design tokens and WCAG accessibility.",
                description_pt="Biblioteca de componentes reutilizáveis e documentação viva para padronizar a interface de produtos enterprise, com tokens de design e acessibilidade WCAG.",
                repository_url="https://github.com/viniciusdev/design-system",
                demo_url="https://design-system.example.com",
                technologies=[
                    technologies["react"],
                    technologies["typescript"],
                    technologies["storybook"],
                    technologies["styled_components"],
                ],
            ),
            Project(
                title="Performance Dashboard",
                title_pt="Dashboard de Performance",
                description="Real-time panel for business metrics, with interactive charts, period filters and report export.",
                description_pt="Painel em tempo real para métricas de negócio, com gráficos interativos, filtros por período e exportação de relatórios.",
                repository_url="https://github.com/viniciusdev/dashboard",
                demo_url=None,
                technologies=[
                    technologies["react"],
                    technologies["typescript"],
                    technologies["chartjs"],
                    technologies["rest_api"],
                ],
            ),
            Project(
                title="Investment Platform",
                title_pt="Plataforma de Investimentos",
                description="Application for portfolio simulation, asset tracking and onboarding of new investors with a guided flow.",
                description_pt="Aplicação para simulação de carteira, acompanhamento de ativos e onboarding de novos investidores com fluxo guiado.",
                repository_url="https://github.com/viniciusdev/investment-platform",
                demo_url="https://investments.example.com",
                technologies=[
                    technologies["react"],
                    technologies["typescript"],
                    technologies["nodejs"],
                    technologies["postgresql"],
                ],
            ),
            Project(
                title="Portfolio API",
                title_pt="API do Portfólio",
                description="RESTful API built with FastAPI to serve portfolio data, demonstrating backend development skills with Python.",
                description_pt="API RESTful construída com FastAPI para servir dados do portfólio, demonstrando habilidades de desenvolvimento backend com Python.",
                repository_url="https://github.com/viniciusdev/portfolio-api",
                demo_url=None,
                technologies=[
                    technologies["python"],
                    technologies["fastapi"],
                    technologies["postgresql"],
                    technologies["rest_api"],
                ],
            ),
        ]

        for project in projects:
            db.add(project)

        db.commit()
        print(f"Successfully seeded {len(projects)} projects and {len(technologies)} technologies!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    create_tables()
    seed_data()
