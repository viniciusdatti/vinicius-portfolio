# Vinicius Portfolio - Full-Stack Monorepo

Professional portfolio application demonstrating full-stack development skills.

## Project Structure

```
vinicius-portfolio/
├── backend/                  # FastAPI REST API
│   ├── app/
│   │   ├── api/              # API endpoints
│   │   ├── core/             # Configuration, logging, exceptions
│   │   ├── db/               # Database configuration
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   └── services/         # Business logic
│   ├── scripts/              # Utility scripts (seed, etc.)
│   ├── requirements.txt
│   └── .env.example
├── interfaces/
│   └── web/                  # React Frontend
│       ├── src/
│       │   ├── api/          # API client
│       │   ├── components/   # UI components
│       │   ├── hooks/        # Custom hooks
│       │   ├── i18n/         # Internationalization
│       │   ├── styles/       # Theme and global styles
│       │   └── pages/        # Route pages (single source for screens)
│       ├── public/
│       ├── package.json
│       └── .env.example
├── docs/                     # Documentation
│   └── portfolio/
│       ├── functional_requirements/
│       └── technical_specifications/
├── .cursor/                  # MCP (filesystem, shell, playwright) + agent rules
├── CONTRIBUTING.md
└── README.md
```

## Git workflow

- **`main`** — produção
- **`develop`** — integração contínua
- **`feature/*`** — desenvolvimento isolado

Detalhes: [docs/GIT_WORKFLOW.md](./docs/GIT_WORKFLOW.md) e [CONTRIBUTING.md](./CONTRIBUTING.md).

Agentes Cursor: [.cursor/README.md](./.cursor/README.md).

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy 2.x** - ORM for database operations
- **PostgreSQL** - Relational database
- **Pydantic** - Data validation

### Frontend (interfaces/web)
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - dev server on port 5173 (HMR)
- **TanStack Query** - Server state management
- **styled-components** - CSS-in-JS styling
- **react-i18next** - Internationalization (pt-BR / en-US)
- **Framer Motion** - Animations

## Ambiente local (recomendado)

**Docker:** PostgreSQL + FastAPI (reload). **Host:** Vite + React 19.

```bash
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up --build -d

cd interfaces/web && cp .env.example .env && yarn install && yarn dev
```

- Frontend (Vite): http://localhost:5173  
- API: http://localhost:8000  
- Guia: [docs/DOCKER.md](./docs/DOCKER.md) | Git: [docs/GIT_WORKFLOW.md](./docs/GIT_WORKFLOW.md)

## Getting Started

### Prerequisites

- Node.js 18+ (ou Docker)
- Python 3.11+ (ou Docker)
- PostgreSQL 14+ (ou Docker)
- Yarn

### Backend Setup

```bash
cd vinicius-portfolio/backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Linux/Mac)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Create database
createdb portfolio

# Seed initial data (optional)
python scripts/seed.py

# Run server (use socket_app for REST + WebSocket)
uvicorn app.main:socket_app --reload --port 8000
```

### Frontend Setup

```bash
cd vinicius-portfolio/interfaces/web

# Install dependencies
yarn install

# Configure environment
cp .env.example .env

# Run development server (Vite)
yarn dev
```

### Running Both

**From monorepo root (recommended):**

```bash
yarn dev:api   # Terminal 1 — http://127.0.0.1:8000
yarn dev:web   # Terminal 2 — http://localhost:3000
yarn health:api
yarn qa:audit  # smoke UI + API (both servers must be running)
```

**Manual (equivalent):**

```bash
cd backend
venv\Scripts\activate
python -m uvicorn app.main:socket_app --reload --port 8000

cd interfaces/web
yarn dev
```

- Frontend: http://localhost:5173
- API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/portfolio` |
| `CORS_ORIGINS` | Allowed origins (comma-separated) | `http://localhost:3000` |
| `ENVIRONMENT` | Environment name | `development` |
| `LOG_LEVEL` | Logging level | `INFO` |

### Frontend (`interfaces/web/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:8000/api/v1` |

## Features

- Full-Stack Architecture with REST API
- Database with Many-to-Many relationships
- Internationalization (pt-BR / en-US)
- Skeleton Loading states
- Global error handling
- Design System with tokens
- Dark Mode ready architecture

## Frontend architecture (interfaces/web)

Production-oriented patterns aligned with industrial SPA discipline:

| Layer | Location | Role |
|-------|----------|------|
| API client + guards | `src/api/` | axios client, `ApiError`, type guards (`isNotFoundError`, etc.) |
| Domain plugins | `src/plugins/` | Pure business logic (skills icons, chat mappers) — testable without React |
| Server state | TanStack Query hooks in `src/hooks/` | Skills, projects, certificates, telemetry |
| Client state | Zustand stores in `src/store/` | theme, auth, chat, workspace, toast |
| Live Lab | `src/components/workspace/` | WorkspaceShell — module rail, context panel, chat, telemetry + recharts |
| Design system | `src/components/` | Button, Card, Drawer (a11y), Spinner — `testId` prop via `TestableProps` |
| Errors | `RouteError`, `ErrorBoundary` | route `errorElement` + React error boundary |
| Tests | Vitest + RTL + MSW | unit/domain tests; handlers for projects, skills, certificates, chat |

**Scripts:** `yarn lint` · `yarn typecheck` · `yarn test` · `yarn build` · `yarn analyze` (bundle report → `dist/stats.html`)

Path alias: `@/` → `src/` (Vite + tsconfig + Vitest).
