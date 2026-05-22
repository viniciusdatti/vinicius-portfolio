---
name: web-design-guidelines
description: >-
  Web design quality checklist — hierarchy, spacing, contrast, responsive
  behavior, and audit workflow. Use for design reviews, UX audits, or
  web-design-guidelines requests.
paths: interfaces/web/**/*
---

# Web Design Guidelines

## Audit order

1. **Hierarchy** — one H1 per route; eyebrow → title → lead → body
2. **Spacing** — `theme.spacing.section*` between sections; no arbitrary `2.3rem`
3. **Contrast** — text on glass ≥ WCAG AA; status colors not sole indicator
4. **Touch** — min 44px targets (`theme.sizes.button.minHeight`)
5. **Motion** — purposeful; respect reduced motion globally + Framer gates
6. **Depth** — single elevation API per surface; no triple shadow stacks

## Deep review

Run `.cursor/skills/webdesign-review/SKILL.md` for full orchestration.

## Project-specific failures (fix these first)

| Issue | Location |
|-------|----------|
| Duplicate `PageContainer` / `PageTitle` | About, Skills, Projects, Contact vs unused `pageLayout.style.ts` |
| Title gradient inconsistent | About solid vs Projects gradient |
| Hardcoded rgba shadows | `Skills.style.ts` certificate hover |
| Grain z-index 9998 | `GlobalStyles.ts` — flattens perceived elevation |
| Framer page blur without reduced-motion gate | `Layout.tsx` + `animations.ts` `pageEnter` |

## Correct vs incorrect

**Correct** — page shell from shared layout:

```ts
import { PageContainer, PageTitle, PageSubtitle } from '@/styles/pageLayout.style';
```

**Incorrect** — copy-paste `PageTitle` with different gradient rules per page.

**Correct** — theme shadow:

```ts
box-shadow: ${({ theme }) => theme.elevation.md};
```

**Incorrect** — `box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);` on themed surfaces.
