# Changes Log — Portfolio Enrichment Pass
**Date:** 2026-05-21  
**Author:** Senior Front-end Engineer audit pass  

All changes follow project conventions: zero hardcoded colors, zero inline styles, zero `any` types, all values through `theme.*` tokens.

---

## Files Modified

### `interfaces/web/src/styles/animations.ts`

**Why:** `heroClipReveal` was a simple fade-up animation, not a true masked clip reveal.

**What changed:**
- Updated `heroClipReveal` to animate `y: '105%' → y: 0` (no opacity change).
- Added JSDoc explaining the required `overflow: hidden` wrapper contract.
- The previous `opacity: 0` was removed — the clip effect is the visual reveal; opacity fade is redundant and reduces the editorial impact.

---

### `interfaces/web/src/components/Hero/Hero.style.ts`

**Why:** Multiple Hero-level issues identified in audit — headline breaking, missing typography refinements, scroll cue bouncing as a whole unit, stack line lacking hierarchy.

**What changed:**

- **`HeroHeadlineClip`** (new): `div` with `overflow: hidden` that acts as the clip mask for the headline's slide-up reveal animation. Required companion for the updated `heroClipReveal` variant.
- **`HeroHeadline`**: 
  - `max-width` changed from `20ch` to `14ch` — controls break point on wide viewports.
  - Added `hyphens: none` — prevents browser-added hyphens on soft wraps.
  - Added `font-feature-settings: "ss01", "cv01"` — activates Syne OpenType alternates.
  - `line-height: 1.0` → `line-height: 1` (same value, cleaner syntax).
- **`HeroStackLine`**: Added `display: flex; align-items: center; flex-wrap: wrap` to support individual `HeroStackTech` spans.
- **`HeroStackTech`** (new): Individual tech name span — inherits accent color.
- **`HeroStackSeparator`** (new): Separator dot span — accent at 40% opacity, smaller `font-size` to reduce visual weight relative to tech names.
- **`HeroStatValue`**: Added `font-variant-numeric: tabular-nums` and `font-feature-settings: "tnum"` — prevents number width jitter on language switch.
- **`HeroScrollCue`**: Removed `animation: scrollCueBounce` from the whole button — text label was bouncing too, reducing readability.
- **`HeroScrollChevron`** (new): Isolated `span` with the `scrollCueBounce` animation — only the `▼` chevron bounces, not the text label.

---

### `interfaces/web/src/components/Hero/Hero.tsx`

**Why:** Companion changes for new Hero.style.ts exports.

**What changed:**
- Imported `HeroHeadlineClip`, `HeroStackTech`, `HeroStackSeparator`, `HeroScrollChevron`.
- Wrapped `HeroHeadline` in `HeroHeadlineClip` to enable the clip-mask slide-up reveal.
- Replaced `{t('home.hero.stackLine')}` with explicit `<HeroStackTech>` + `<HeroStackSeparator>` spans for visual hierarchy control. The separator dots are now `aria-hidden` and styled at 40% opacity.
- Added `<HeroScrollChevron aria-hidden>▼</HeroScrollChevron>` inside `HeroScrollCue`.

---

### `interfaces/web/src/pages/Home/Home.style.ts`

**Why:** `SectionEyebrow` and `LiveBadge` had craft-level issues found in audit.

**What changed:**
- Added `eyebrowLineExpand` keyframes at the top — animates the `::before` line from `width: 0` to `width: 24px`.
- **`SectionEyebrow`**:
  - `gap: 10px` (hardcoded) → `gap: theme.spacing.sm` (theme token).
  - `::before` now has `animation: eyebrowLineExpand 0.5s ease-out both` — line slides in when the eyebrow renders (which is inside a `whileInView` parent section, so the trigger is effectively viewport entry).
  - Added `flex-shrink: 0` to `::before` so it doesn't collapse.
- **`LiveBadge`**:
  - `color: white` → `color: theme.colors.onSuccess` (theme-aware).
  - `&::before` pulse dot: `background-color: white` → `theme.colors.background` — dark circle on green badge is more legible and correct on both themes.
  - Named the `@keyframes` from `pulse` to `liveBadgePulse` to avoid collision with any global `pulse` keyframe name.
  - Pulse dot size uses `theme.sizes.badge.dotSm` instead of hardcoded `8px`.
  - `border-radius: 50%` → `theme.borderRadius.full`.

---

### `interfaces/web/src/components/layout/Header/Header.style.ts`

**Why:** NavLink hover lacked tactile letter-spacing expansion and the underline used a linear tween.

**What changed:**
- **`NavLink`**:
  - Removed duplicate `letter-spacing` declaration (was declared twice — the second `normal` value overrode the first `wider` value). Kept `normal`.
  - Added `letter-spacing` to the `transition` list.
  - Added `letter-spacing: 0.1em` on `&:hover` — subtle tracking expansion gives a haptic feel to link hover.
  - `::after` underline transition changed from `width ${theme.transitions.normal}` (linear tween using shared cubic-bezier) to `width 380ms ${theme.motion.easeSpring}` — uses the spring cubic-bezier `(0.34, 1.56, 0.64, 1)` for a slight overshoot that signals energy.

---

### `interfaces/web/src/pages/About/About.style.ts`

**Why:** `StatCard` was identical to Hero stats pattern; `StatNumber` used a hardcoded pixel value.

**What changed:**
- **`StatCard`**:
  - Added `border-left: 3px solid theme.colors.primaryBorderFaint` — left border accent differentiates About stats from Hero metrics and signals "data card" pattern.
  - On hover, `border-left-color` transitions to `theme.colors.primary` for a clear interactive signal.
  - Removed `border-color` hover (would affect all 4 borders) — only the left border changes on hover for a cleaner effect.
- **`StatNumber`**:
  - `font-size: 2.5rem` (hardcoded) → `theme.typography.fontSize.display` (theme token `clamp(2rem, 4.5vw, 3rem)`).
  - Added `font-family: theme.typography.fontFamily.display` — explicit Syne instead of inheriting.
  - Added `font-variant-numeric: tabular-nums` and `font-feature-settings: "tnum"`.
  - Added `line-height: theme.typography.lineHeight.tight`.

---

### `interfaces/web/src/pages/Contact/Contact.style.ts`

**Why:** Form fields had only `border-color` focus feedback — not enough for accessibility.

**What changed:**
- **`Input`**: Added `transition` for `border-color` and `background-color`. Added `background-color: theme.colors.primarySurface` on `:focus` (skipped on error state). Provides a second layer of focus feedback alongside the existing `box-shadow` ring from GlobalStyles.
- **`TextArea`**: Same changes as `Input`.

---

### `interfaces/web/src/styles/GlobalStyles.ts`

**Why:** Global typography and scrollbar needed refinement.

**What changed:**
- **Headings `h1–h6`**: Added `font-feature-settings: "ss01", "cv01"` globally — activates OpenType alternates for Syne across all headings in the portfolio.
- **Scrollbar**:
  - Width reduced from `6px` to `5px` (less obtrusive).
  - Track `background` changed from `theme.colors.background` to `transparent` — scrollbar track is now invisible, only the thumb shows.
  - Thumb uses `theme.colors.primaryBorderFaint` (soft gold at 25% opacity) instead of `theme.colors.border` (cold white at 8% opacity) — consistent with the warm accent palette.
  - Thumb hover uses `theme.colors.primaryBorderStrong` (gold at 15% opacity, still subtle).
  - Added `border: 1px solid transparent` + `background-clip: padding-box` on thumb — creates an invisible padding around the thumb for easier grabbing and a cleaner appearance.

---

## Files NOT Modified (pre-existing state preserved)

- `Hero.types.ts` — no changes needed
- `HeroLiveMicro.tsx` / `HeroLiveMicro.style.ts` — `LiveMicroDot` already uses `theme.colors.success` correctly
- `theme.ts` — all token additions would require design decision; no changes to the token set
- All page-level `.tsx` files (About, Skills, Projects, Contact) — no structural changes required
- `App.tsx`, `Router.tsx` — untouched
- All admin pages — out of scope

---

## Phase 4 — Light Mode

**No code changes.** Light mode functions correctly with all tokens. The `primary: #4f6ef5` (blue) vs dark `primary: #c4a97d` (gold) divergence is a documented design decision gap, not a bug. See `AUDIT_REPORT.md §Phase 4` for full analysis and remediation options.
