---
name: premium-card-system
description: >-
  Sistema de cards premium — archetypes, hover, spotlight, elevation. Unifica
  Card, ProjectShowcaseCard, StatCard. Linear/Raycast selecionável + Retool
  operational. Use ao criar/refatorar cards em interfaces/web.
paths: interfaces/web/src/components/**/*
---

# Premium Card System

**Problema atual:** três implementações paralelas (`Card/`, `SpotlightSurface/`, hovers copy-paste em About/Contact/Skills/Home) com `livingSurface`+`glassSurface` conflitantes e hover `-6px` vs token `liftMd` 3px.

**Meta:** um contrato de **archetype** por contexto — cinematic nos showcases, utilitário no operational.

---

## Identidade visual

Cards são **instrumentos de leitura**, não caixas de marketing:

| Archetype | Metáfora | Referência |
|-----------|---------|------------|
| `marketing-glass` | Artefato em vitrine | Linear featured issue |
| `marketing-elevated` | Objeto com massa | Raycast extension tile |
| `showcase-selectable` | Linha da timeline selecionável | Linear project row |
| `stat-signal` | KPI tile | Datadog metric widget |
| `operational` | Panel cell | Retool component |

Superfície nunca 100% flat — sempre `border` 1px + `elevation` OU `operationalGlass`.

---

## Direção artística

- **Linear:** hover = border brighten + sombra + 2–3px lift, não scale card inteiro.
- **Raycast:** densidade interna alta, título semibold, meta mono abaixo.
- **Retool:** `operationalGlass`, menos motion, inset rim.
- **Evitar:** Material elevated FAB shadow, Bootstrap `card shadow-sm`, SaaS `border-radius: 8px` + white bg.

**Cinematic:** `pointerSpotlight` segue o mouse como luz de set — só em archetypes marketing com área > 200px².

---

## Princípios de motion

| Archetype | Enter | Hover | Tap/select |
|-----------|-------|-------|------------|
| marketing-glass | stagger `showcaseDelay` | lift + spot opacity 0→1 | — |
| showcase-selectable | `showcase` variants | border primary faint | Framer `whileTap` scale 0.98 spring |
| stat-signal | `scrollReveal` child | `interactiveLift` | — |
| operational | fade | border only | — |

- Duração hover: `theme.transitions.normal` (**280ms**) — alinhar `Card.style.ts` que usa 450ms hoje.
- Transform: `translateY(-${theme.motion.distance.liftMd})` → **3px**, não 6px.
- Não animar `width`/`height` do card.

---

## Regras de composição

### Anatomia padrão (marketing)

```
┌─ border + radius xl ─────────────────┐
│ [::before rim z-0]                   │
│  Eyebrow mono (optional)             │
│  Title (semibold)                    │
│  Meta mono muted                     │
│  Body / metric                       │
│  [CTA zone]                          │
│ [::after spotlight z-1]              │
└──────────────────────────────────────┘
```

### Anatomia operational (sensor/stat compact)

```
┌─ operationalGlass ───┐
│ LABEL xs mono        │
│ VALUE lg tabular     │
│ threshold bar        │
└──────────────────────┘
```

- Padding: `lg` marketing, `md` operational, `sm` dense grid.
- Radius: `borderRadius.xl` (16px) marketing; `lg` (12px) operational.
- Accent bar 3px left: **apenas** `stat-signal` e `experience` — `ProjectShowcaseCard` usa border selected, não barra.

---

## Regras de spacing

| Archetype | padding | gap interno |
|-----------|---------|-------------|
| marketing-glass | `spacing.lg` | `sm` entre title/meta |
| showcase-selectable | `spacing.lg` | preview image margin `md` bottom |
| stat-signal | `spacing.md`–`lg` | `xs` label→value |
| operational | `spacing.md` | `xs` |

Grid marketing: `repeat(auto-fill, minmax(280px, 1fr))` + **1 featured** `grid-column: span 2` em `desktop+` (quebrar homogeneidade Skills).

---

## Regras de tipografia

| Slot | Style |
|------|-------|
| Card title | `fontWeight.semibold`, `fontSize.lg`, `text` |
| Meta | `mono`, `xs`, `textMuted`, UPPERCASE optional |
| Metric | `display` ou `mono`, tabular, `text` |
| Description | `body`, `sm`–`md`, `textSecondary`, max 3 lines `line-clamp` |

`ProjectShowcaseCard`: título + stack tags mono — Raycast list item.

---

## Regras de iluminação

| Mixin | Archetype |
|-------|-----------|
| `glassSurface` alone | marketing-glass (frosted) |
| `livingSurface` alone | marketing-elevated (solid + rim) |
| **Never both** | Card.style.ts bug |
| `featuredSpotlight` | featured project / hero card |
| `pointerSpotlight` | marketing-glass, showcase hover |
| `operationalGlass` | Live Lab, Home `operationalGlass` sections |

`--spot-opacity`: 0 default, 1 hover — transition opacity 350ms, **não** mover `--spot-x` via JS every frame (usar `usePointerPosition` throttled 32ms max).

---

## Regras de profundidade

| Estado | elevation |
|--------|-----------|
| repouso | `sm` ou `md` |
| hover | `lg` |
| selected showcase | `lg` + `primaryBorderFaint` |
| featured | + `featuredSpotlight` (sem extra glow shadow) |

Sombras em **root** do card apenas — filhos `box-shadow: none`.

---

## Regras de interação

```ts
// Export alvo em surfaces.ts — usar em todo card interativo
export const cardInteractive = css`
  ${interactiveLift};
  ${pointerSpotlight};
  @media (hover: hover) {
    &:hover { --spot-opacity: 1; }
  }
`;
```

- `@media (hover: hover)` obrigatório para spotlight/lift.
- Keyboard: showcase `onKeyDown` Enter/Space — `ProjectShowcaseCard.tsx` referência.
- Focus-visible: ring `focusRing` offset 2px outside border.
- Disabled: `opacity.disabled` 0.45, sem hover.

---

## Regras de acessibilidade

- `showcase-selectable`: `role="button"`, `tabIndex={0}`, `aria-label` descritivo (título + estado selected).
- Spotlight ::after: `pointer-events: none`, decorative.
- Contraste texto em `surfaceGlass`: verificar em light theme.
- Não depender de hover para revelar informação crítica.

---

## Padrões de performance

- Um listener `pointermove` por section — delegar CSS vars no container, não por card.
- `will-change: transform` só on hover em desktop — remover on leave.
- Skeleton: unificar `@keyframes shimmer` em `styles/skeleton.ts` (1 definição).
- Memo `ProjectShowcaseCard` se lista > 20 itens.

---

## Padrões de responsividade

- Featured span-2: `@media (min-width: desktop)` only.
- Hover lift desligado em touch — `@media (hover: none)` { transform: none; }
- Preview image heights: `sizes.project.previewHeight*` tokens — não height fixo 220 em todos.

---

## Anti-patterns

- Card morto sem hover em lista selecionável
- `translateY(-6px)` desalinhado do design system
- Três pseudos + box-shadow animado
- `SpotlightSurface` 3D tilt **e** pointer spotlight (escolher um)
- Certificado Skills hover `rgba(0,0,0,0.12)` hardcoded
- Grid 12 cards idênticos sem hierarquia featured
- Bootstrap card-body / card-title classes

---

## Migração (ordem)

1. Adicionar `cardInteractive` em `surfaces.ts`
2. Refatorar `ProjectShowcaseCard` → usar mixin
3. Substituir hovers About/Contact/Home
4. Fix `Card.style.ts` — pick glass OR living; wire ou delete
5. Alinhar duração 280ms

---

## Exemplos

Ver [examples.md](examples.md).

## Referência viva

`ProjectShowcaseCard.tsx`, `ProjectShowcase.style.ts`, `Card.tsx`, `Card.style.ts`, `About.style.ts` StatCard (refactor target)
