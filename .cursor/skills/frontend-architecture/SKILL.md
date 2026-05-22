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
| Admin | `/admin/*` | `AdminLayout` | fade simple |

Código morto quebra a narrativa (usuário espera `ModuleRail` no Live Lab — hoje ausente). **Wire or delete.**

---

## Direção artística (estrutura → percepção)

| Referência | Estrutura equivalente |
|------------|---------------------|
| **Linear** | App shell fino, conteúdo centralizado, lazy routes |
| **Raycast** | Header command-bar feel, status pills |
| **Datadog** | `TelemetryProvider` + monitor subtree isolado |
| **Sentry** | Event log component boundary (extrair shared) |
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

**Bug estrutural:** `pageEnter` blur não gated — fix no `Layout.tsx` (não espalhar workaround por página).

---

## Regras de composição (pastas)

```
interfaces/web/src/
├── api/              # REST clients — sem styled
├── components/
│   ├── layout/       # Layout, Header, Footer, SystemBar
│   ├── workspace/    # Live Lab only
│   ├── home/         # Home sections
│   ├── Hero/         # Hero + ambient
│   ├── showcase/     # Projects UI
│   ├── ProjectShowcase/
│   ├── primitives/   # SpotlightSurface (unused → fix)
│   ├── common/       # shared small UI
│   └── admin/
├── pages/            # route composers — thin TSX
├── styles/           # theme, surfaces, animations, pageLayout
├── hooks/
├── store/            # zustand
└── types/
```

**Page TSX:** composição + hooks de dados; estilos em `*.style.ts` ou imports de `pageLayout` / feature styles.

**Max 250 linhas** TSX por página — extrair section components se maior.

---

## Regras de spacing (imports)

- Pages importam spacing via theme em styled — não magic numbers
- `Layout` main: padding-top `headerOffset` quando header fixed
- Workspace: full viewport height — `WorkspaceShell.style.ts` height chain com `min-height: 0` para flex scroll interno

---

## Regras de tipografia (sistema)

- Primitivo `Typography/` (**unused**) — migrar para `pageLayout` + section titles OU deletar
- i18n: `t()` keys — Hero memoized por causa de re-render de strings
- Admin: família pode divergir levemente mas **não** importar cores fora `theme` em rotas públicas

---

## Regras de iluminação (tokens)

| Arquivo | Responsabilidade |
|---------|------------------|
| `theme.ts` | colors, shadows, elevation per mode |
| `theme/effects.ts` | blur, backdrop, opacity scales |
| `surfaces.ts` | mixins composicionais |
| `GlobalStyles.ts` | body wash, grid, grain |

Nova cor → `darkTheme` + `lightTheme` + type `Theme` — nunca hex solto em feature.

---

## Regras de profundidade (z-index)

Usar apenas `theme.zIndex`:

```
base(0) → content(2) → dropdown(100) → sticky(200) → modal(300) → toast(400)
```

Exceção documentada: grain `#root::before` 9998 — **não copiar** esse padrão.

Header: `sticky + 1` — não criar `z-index: 999`.

---

## Regras de interação (data → UI)

```
Socket (backend :8000)
  → useTelemetry
    → telemetryStore
      → TelemetryProvider (context)
        → TelemetryMonitor
```

- Single source of truth para connection state
- `HeaderStatusPills` lê store ou prop — não terceiro polling
- TanStack Query: staleTime 5m (`App.tsx`) — skills/projects lists

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

## Regras de acessibilidade (arquitetura)

- `Layout`: skip link → `#main-content` `tabIndex={-1}`
- Route change: focus management optional — announce title?
- Admin: separate a11y audit — não bloquear público
- ESLint `jsx-a11y` — manter zero warnings em PR

---

## Padrões de performance

| Área | Padrão |
|------|--------|
| Routes | `lazy()` + `Suspense` Spinner |
| Hero | `memo` |
| Lists | virtualize se > 50 items (future) |
| Charts | dynamic import Recharts in monitor only |
| Images | lazy + WebP where pipeline exists |
| Socket | debounce/throttle flashes |
| Bundle | não importar `framer-motion` em admin se unused |

Build gate: `yarn build` + `yarn test` em `interfaces/web`.

---

## Padrões de responsividade

- Test matrix MCP: 375, 768, 1280 — `.cursor/rules/frontend-mcp.mdc`
- `Layout` workspace: `Header` `$isWorkspace` grid 3 col
- Mobile menu: `menu-scroll-locked` body class

---

## Roadmap de consolidação (prioridade)

### P0 — identidade quebrada

1. `pageLayout.style.ts` em About, Skills, Projects, Contact
2. `pageEnter` + `scrollReveal` gated (`usePrefersReducedMotion`)
3. `elevation` only — remover rgba Skills L430, chart triple shadow

### P1 — sistema de cards

4. `cardInteractive` + archetypes (`premium-card-system`)
5. Wire `Card` ou delete; delete `SpotlightSurface` duplicate

### P2 — workspace honesty

6. Wire `ModuleRail`/`ContextPanel` OR remove from repo
7. Extract `StatusCluster`, `EventLogLine` shared
8. `aria-live` TelemetryMonitor

### P3 — polish

9. Unified `shimmer` skeleton
10. Hero `heroDisplay` token alignment
11. `Typography` primitive decision

---

## Anti-patterns (arquitetura)

- API fetch em styled component file
- `pages/About` importando `pages/Skills` styled
- Circular imports feature ↔ page
- Default exports
- Inline `style={{}}`
- Duplicar `QueryClient` 
- TelemetryProvider wrapping entire app (perf + wrong context)
- Criar `theme.shadows` usage em cards when rule says `elevation`
- God file `Skills.style.ts` 600+ linhas sem section split

---

## Cross-skill index

| Mudança | Skill |
|---------|-------|
| Cor, glow, grain | `portfolio-visual-language` |
| Cards | `premium-card-system` |
| Páginas | `editorial-layout-system` |
| Live Lab | `realtime-dashboard-motion` |
| Agent agregadores | `.cursor/skills/frontend-design`, `motion-animation-patterns` |

---

## Exemplos

Ver [examples.md](examples.md).

## Entrypoints

`index.tsx`, `App.tsx`, `Router.tsx`, `Layout.tsx`, `LiveLab.tsx`, `WorkspaceShell.tsx`, `TelemetryProvider.tsx`
