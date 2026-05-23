---
name: advanced-component-architecture
description: >-
  Advanced React composition — compound components, feature folders, workspace
  shells, providers, and eliminating duplicate UI. Use for architecture refactors
  or component system design in interfaces/web.
paths: interfaces/web/src/**/*
---

# Advanced Component Architecture

Extends `.cursor/rules/component-architecture.mdc` and `.cursor/skills/component-patterns`.

## Feature boundaries

```
components/
  layout/     — chrome (Header, Footer, Layout)
  workspace/  — Live Lab shell (TelemetryProvider scope)
  home/       — marketing sections
  showcase/   — Projects filters/drawer
  primitives/ — cross-cutting (SpotlightSurface)
```

## Workspace shell contract

`WorkspaceShell` composes: `LiveLabAtmosphere` → `LiveLabShowcaseHeader` → `BootHandshake` → `TelemetryMonitor`.

**Do not** add siblings without updating shell z-index stack (`WorkspaceShell.style.ts`).

Dead code policy: remove unused shells/components; do not leave orphaned routes, stores, or i18n keys.

## Consolidation targets

| Duplicate | Canonical |
|-----------|-----------|
| Per-page `PageContainer` | `styles/pageLayout.style.ts` |
| StatCard / SkillCard hover | `surfaces.interactiveLift` + `Card` |
| Event log UI | shared `EventLogLine` primitive |
| Status dot + label | `StatusCluster` primitive |

## Compound pattern example

```tsx
// TelemetryMonitor exports subcomponents internally; public API stays one import
export const TelemetryMonitor = () => (
  <MonitorRoot>
    <MonitorHeader />
    <SensorGrid />
    <EventLog />
  </MonitorRoot>
);
```

## Anti-patterns

- God page files > 400 lines TSX without section components
- Cross-importing `pages/` from `components/`
- Prop drilling telemetry — use `useTelemetry` / store
- Third parallel card implementation (living + glass + pointer + custom shadow)

See `skills/frontend-architecture/SKILL.md` for full system map.
