# Contributing

Obrigado por contribuir com o portfólio. Leia este guia antes de abrir PRs.

## Setup

1. Clone o repositório e use as branches `develop` (integração) ou `feature/*` (trabalho)
2. Backend: `backend/` — Python 3.11+, venv, `uvicorn app.main:socket_app --reload`
3. Frontend: `interfaces/web/` — `yarn install` e `yarn start` (http://localhost:3000)
4. Docker (opcional): [docs/DOCKER.md](./docs/DOCKER.md) — `docker compose --env-file .env.docker up --build`

Detalhes em [README.md](./README.md) e [docs/GIT_WORKFLOW.md](./docs/GIT_WORKFLOW.md).

## Padrões de código (frontend)

- TypeScript estrito, enums em `src/types/`
- Styled Components em `*.style.ts` — sem estilos inline em JSX
- Arrow functions; `initialState` tipado em componentes com estado
- Imports em seções: Core → Libraries → Types → Theme → Components
- **Yarn** apenas (não npm/npx no dia a dia; MCP pode usar `npx -y` internamente)

## Antes do PR

```bash
cd interfaces/web
yarn build
yarn test --watchAll=false
```

Corrija erros de lint/TypeScript nos arquivos alterados.

## Agentes de IA (Cursor)

- MCP: [.cursor/README.md](./.cursor/README.md)
- Regras: `.cursor/rules/`
- Inspeção de UI: dev server + Playwright MCP (não substitui revisão humana)

## Commits

- Mensagens em inglês ou português, imperativo: `feat:`, `fix:`, `chore:`, `docs:`
- Um assunto por commit quando possível
