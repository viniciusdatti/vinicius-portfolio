---
name: accessibility-patterns
description: >-
  WCAG-focused accessibility for this portfolio — focus, aria-live, keyboard
  surfaces, reduced motion, and modal traps. Use for a11y, accessibility, or
  screen reader fixes.
paths: interfaces/web/**/*
---

# Accessibility Patterns

Extends `.cursor/skills/accessibility/SKILL.md` (flitzrrr) with **repo-specific** rules.

## Already good (preserve)

- Skip link + `#main-content` (`Layout`)
- Global `:focus-visible` (`GlobalStyles`)
- `aria-expanded` on header menu
- `role="status"` + `aria-live="polite"` on header/Live Lab status clusters
- `ProjectShowcaseCard` keyboard + `aria-label`

## Gaps to close

| Area | Fix |
|------|-----|
| Telemetry connection | `aria-live="polite"` on monitor status region |
| Sensor cards | `aria-label` combining name + status (not color alone) |
| Skills modal | focus trap, initial focus, restore focus on close |
| Framer routes | disable blur/scale when `prefers-reduced-motion` |
| Decorative layers | `aria-hidden` on atmosphere/grid (already on Hero) |

## Reduced motion

1. `GlobalStyles` CSS blanket — keeps
2. `usePrefersReducedMotion` in Hero, Spotlight, Observatory — extend to `Layout` page variants
3. Per-component `@media (prefers-reduced-motion)` for infinite loops

## Anti-patterns

- `▼` or color-only connection state
- `outline: none` without `:focus-visible` replacement
- `role="button"` without `onKeyDown` Enter/Space
- Auto-playing video/audio in showcase

## Correct vs incorrect

**Correct**:

```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {connectionLabel}
</div>
```

**Incorrect**:

```tsx
<span style={{ color: connected ? 'green' : 'red' }} />
```
