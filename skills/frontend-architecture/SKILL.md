---
name: frontend-architecture
description: >-
  Arquitetura frontend do monorepo — providers, rotas, design system, realtime,
  roadmap de consolidação. Mapa para refactors sem quebrar identidade premium.
  Use antes de features grandes em interfaces/web.
paths: interfaces/web/**/*
---

# Frontend Architecture

Mapa operacional do `interfaces/web` — como **engenharia avançada** sustenta a **UI cinematográfica**.

---

## Identidade visual (arquitetural)

A arquitetura separa **regimes de UI**:

| Regime | Rotas | Shell | Motion root |
|--------|-------|-------|-------------|
| Editorial | `/`, `/about`, `/skills`, `/projects`, `/contact` | `Layout` + Header + Footer | `pageEnter` |
| Workspace | `/live-lab` | `Layout` workspace mode, no footer | `workspaceEnter` |

---

## Direção artística (estrutura → percepção)

| Referência | Estrutura equivalente |
|------------|---------------------|
| **Linear** | App shell fino, conteúdo centralizado, lazy routes |
| **Raycast** | Header command-bar feel, status pills |
| **Datadog** | `TelemetryProvider` + monitor subtree isolado |
| **Sentry** | Event log component boundary |
| **Retool** | `showcase/FilterBar`, `Drawer`, forms Contact |
| **Warp** | Global grid + mono telemetry branch |

**Regra:** marketing components **não importam** `telemetryStore`. Workspace **não importa** `pages/`.

---

## Princípios de motion (arquitetura)

| Camada | Arquivo | Consumidores |
|--------|---------|--------------|
| Tokens | `motionPresets.ts` | `animations.ts`, inline Hero |
| Variants | `animations.ts` | Layout, pages, sections |
| CSS loops | `*.style.ts` keyframes | Telemetry, Hero, atmosphere |
| Hooks | `usePrefersReducedMotion`, `useLocationKey` | Layout, Hero |

**Contrato:** nova animação → preset primeiro; variant segundo; keyframe local só se loop infinito documentado.

---

## Regras de composição (pastas)

```
interfaces/web/src/
├── api/              # REST clients — sem styled
├── components/
│   ├── layout/       # Layout, Header, Footer, SystemBar
│   ├── workspace/    # Live Lab only (WorkspaceShell, TelemetryMonitor)
│   ├── home/         # Home sections
│   ├── Hero/         # Hero + ambient
│   ├── showcase/     # Projects UI
│   ├── ProjectShowcase/
│   ├── primitives/
│   ├── common/       # shared small UI
│   └── atmosphere/   # PageAmbientField, LiveLabStreamField
├── pages/            # route composers — thin TSX
├── styles/           # theme, surfaces, animations, pageLayout
├── hooks/
├── store/            # themeStore, telemetryStore, toastStore
└── types/
```

**Page TSX:** composição + hooks de dados; estilos em `*.style.ts` ou imports de `pageLayout` / feature styles.

**Max 250 linhas** TSX por página — extrair section components se maior.

---

## Provider tree (canônico)

```
StrictMode
  ErrorBoundary
    QueryClientProvider
      ThemeProvider (themeStore)
        GlobalStyles
        ToastHost
        RouterProvider
          Layout
            Header
            Main (AnimatePresence + Outlet)
            Footer (hidden live-lab)
```

`/live-lab`:

```
LiveLab → TelemetryProvider → WorkspaceShell
```

---

## Regras de interação (data → UI)

```
Socket (backend :8000, namespace /telemetry)
  → useTelemetry
    → telemetryStore
      → TelemetryProvider (context)
        → TelemetryMonitor
```

- Single source of truth para connection state
- TanStack Query: staleTime 5m (`App.tsx`) — skills/projects lists

---

## Padrões de performance

| Área | Padrão |
|------|--------|
| Routes | `lazy()` + `Suspense` Spinner |
| Hero | `memo` |
| Charts | dynamic import Recharts in monitor only |
| Socket | throttle telemetry UI updates |

Build gate: `yarn build` + `yarn test` em `interfaces/web`.

---

## Roadmap de consolidação (prioridade)

### P0 — identidade

1. `pageLayout.style.ts` em About, Skills, Projects, Contact
2. `pageEnter` + `scrollReveal` gated (`usePrefersReducedMotion`)
3. `elevation` only — remover rgba ad-hoc

### P1 — sistema de cards

4. `cardInteractive` + archetypes (`premium-card-system`)
5. Wire `Card` ou delete; delete `SpotlightSurface` duplicate

### P2 — Live Lab

6. `aria-live` TelemetryMonitor
7. Extract `StatusCluster`, `EventLogLine` shared

---

## Anti-patterns (arquitetura)

- API fetch em styled component file
- Circular imports feature ↔ page
- Default exports
- Inline `style={{}}`
- TelemetryProvider wrapping entire app
- Código morto (rotas, stores, i18n) não removido após feature delete

---

## Cross-skill index

| Mudança | Skill |
|---------|-------|
| Cor, glow, grain | `portfolio-visual-language` |
| Cards | `premium-card-system` |
| Páginas | `editorial-layout-system` |
| Live Lab | `realtime-dashboard-motion` |

---

## Entrypoints

`index.tsx`, `App.tsx`, `Router.tsx`, `Layout.tsx`, `LiveLab.tsx`, `WorkspaceShell.tsx`, `TelemetryProvider.tsx`
