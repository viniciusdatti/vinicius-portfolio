# Vinicius Portfolio

[![CI](https://github.com/viniciusdatti/vinicius-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/viniciusdatti/vinicius-portfolio/actions)
[![Deployments](https://img.shields.io/badge/deployments-95-brightgreen)](https://viniciusdatti-portfolio.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)

**[→ Live Demo](https://viniciusdatti-portfolio.vercel.app)**

Personal portfolio built as a production-grade SPA — monorepo with React 19 + TypeScript on the frontend, FastAPI + PostgreSQL on the backend, WebSocket for real-time telemetry, and automated CI/CD with 95+ deployments.

---

## Engineering Highlights

- **Strict TypeScript end-to-end** — fully typed frontend and backend with explicit type guards in the API layer
- **Multi-layer testing** — Vitest + RTL + MSW (unit/integration); Playwright (E2E); component coverage with Testing Library
- **Real-time WebSocket telemetry** — live state monitor via WorkspaceShell, continuous streams with recharts
- **Full i18n** — pt-BR / en-US via react-i18next with lazy-loaded namespaces
- **Robust error handling** — per-route RouteError boundary + global React ErrorBoundary
- **Design System with tokens** — styled-components + dark-mode-ready theme, components with testId via TestableProps
- **Semantic Git workflow** — conventional PR prefixes, branches feature/* -> develop -> master
- **CI/CD** — automated pipeline with continuous deployment to Vercel

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 19, TypeScript, Vite, styled-components, Framer Motion |
| **State** | TanStack Query (server state) + Zustand (client state) |
| **Testing** | Vitest, React Testing Library, MSW, Playwright |
| **Backend** | FastAPI, SQLAlchemy 2.x, Pydantic, WebSocket |
| **Database** | PostgreSQL 14+ |
| **DevOps** | GitHub Actions, Vercel, Docker Compose |
| **i18n** | react-i18next (pt-BR / en-US) |

---

## Frontend Architecture (interfaces/web)

```
src/
├── api/           # axios client, ApiError, type guards
├── plugins/       # pure domain logic (testable without React)
├── hooks/         # TanStack Query — skills, projects, certificates, telemetry
├── store/         # Zustand — theme, telemetry, toast
├── components/
│   ├── workspace/ # WorkspaceShell — telemetry monitor + recharts
│   └── ui/        # Button, Card, Drawer (a11y), Spinner
└── pages/         # route pages — errorElement per route
```

**Path alias:** @/ -> src/ (Vite + tsconfig + Vitest)

**Scripts:** yarn lint · yarn typecheck · yarn test · yarn build · yarn analyze

---

## Monorepo Structure

```
vinicius-portfolio/
├── backend/           # FastAPI REST API
│   ├── app/
│   │   ├── api/       # endpoints
│   │   ├── core/      # config, logging, exceptions
│   │   ├── db/        # database config
│   │   ├── models/    # SQLAlchemy models
│   │   ├── schemas/   # Pydantic schemas
│   │   └── services/  # business logic
│   └── requirements.txt
├── interfaces/
│   └── web/           # React Frontend
├── docs/              # functional_requirements + technical_specifications
├── .github/           # CI workflows
└── .cursor/           # MCP (filesystem, shell, playwright)
```

---

## Getting Started

### Prerequisites

- Node.js 18+ · Python 3.11+ · PostgreSQL 14+ · Yarn
- Or: **Docker** (recommended)

### With Docker (recommended)

```bash
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up --build -d

cd interfaces/web && cp .env.example .env && yarn install && yarn dev
```

| Service | URL |
|---------|-----|
| Frontend (Vite) | http://localhost:5173 |
| API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

### Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv && source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
cp .env.example .env
createdb portfolio
python scripts/seed.py          # optional
uvicorn app.main:socket_app --reload --port 8000
```

**Frontend:**
```bash
cd interfaces/web
yarn install && cp .env.example .env && yarn dev
```

**From monorepo root:**
```bash
yarn dev:api   # Terminal 1
yarn dev:web   # Terminal 2
yarn qa:audit  # smoke tests — UI + API (both servers must be running)
```

---

## Environment Variables

**Backend (backend/.env):**

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://postgres:postgres@localhost:5432/portfolio |
| CORS_ORIGINS | Allowed origins (comma-separated) | http://localhost:3000 |
| ENVIRONMENT | Environment name | development |
| LOG_LEVEL | Logging level | INFO |

**Frontend (interfaces/web/.env):**

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:8000/api/v1 |

---

## Git Workflow

- `master` — production
- `develop` — continuous integration
- `feature/*` — isolated development

Details: `docs/GIT_WORKFLOW.md` and `CONTRIBUTING.md`.

---

## License

MIT — © Vinicius Datti
