---
name: react-best-practices
description: >-
  React 19 + TypeScript patterns for this portfolio — providers, lazy routes,
  memoization, hooks, and styled-components colocation. Use when refactoring
  components, state, or architecture in interfaces/web.
paths: interfaces/web/src/**/*
---

# React Best Practices (Vinicius Portfolio)

## Provider tree (do not flatten)

`QueryClientProvider` → `ThemeProvider` + `GlobalStyles` → `RouterProvider` → `Layout`.

Scoped: `TelemetryProvider` only on `/live-lab` (`LiveLab.tsx`).

## Component folders

Follow `.cursor/rules/component-architecture.mdc`: `Component/`, `index.ts` re-exports, `*.style.ts` separate.

## Performance

- Lazy pages in `Router.tsx` + `Suspense`
- `React.memo` on Hero when i18n re-renders (`Hero.tsx`)
- `useLocationKey` for route animation reset (`Layout.tsx`)

## State

| Concern | Tool |
|---------|------|
| Server data | TanStack Query hooks in `api/` |
| Theme, telemetry, workspace | Zustand stores |
| Ephemeral UI | `useState` in component |

## Anti-patterns

- Default exports in components
- Inline styles in JSX
- `function` keyword (project uses arrows)
- Mounting unused workspace shells (`ModuleRail`, `ContextPanel`) without product need
- Duplicating socket logic outside `useTelemetry`

## Correct vs incorrect

**Correct**:

```ts
import { TelemetryMonitor } from '@/components/workspace/TelemetryMonitor';
```

**Incorrect**:

```ts
import { TelemetryMonitor } from '@/components/workspace/TelemetryMonitor/TelemetryMonitor';
```

**Correct** — gate motion:

```ts
const reduced = usePrefersReducedMotion();
const variants = reduced ? fadeOnly : pageEnter;
```

**Incorrect** — blur/scale page transition always on.
