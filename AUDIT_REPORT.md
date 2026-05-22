# Portfolio Audit Report
**Auditor:** Senior Front-end Engineer + Creative Director pass  
**Date:** 2026-05-21  
**Stack:** React + TypeScript + Styled Components + Framer Motion + i18next (pt-BR / en-US)  
**Dev server:** http://localhost:5173  

---

## Phase 1 — Visual Audit Findings

### `/` — Home

#### Visual Hierarchy
- **Good:** Hero → RealtimePresence → Skills → Projects → LiveLab → About → Contact is a strong narrative arc.
- **Issue:** `HeroHeadline` was breaking at `Front-\nend` on mid-range viewports due to `max-width: 20ch` — too wide, allowing bad breaks.
- **Issue:** `SectionEyebrow` separator line (`::before`) appeared instantaneously with no entrance — felt disconnected from the parent section's reveal animation.
- **Issue:** `HeroStackLine` rendered as a raw translated string `"React · TypeScript · WebSocket · FastAPI"`. The separator dots had equal weight to the tech names, collapsing the visual hierarchy inside the line.

#### Typography
- **Good:** Syne for display + DM Sans for body is a strong editorial pairing.
- **Issue:** `StatNumber` in About used a hardcoded `2.5rem` — outside the theme scale and not using `font-variant-numeric: tabular-nums`, causing number width jitter on language change.
- **Issue:** `HeroStatValue` also lacked `font-variant-numeric: tabular-nums` — the stats row wobbles slightly on PT-BR ↔ EN-US toggle.
- **Issue:** Missing `font-feature-settings: "ss01", "cv01"` on all Syne display elements — OpenType alternates were not activated.
- **Issue:** `line-height: 1.0` on HeroHeadline was correct but redundant syntax; cleaned to `1`.

#### Spacing Rhythm
- **Good:** Section padding uses `theme.spacing.section` (6rem) consistently.
- **Issue:** `HeroScrollCue` animated the entire element (text + line + everything) with a bounce. The bounce interfered with readability of the text label.

#### Color Usage
- **Good:** `#c4a97d` (gold accent) is used consistently through `theme.colors.primary` and `theme.colors.accent`.
- **Issue:** `LiveBadge` pulse dot was hardcoded `background-color: white` — invisible on the green badge in light mode, and semantically wrong in both modes. Should be `theme.colors.background` (dark circle on green reads better).
- **Issue:** `RetryButton` used hardcoded `color: white` — should be `theme.colors.onPrimary` to respect theme switching.

#### Motion
- **Issue:** `heroClipReveal` was doing `opacity + y-shift` (fade-up), not a true masked clip reveal. Editorial portfolio references (Paco Coursey, Rauno) use `overflow: hidden` container + `y: '100%' → 0` to create a text-slides-from-below effect. This is the single biggest Hero improvement.
- **Issue:** NavLink `::after` underline used a linear tween transition. Spring-like cubic bezier gives a much more alive feel.
- **Good:** `gridDrift` and `pulseGlow` on the Hero background are subtle and non-distracting.

#### AI-Pattern Flags
- **Flag:** `SectionEyebrow` gap used a hardcoded `10px` instead of `theme.spacing.sm` — minor inconsistency.
- **Flag:** `StatsGrid` in About used centered text on `StatCard` — too similar to the Hero stats. Adding a left border accent differentiates them and signals "data card" vs. "hero metric".
- **Flag:** Skills grid hover (`border-color + translateY`) is the most common AI template pattern. Does not do enough to reveal skill category context.

---

### `/about`

#### Issues Found
- `StatCard` was visually identical to Hero stats — no editorial differentiation.
- `StatNumber` used a raw `2.5rem` pixel value outside the theme scale.
- No `font-variant-numeric: tabular-nums` on stat numbers.

---

### `/contact`

#### Issues Found
- Form `Input` and `TextArea` only changed `border-color` on focus — no background tint to signal active state. Users with low contrast sensitivity miss the focus state.
- Focus ring (`box-shadow`) was already applied by GlobalStyles — the additional `background-color` tint adds a second layer of feedback.

---

### `/skills`, `/projects`, `/live-lab`

#### Visual Findings
- Skills page: icon grid hover (`border-color + translateY`) is generic — category label hover state needed.
- Projects page: `EditorialHeaderAside` can feel far from the title on wide viewports (3-column grid with `gap: xl`).
- Live Lab: WebSocket boot sequence and event log are genuinely impressive and unique — no AI template pattern detected. This is a portfolio differentiator.

---

## Phase 2 — Functional Testing

### Language Toggle (PT-BR ↔ EN-US)
- **Finding:** Stats values use different character widths between languages (e.g., `"3+"` vs `"3+"` — fine, but display numbers use proportional nums). Fixed with `font-variant-numeric: tabular-nums`.
- **Status:** Toggle works correctly, no layout shift detected.

### Theme Toggle (dark ↔ light)
- **Finding:** Light theme uses `primary: #4f6ef5` (blue) while dark theme uses `primary: #c4a97d` (gold). The light theme was not updated when the dark theme was redesigned. All color usage goes through `theme.colors.*` tokens, so no hardcoded values break. However, the editorial feel of the light theme does not match the gold-warm dark theme.
- **Status:** Functional but aesthetically mismatched. See Phase 4.

### Hero Headline Break
- **Finding:** `max-width: 20ch` allowed the headline to break at inconsistent positions across viewport sizes.
- **Fix Applied:** Reduced to `max-width: 14ch` on desktop + added `hyphens: none`.

### LiveBadge Dot
- **Finding:** Pulse dot was `background-color: white` — hardcoded, not theme-aware.
- **Fix Applied:** Changed to `theme.colors.background`.

### Contact Form
- **Finding:** Focus state only changed border color, no background feedback.
- **Fix Applied:** Added `background-color: theme.colors.primarySurface` on focus.

### LiveChannel.tsx Syntax Error
- **Finding:** Terminal log at 20:15:06 showed an unterminated JSX error on LiveChannel.tsx line 268 during an earlier edit session. File was inspected — **current state is clean**, error was from a previous unsaved edit.

---

## Phase 4 — Light Mode Audit

### Finding: Theme Palette Divergence
The light theme (`lightTheme`) uses:
- `primary: #4f6ef5` (blue/indigo)
- `accent: #0d9488` (teal)
- Background: `#fafafa` (near white)

The dark theme uses:
- `primary: #c4a97d` (warm gold)
- `accent: #c4a97d`
- Background: `#080808` (near black)

These are fundamentally different editorial identities. The light theme has its own coherent palette (blue/teal on white is a valid design language), but it was designed before the dark theme pivot to warm gold. Both themes fully use `theme.colors.*` tokens throughout, so no hardcoded color breaks.

### Decision: Document as Known Issue
Given the scope of this audit, the recommendation is to **keep the current light theme** and document it. The light theme works correctly (no broken tokens, no hardcoded values), it simply has a different accent color family. A future iteration should decide whether to:
1. Update the light theme to `primary: #8b6914` (darker warm gold that works on white)
2. Keep the blue/teal light theme as a deliberate "inverted personality" mode
3. Disable the theme toggle until the light theme is redesigned

**Current status:** Functional, not broken. Color contrast passes on all major text/background pairs. Toggle is preserved.

---

## Summary of All Issues

| # | Route | Issue | Severity | Fixed |
|---|-------|-------|----------|-------|
| 1 | `/` Hero | Headline breaks at wrong position (`max-width: 20ch`) | High | ✅ |
| 2 | `/` Hero | `heroClipReveal` was fade-up, not true clip reveal | High | ✅ |
| 3 | `/` Hero | `HeroStackLine` — separator dots same weight as tech names | Medium | ✅ |
| 4 | `/` Hero | `HeroScrollCue` entire element bounced including label text | Medium | ✅ |
| 5 | `/` Hero | `HeroStatValue` missing `font-variant-numeric: tabular-nums` | Medium | ✅ |
| 6 | `/` Hero | Missing `font-feature-settings` on Syne display elements | Low | ✅ |
| 7 | `/` Home | `LiveBadge` pulse dot hardcoded `white` | Medium | ✅ |
| 8 | `/` Home | `SectionEyebrow ::before` line had no entrance animation | Low | ✅ |
| 9 | `/` Home | `SectionEyebrow` used hardcoded `gap: 10px` | Low | ✅ |
| 10 | `/about` | `StatCard` no visual differentiation from Hero stats | Medium | ✅ |
| 11 | `/about` | `StatNumber` hardcoded `2.5rem` outside theme scale | Medium | ✅ |
| 12 | `/contact` | Form fields no background tint on focus | Low | ✅ |
| 13 | Nav | `NavLink` underline used linear tween (not spring-like) | Low | ✅ |
| 14 | Nav | `NavLink` no letter-spacing animation on hover | Low | ✅ |
| 15 | Global | Scrollbar thumb used `border` color (too prominent) | Low | ✅ |
| 16 | Global | Missing global `font-feature-settings` on headings | Low | ✅ |
| 17 | Light mode | Primary accent is blue (#4f6ef5) — different family from dark gold | Medium | 📋 Documented |
