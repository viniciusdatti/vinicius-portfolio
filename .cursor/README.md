# Cursor MCP — Vinicius Portfolio (full-stack)

Setup para o agente atuar como **engenheiro full-stack + QA em runtime** no monorepo.

## Servidores (`.cursor/mcp.json`)

| Server | Função |
|--------|--------|
| **filesystem** | Monorepo: `backend/`, `interfaces/web/`, `docs/` |
| **shell** | Cwd padrão: **raiz do repo** — `yarn dev:api`, `yarn dev:web`, build, testes |
| **playwright** | UI em **http://localhost:3000**; rede API **http://localhost:8000** |

Playwright: `.cursor/playwright-mcp.config.json`  
Saída: `.cursor/playwright-output/` (gitignored)

### Chrome DevTools MCP (opcional)

Não habilitado por padrão (conflito de perfil Chromium com Playwright). Ver comentário em `mcp.json` / Settings → MCP.

## Ativar no Cursor

1. **Settings → MCP** → habilitar `filesystem`, `shell`, `playwright`
2. **Reload MCP servers**
3. `cd interfaces/web && yarn mcp:install-browsers` (primeira vez)
4. Subir stack:

```bash
# Na raiz do monorepo
yarn dev:api    # http://127.0.0.1:8000 — FastAPI + Socket.IO
yarn dev:web    # http://localhost:3000 — CRA
```

5. Smoke audit (shell):

```bash
yarn qa:audit
```

## Shell MCP (Windows)

- `@mako10k/mcp-shell-server`
- `MCP_SHELL_DEFAULT_WORKDIR` = raiz do monorepo
- `MCP_SHELL_SECURITY_MODE=strict`
- Hook `.cursor/hooks/safe-shell.js` bloqueia comandos destrutivos

## Playwright MCP — inspeção ao vivo

Rotas públicas: `/`, `/about`, `/skills`, `/projects`, `/live-lab`, `/contact`

Viewports: `375×812`, `768×1024`, `1280×720`

Ferramentas: `browser_navigate`, `browser_snapshot`, `browser_resize`, `browser_console_messages`, `browser_take_screenshot`

`codegen: none` — não gerar arquivos de teste automaticamente.

## Regras do agente

- `.cursor/rules/fullstack-mcp.mdc` — workflow geral
- `.cursor/rules/frontend-mcp.mdc` — convenções `interfaces/web/**`

## Git

`master` (prod) · `develop` (integração) · `feature/*` — [docs/GIT_WORKFLOW.md](../docs/GIT_WORKFLOW.md)
