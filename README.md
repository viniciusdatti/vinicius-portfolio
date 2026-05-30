# Vinicius Portfolio

[![CI](https://github.com/viniciusdatti/vinicius-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/viniciusdatti/vinicius-portfolio/actions)
[![Deployments](https://img.shields.io/badge/deployments-95-brightgreen)](https://viniciusdatti-portfolio.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)

**[→ Ver demo em produção](https://viniciusdatti-portfolio.vercel.app)**

Portfolio pessoal construído como SPA de nível produção — arquitetura monorepo com React 19 + TypeScript no front, FastAPI + PostgreSQL no back, WebSocket para telemetria em tempo real e CI/CD automatizado com 95+ deployments.

---

## Destaques de Engenharia

- **TypeScript strict end-to-end** — frontend + backend tipados, type guards explícitos na camada de API
- **Testes em múltiplas camadas** — Vitest + RTL + MSW (unit/integration); Playwright (E2E); cobertura de componentes com Testing Library
- **WebSocket + telemetria em tempo real** — monitor de estado via WorkspaceShell, streams contínuos com recharts
- **i18n completo** — pt-BR / en-US via react-i18next com lazy loading de namespaces
- **Error handling robusto** — RouteError boundary por rota + React ErrorBoundary global
- **Design System com tokens** — styled-components + tema escuro-ready, componentes com testId via TestableProps
- **Git workflow semântico** — PRs com prefixos convencionais, branches feature/* -> develop -> master
- **CI/CD** — pipeline automatizado, deploy contínuo na Vercel

---

## Stack

| Camada | Tecnologias |
|--------|-------------|
| **Frontend** | React 19, TypeScript, Vite, styled-components, Framer Motion |
| **Estado** | TanStack Query (server state) + Zustand (client state) |
| **Testes** | Vitest, React Testing Library, MSW, Playwright |
| **Backend** | FastAPI, SQLAlchemy 2.x, Pydantic, WebSocket |
| **Banco** | PostgreSQL 14+ |
| **DevOps** | GitHub Actions, Vercel, Docker Compose |
| **i18n** | react-i18next (pt-BR / en-US) |

---

## Arquitetura Frontend (interfaces/web)

```
src/
├── api/           # axios client, ApiError, type guards
├── plugins/       # lógica de domínio pura (testável sem React)
├── hooks/         # TanStack Query — skills, projects, certificates, telemetry
├── store/         # Zustand — theme, telemetry, toast
├── components/
│   ├── workspace/ # WorkspaceShell — monitor de telemetria + recharts
│   └── ui/        # Button, Card, Drawer (a11y), Spinner
└── pages/         # Route pages — errorElement por rota
```

**Path alias:** @/ -> src/ (Vite + tsconfig + Vitest)

**Scripts:** yarn lint · yarn typecheck · yarn test · yarn build · yarn analyze

---

## Estrutura do Monorepo

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

## Setup Local

### Pré-requisitos

- Node.js 18+ · Python 3.11+ · PostgreSQL 14+ · Yarn
- Ou: **Docker** (recomendado)

### Com Docker (recomendado)

```bash
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up --build -d

cd interfaces/web && cp .env.example .env && yarn install && yarn dev
```

| Serviço | URL |
|---------|-----|
| Frontend (Vite) | http://localhost:5173 |
| API | http://localhost:8000 |
| Docs API | http://localhost:8000/docs |

### Manual

**Backend:**
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
createdb portfolio
python scripts/seed.py
uvicorn app.main:socket_app --reload --port 8000
```

**Frontend:**
```bash
cd interfaces/web
yarn install && cp .env.example .env && yarn dev
```

**A partir da raiz:**
```bash
yarn dev:api   # Terminal 1
yarn dev:web   # Terminal 2
yarn qa:audit  # smoke tests UI + API
```

---

## Variáveis de Ambiente

**Backend (backend/.env):**

| Variável | Descrição | Default |
|----------|-----------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://postgres:postgres@localhost:5432/portfolio |
| CORS_ORIGINS | Origins permitidas (vírgula) | http://localhost:3000 |
| ENVIRONMENT | Ambiente | development |

**Frontend (interfaces/web/.env):**

| Variável | Descrição | Default |
|----------|-----------|---------|
| VITE_API_URL | Backend API URL | http://localhost:8000/api/v1 |

---

## Git Workflow

- master — produção
- develop — integração contínua
- feature/* — desenvolvimento isolado

Detalhes: docs/GIT_WORKFLOW.md e CONTRIBUTING.md.

---

## Licença

MIT — © Vinicius Datti
