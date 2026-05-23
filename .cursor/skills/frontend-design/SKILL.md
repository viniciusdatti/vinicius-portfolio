---
name: frontend-design
description: >-
  Premium UI/UX, editorial layout, visual hierarchy, and composition for
  interfaces/web. Use for redesigns, hero sections, cards, dashboards, motion
  direction, or when the user mentions frontend design, UI polish, or visual
  language.
paths: interfaces/web/**/*
---

# Frontend Design (portfolio)

Orchestrates project skills and external references. **Read first** when changing visuals:

| Priority | Skill / doc |
|----------|-------------|
| 1 | `skills/portfolio-visual-language/SKILL.md` |
| 2 | `skills/premium-card-system/SKILL.md` |
| 3 | `skills/editorial-layout-system/SKILL.md` |
| 4 | `.cursor/skills/ui-design/SKILL.md` |
| 5 | `.cursor/skills/visual-direction/SKILL.md` |
| 6 | `.cursor/skills/web-design-engineer/SKILL.md` |

## Stack constraints

- **styled-components** + theme tokens (`interfaces/web/src/styles/theme/`)
- **Framer Motion** via `motionPresets.ts` + `animations.ts`
- No inline `style={{}}` — `.cursor/rules/no-inline-styles.mdc`
- No shadcn install required — apply **composition patterns** from `shadcn-ui-patterns` skill

## Premium bar for this repo

Industrial observability aesthetic: control-room glass, amber signal (`primary`), mono telemetry, restrained depth (rim + inset, not glow stacks).

## Workflow

1. Map surface type: editorial page / marketing card / operational panel / realtime chart
2. Pick token path: `elevation.*` for cards; `operationalGlass` for Live Lab
3. Motion: import presets — never invent cubic-bezier per file
4. Validate: 375 / 768 / 1280, dark + light, `prefers-reduced-motion`
