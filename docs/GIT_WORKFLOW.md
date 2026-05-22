# Git Workflow — Vinicius Portfolio

Este repositório segue um **Git Flow simplificado** para produção estável e integração contínua em `develop`.

## Branches

| Branch | Propósito | Deploy / ambiente |
|--------|-----------|-------------------|
| `master` | Produção — apenas código revisado e estável | Produção |
| `develop` | Integração contínua — merge de features | Staging / preview (opcional) |
| `feature/*` | Uma funcionalidade ou correção isolada | Local |

### Convenção de nomes

```text
feature/contact-form-validation
feature/admin-chat-typing-indicator
fix/mobile-menu-overflow
chore/update-dependencies
```

Use prefixos: `feature/`, `fix/`, `chore/`, `docs/`, `refactor/`.

## Fluxo diário

```mermaid
gitGraph
  commit id: "init"
  branch develop
  checkout develop
  commit id: "integração"
  branch feature/nova-tela
  checkout feature/nova-tela
  commit id: "WIP"
  commit id: "pronto"
  checkout develop
  merge feature/nova-tela
  checkout master
  merge develop tag: "release"
```

1. **Atualize `develop`:** `git checkout develop` → `git pull origin develop`
2. **Crie a feature:** `git checkout -b feature/nome-curto`
3. **Desenvolva** com commits pequenos e mensagens claras
4. **Abra PR** para `develop` (nunca direto em `master` para features)
5. **Após QA em `develop`**, abra PR `develop` → `master` para release

## Merge — boas práticas

### Feature → develop

- Rebase ou merge de `develop` na feature **antes** do PR se a branch estiver antiga
- Prefira **squash merge** no GitHub para histórico limpo em features pequenas
- Use **merge commit** quando a feature tiver commits semanticamente separados que valem preservar
- Exija: lint/typecheck (`interfaces/web`), revisão de código, descrição do PR com escopo e test plan

### Develop → master (release)

- Apenas quando `develop` estiver estável e testado
- Tag opcional: `v0.2.0` após merge
- **Nunca** force-push em `master` ou `develop`
- Hotfix crítico em produção: `hotfix/*` a partir de `master` → merge em `master` **e** `develop`

### O que evitar

- Commits diretos em `master` (exceto hotfix emergencial documentado)
- PRs grandes sem revisão incremental
- `git push --force` em branches compartilhadas

## Proteção recomendada (GitHub)

- `master`: require PR, 1 approval, status checks (build)
- `develop`: require PR, status checks
- Bloquear force push em `master` e `develop`

## Estrutura do monorepo

```text
vinicius-portfolio/
├── backend/           # FastAPI
├── interfaces/web/    # React 19 + Vite — frontend no host (dev)
├── docs/              # Especificações e workflow
└── .cursor/           # Regras do agente
```

Frontend: sempre `yarn` em `interfaces/web/` (ver regra do projeto).
