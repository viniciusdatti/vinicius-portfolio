# Docker + Vite — ambiente local profissional

## Arquitetura de desenvolvimento

| Camada | Onde roda | Porta |
|--------|-----------|-------|
| **Frontend** | Host (Vite) | `5173` |
| **Backend** | Docker | `8000` |
| **PostgreSQL** | Docker | `5432` |

O navegador e o Playwright MCP acessam o Vite no host. A API FastAPI é publicada em `localhost:8000`.

## Início rápido

```powershell
# 1. Infra (Postgres + API)
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up --build -d

# 2. Frontend (outro terminal)
cd interfaces/web
cp .env.example .env
yarn install
yarn dev
```

- App: http://localhost:5173  
- API: http://localhost:8000/docs  
- Health: http://localhost:8000/health  

### Raiz do monorepo

```powershell
yarn docker:up      # só backend + postgres
yarn dev:web        # Vite
yarn docker:validate
yarn docker:qa      # Playwright smoke (com stack no ar)
```

## Variáveis

| Arquivo | Uso |
|---------|-----|
| `.env.docker` | Compose: Postgres, CORS, `RUN_SEED` |
| `interfaces/web/.env` | `VITE_API_URL`, `VITE_DEV_PORT` |
| `backend/.env` | Secrets opcionais (Resend, Telegram) |

`DATABASE_URL` no container: `postgresql://portfolio:portfolio@postgres:5432/portfolio` (override automático no compose).

## Hot reload

- **FastAPI:** volume `./backend:/app` + `uvicorn --reload`
- **Vite:** HMR nativo no host (sem container frontend)

## MCP + Cursor + Playwright

- Base URL: `http://localhost:5173` (`.cursor/playwright-mcp.config.json`)
- API permitida: `localhost:8000`
- Suba Docker antes do frontend para evitar erros de API na primeira carga

## Produção local (preview)

```bash
docker compose -f docker-compose.prod.yml --env-file .env.docker up --build
```

Frontend nginx em `:8080`.

## WSL2 + Docker Desktop

- Bind mount do backend funciona com `:delegated` implícito no Windows
- Se porta `5432` estiver ocupada: `POSTGRES_PORT=5433` em `.env.docker`
- CORS já inclui `5173` e `127.0.0.1`

## CI/CD

Workflow: `.github/workflows/ci.yml` — build Vite, compile backend, smoke `docker-compose.prod.yml`.
