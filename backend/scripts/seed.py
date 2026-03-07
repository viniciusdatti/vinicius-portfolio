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

        # Create projects - Real projects from GitHub
        project_data = [
            {
                "title": "ReactGram",
                "title_pt": "ReactGram",
                "description": "Instagram clone built with React, featuring photo sharing, likes, comments, and user profiles. A full-stack social media application.",
                "description_pt": "Clone do Instagram construído com React, com compartilhamento de fotos, curtidas, comentários e perfis de usuário. Uma aplicação full-stack de rede social.",
                "repository_url": "https://github.com/viniciusdatti/ReactGram",
                "techs": ["react", "javascript", "css"],
            },
            {
                "title": "Netflix Clone",
                "title_pt": "Clone da Netflix",
                "description": "Netflix UI clone built with React, featuring movie browsing, categories, and responsive design inspired by the streaming platform.",
                "description_pt": "Clone da interface da Netflix construído com React, com navegação de filmes, categorias e design responsivo inspirado na plataforma de streaming.",
                "repository_url": "https://github.com/viniciusdatti/netflix_clone",
                "techs": ["react", "javascript", "css"],
            },
            {
                "title": "Movies Lib",
                "title_pt": "Biblioteca de Filmes",
                "description": "Movie library application built with React and Vite, consuming an external API to display movie information, ratings, and details.",
                "description_pt": "Aplicação de biblioteca de filmes construída com React e Vite, consumindo API externa para exibir informações, avaliações e detalhes de filmes.",
                "repository_url": "https://github.com/viniciusdatti/movies_lib",
                "techs": ["react", "javascript", "vite", "rest_api"],
            },
            {
                "title": "Secret Word",
                "title_pt": "Palavra Secreta",
                "description": "Word guessing game built with React. Players try to discover the secret word by guessing letters, with score tracking and difficulty levels.",
                "description_pt": "Jogo de adivinhação de palavras construído com React. Os jogadores tentam descobrir a palavra secreta adivinhando letras, com pontuação e níveis de dificuldade.",
                "repository_url": "https://github.com/viniciusdatti/secret_word",
                "techs": ["react", "javascript", "css"],
            },
            {
                "title": "Tasks Flask CRUD",
                "title_pt": "CRUD de Tarefas com Flask",
                "description": "RESTful API for task management built with Flask and Python. Implements full CRUD operations with unit tests.",
                "description_pt": "API RESTful para gerenciamento de tarefas construída com Flask e Python. Implementa operações CRUD completas com testes unitários.",
                "repository_url": "https://github.com/viniciusdatti/tasks-flask-crud",
                "techs": ["python", "flask", "rest_api"],
            },
            {
                "title": "Flask Auth API",
                "title_pt": "API de Autenticação Flask",
                "description": "Authentication API with Flask featuring user registration, login, JWT tokens, and database integration with Docker support.",
                "description_pt": "API de autenticação com Flask, com registro de usuários, login, tokens JWT e integração com banco de dados com suporte a Docker.",
                "repository_url": "https://github.com/viniciusdatti/sample-flask-auth",
                "techs": ["python", "flask", "docker", "mysql"],
            },
            {
                "title": "HTML-CSS Projects",
                "title_pt": "Projetos HTML-CSS",
                "description": "Collection of frontend projects built with HTML and CSS, including landing pages, forms, and responsive layouts. Demonstrates fundamental web development skills.",
                "description_pt": "Coleção de projetos frontend construídos com HTML e CSS, incluindo landing pages, formulários e layouts responsivos. Demonstra habilidades fundamentais de desenvolvimento web.",
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
