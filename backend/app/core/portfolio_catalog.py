"""Curated portfolio projects — titles match GitHub repository names (no fictional labels)."""

from dataclasses import dataclass, field
from typing import Tuple

GITHUB_OWNER: str = "viniciusdatti"


@dataclass(frozen=True)
class PortfolioProjectEntry:
    """Single portfolio repository entry aligned with github.com/{owner}/{repo_slug}."""

    repo_slug: str
    description_en: str
    description_pt: str
    technology_slugs: Tuple[str, ...]
    # True for primary engineering projects; False for studies and experiments.
    is_featured: bool = field(default=False)

    @property
    def repository_url(self) -> str:
        return f"https://github.com/{GITHUB_OWNER}/{self.repo_slug}"

    @property
    def title(self) -> str:
        return self.repo_slug


PORTFOLIO_PROJECTS: Tuple[PortfolioProjectEntry, ...] = (
    PortfolioProjectEntry(
        repo_slug="vinicius-portfolio",
        description_en=(
            "Full-stack portfolio monorepo for this site: FastAPI REST API + Socket.IO, "
            "React 19 with Vite, PostgreSQL/SQLite, pt-BR/en-US i18n, Live Lab telemetry "
            "demo, and project/skills content served from the API."
        ),
        description_pt=(
            "Monorepo full-stack deste portfólio: API REST FastAPI + Socket.IO, "
            "React 19 com Vite, PostgreSQL/SQLite, i18n pt-BR/en-US, demo de telemetria "
            "Live Lab e conteúdo de projetos/skills via API."
        ),
        technology_slugs=("react", "typescript", "python", "websocket"),
        is_featured=True,
    ),
    PortfolioProjectEntry(
        repo_slug="ReactGram",
        description_en=(
            "Instagram-style social feed in the reactgram/ Create React App: "
            "login/register, post timeline with likes, profile edit and publish pages, "
            "Redux Toolkit, React Router, and json-server mock API (data/db.json)."
        ),
        description_pt=(
            "Feed social estilo Instagram no CRA em reactgram/: login/cadastro, timeline "
            "de posts com curtidas, edição de perfil e publicação, Redux Toolkit, "
            "React Router e API mock com json-server (data/db.json)."
        ),
        technology_slugs=("javascript", "react"),
    ),
    PortfolioProjectEntry(
        repo_slug="tasks-flask-crud",
        description_en=(
            "Flask REST API for tasks kept in memory: POST/GET/PUT/DELETE on /tasks, "
            "Task model (id, title, description, completed), and pytest tests — no "
            "database persistence."
        ),
        description_pt=(
            "API REST Flask de tarefas em memória: POST/GET/PUT/DELETE em /tasks, "
            "modelo Task (id, título, descrição, concluída) e testes pytest — sem "
            "persistência em banco."
        ),
        technology_slugs=("python", "flask"),
    ),
    PortfolioProjectEntry(
        repo_slug="sample-flask-auth",
        description_en=(
            "Flask authentication API with MySQL (SQLAlchemy + PyMySQL), Flask-Login "
            "sessions, bcrypt password hashing, and user CRUD with admin/user role "
            "checks (README: authentication API with database)."
        ),
        description_pt=(
            "API Flask de autenticação com MySQL (SQLAlchemy + PyMySQL), sessões "
            "Flask-Login, senhas com bcrypt e CRUD de usuários com papéis admin/user "
            "(README: API de autenticação com banco de dados)."
        ),
        technology_slugs=("python", "flask", "mysql"),
    ),
)

PORTFOLIO_REPOSITORY_URLS: Tuple[str, ...] = tuple(
    entry.repository_url for entry in PORTFOLIO_PROJECTS
)
