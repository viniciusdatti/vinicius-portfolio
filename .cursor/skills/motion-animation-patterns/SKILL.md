---
name: motion-animation-patterns
description: >-
  Framer Motion and CSS animation patterns for premium microinteractions,
  stagger, route transitions, and realtime dashboards. Use for motion, animation,
  framer-motion, or Live Lab telemetry UI.
paths: interfaces/web/src/**/*
---

# Motion & Animation Patterns

## Single sources

| File | Use |
|------|-----|
| `styles/motionPresets.ts` | durations, easings, distances, staggers |
| `styles/animations.ts` | Framer `Variants` exports |
| `styles/surfaces.ts` | CSS hover lift (`interactiveLift`) |

## Easing (do not duplicate)

- Out: `[0.22, 1, 0.36, 1]` — UI enter/hover
- Spring: `[0.34, 1.56, 0.64, 1]` — tap / showcase select
- Page duration: `motionPresets.duration.page` (0.42s)

## Layer rules

| Layer | Motion |
|-------|--------|
| Route | `pageEnter` / `workspaceEnter` — gate with `usePrefersReducedMotion` |
| Section | `scrollReveal*` — intersection once |
| Hero | `hero*` staggers — memoized component |
| Live Lab | CSS `blink`, `valueFlash`, `sensorSweep` — keep subtle, loop only for live indicators |
| Hover | CSS `theme.transitions.normal` or `interactiveLift` |

## Realtime dashboard

- Value changes: short flash (≤ 400ms), not bounce
- Charts: Recharts animation off when `prefers-reduced-motion`
- Atmosphere: slow drift; disable under reduced motion (`LiveLabAtmosphere`)

## Anti-patterns

- `transform` + `filter: blur()` on full page for every navigation (motion sickness)
- Different hover easing per file (Card 0.45s vs theme 0.28s)
- `@keyframes shimmer` copy-pasted — extract shared skeleton mixin
- Animating `box-shadow` on 20+ grid cells simultaneously

## Correct vs incorrect

**Correct**:

```ts
import { motionPresets } from '@/styles/motionPresets';
transition={{ duration: motionPresets.duration.normal, ease: motionPresets.ease.out }}
```

**Incorrect**:

```ts
transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} // third duplicate
```

See `skills/realtime-dashboard-motion/SKILL.md` for Live Lab specifics.
