---
name: shadcn-ui-patterns
description: >-
  Radix/shadcn-style composition patterns (variants, slots, CVA-like APIs)
  adapted for styled-components — not installing shadcn. Use for buttons,
  cards, dialogs, badges, and compound components.
paths: interfaces/web/src/components/**/*
---

# shadcn/ui Patterns (styled-components port)

This project does **not** use shadcn/Radix packages. Apply **patterns** via theme + primitives.

## Variant API pattern

```ts
// Button.types.ts
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Button.style.ts — map variants to theme, not hex
const variantStyles = {
  primary: css`background: ${({ theme }) => theme.colors.gradientButtonPrimary};`,
  ghost: css`background: transparent; border: 1px solid ${({ theme }) => theme.colors.border};`,
};
```

## Composition (Slot-like)

- **Card** = surface mixins + optional `as` polymorphism via styled `div` + forwarded ARIA (`Card.tsx`)
- **Showcase** = selectable card with `role="button"` + keyboard (`ProjectShowcaseCard.tsx`) — canonical interactive card

## Dialog / drawer

Mirror `showcase/Drawer` + Skills modal: overlay `theme.colors.overlay`, panel `elevation.xl`, focus trap, `Escape` close.

## Do not

- Copy Tailwind class strings into styled-components
- Add `@radix-ui/*` without explicit user request
- Create parallel `StyledCard` per page when `Card` or `interactiveLift` exists

## Prefer existing primitives

`Button`, `Card`, `operationalGlass`, `FilterBar`, `Drawer` — extend before new primitives.
