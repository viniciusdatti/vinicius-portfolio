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
        # Check if data already exists
        existing_projects = db.query(Project).count()
        if existing_projects > 0 and not force:
            print(f"Database already has {existing_projects} projects. Skipping seed.")
            print("Use --force to replace existing data.")
            return
        
        if force and existing_projects > 0:
            print("Force mode: Deleting existing data...")
            # Delete in correct order due to foreign keys
            db.execute(text("DELETE FROM project_technologies"))
            db.query(Project).delete()
            db.query(Technology).delete()
            db.commit()

        print("Seeding technologies...")

        # Create technologies
        technologies = {
            "react": Technology(name="React", slug="react"),
            "javascript": Technology(name="JavaScript", slug="javascript"),
            "css": Technology(name="CSS", slug="css"),
            "html": Technology(name="HTML", slug="html"),
            "python": Technology(name="Python", slug="python"),
            "flask": Technology(name="Flask", slug="flask"),
            "rest_api": Technology(name="REST API", slug="rest-api"),
            "vite": Technology(name="Vite", slug="vite"),
            "docker": Technology(name="Docker", slug="docker"),
            "mysql": Technology(name="MySQL", slug="mysql"),
        }

        for tech in technologies.values():
            db.add(tech)

        db.flush()  # Flush to get IDs

        db.commit()  # Commit technologies first
        
        print("Seeding projects...")

        # Engineering case studies — GitHub repos reframed as product/system showcases
        project_data = [
            {
                "title": "Pulse Feed",
                "title_pt": "Pulse Feed",
                "description": (
                    "Social content surface: composable feed cards, interaction state "
                    "(likes, comments), and responsive layouts aligned with production "
                    "social product patterns."
                ),
                "description_pt": (
                    "Superfície de conteúdo social: cards de feed composáveis, estado de "
                    "interação (curtidas, comentários) e layouts responsivos no padrão de "
                    "produtos sociais em produção."
                ),
                "repository_url": "https://github.com/viniciusdatti/ReactGram",
                "techs": ["react", "javascript", "css"],
            },
            {
                "title": "Streamline",
                "title_pt": "Streamline",
                "description": (
                    "Media catalog browsing: horizontal category rails, density-aware "
                    "grids, and layered CSS for streaming-style layouts without an "
                    "external UI kit."
                ),
                "description_pt": (
                    "Navegação em catálogo de mídia: trilhos horizontais por categoria, "
                    "grids com densidade controlada e CSS em camadas para layouts no "
                    "padrão streaming, sem UI kit externo."
                ),
                "repository_url": "https://github.com/viniciusdatti/netflix_clone",
                "techs": ["react", "javascript", "css"],
            },
            {
                "title": "CineScope",
                "title_pt": "CineScope",
                "description": (
                    "Film discovery client on Vite: REST integration, explicit loading "
                    "and error boundaries, list/detail navigation, and metadata views "
                    "for ratings and synopsis."
                ),
                "description_pt": (
                    "Cliente de descoberta de filmes em Vite: integração REST, estados "
                    "de carregamento e erro explícitos, navegação lista/detalhe e "
                    "apresentação de ratings e sinopse."
                ),
                "repository_url": "https://github.com/viniciusdatti/movies_lib",
                "techs": ["react", "javascript", "vite", "rest_api"],
            },
            {
                "title": "Cipher Play",
                "title_pt": "Cipher Play",
                "description": (
                    "Word-guess experience driven by an explicit state machine: letter "
                    "input, scoring tiers, controlled re-renders, and immediate UI "
                    "feedback loops."
                ),
                "description_pt": (
                    "Experiência de adivinhação com máquina de estados explícita: "
                    "entrada por letras, níveis de pontuação, re-renders controlados e "
                    "feedback imediato na interface."
                ),
                "repository_url": "https://github.com/viniciusdatti/secret_word",
                "techs": ["react", "javascript", "css"],
            },
            {
                "title": "Taskline API",
                "title_pt": "Taskline API",
                "description": (
                    "Task lifecycle backend: Flask routing, request validation, and unit "
                    "tests documenting CRUD contracts for a future admin surface."
                ),
                "description_pt": (
                    "Backend de ciclo de tarefas: rotas Flask, validação de requests e "
                    "testes unitários que documentam contratos CRUD para uma superfície "
                    "admin futura."
                ),
                "repository_url": "https://github.com/viniciusdatti/tasks-flask-crud",
                "techs": ["python", "flask", "rest_api"],
            },
            {
                "title": "Gatekeeper Auth",
                "title_pt": "Gatekeeper Auth",
                "description": (
                    "Identity service with JWT: registration, login, refresh flows, "
                    "MySQL persistence, and containerized runtime for dev/prod parity."
                ),
                "description_pt": (
                    "Serviço de identidade com JWT: registro, login, fluxos de refresh, "
                    "persistência MySQL e runtime containerizado para paridade dev/prod."
                ),
                "repository_url": "https://github.com/viniciusdatti/sample-flask-auth",
                "techs": ["python", "flask", "docker", "mysql"],
            },
            {
                "title": "Layout Atlas",
                "title_pt": "Layout Atlas",
                "description": (
                    "Interface foundations: semantic markup, responsive grids, forms, "
                    "and landing compositions that establish layout discipline before "
                    "the React production stack."
                ),
                "description_pt": (
                    "Fundamentos de interface: marcação semântica, grids responsivos, "
                    "formulários e composições de landing que estabelecem disciplina de "
                    "layout antes da stack React em produção."
                ),
                "repository_url": "https://github.com/viniciusdatti/HTML-CSS",
                "techs": ["html", "css", "javascript"],
            },
        ]

        for data in project_data:
            # Get fresh technology references from the database
            tech_list = [technologies[tech_key] for tech_key in data["techs"]]
            
            project = Project(
                title=data["title"],
                title_pt=data["title_pt"],
                description=data["description"],
                description_pt=data["description_pt"],
                repository_url=data["repository_url"],
                demo_url=None,
                technologies=tech_list,
            )
            db.add(project)

        db.commit()
        print(f"Successfully seeded {len(project_data)} projects and {len(technologies)} technologies!")

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
