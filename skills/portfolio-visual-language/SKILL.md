---
name: portfolio-visual-language
description: >-
  Identidade visual cinematográfica do portfólio Vinicius — observabilidade,
  realtime, dashboards industriais (Linear/Raycast/Warp/Datadog). Tokens em
  theme.ts, surfaces.ts. Use em qualquer alteração visual em interfaces/web.
paths: interfaces/web/**/*
---

# Portfolio Visual Language

Skill **raiz**. As outras skills (`premium-card-system`, `editorial-layout-system`, `realtime-dashboard-motion`, `frontend-architecture`) estendem este documento — não contradizer.

---

## Identidade visual

**O que o visitante deve sentir:** um engenheiro de frontend opera um produto real — painéis vivos, métricas, logs, latência — não uma landing de conversão genérica.

| Pilar | Manifestação no código |
|-------|------------------------|
| Observabilidade | Mono labels, `tabular-nums`, event logs, status dots, Recharts no Live Lab |
| Realtime | Amber = sinal vivo (`#F59E0B`); verde/âmbar/vermelho só para estado (`SensorStatus`) |
| Industrial premium | Grafite `#0B0D10` → `#161A22`, hairline `border` `#232836`, inset rim — não flat fill |
| Cinematic UI | `pageEnter` blur+scale, hero headline clip reveal, grain + dot grid atmosférico |
| Frontend engineering | Tokens tipados, `surfaces.ts`, zero inline style, arquitetura por feature folder |

**Paleta obrigatória (dark — default da marca):**

- Canvas: `background` `#0B0D10`, `backgroundSecondary` `#111318`
- Surface: `surface` `#161A22`, `surfaceElevated` `#1A1F28`, `surfaceGlass` `rgba(22,26,34,0.72)`
- Texto: `text` `#F1F5F9`, `textSecondary` `#A1A1AA`, `textMuted` `#9CA3AF`
- Sinal: `primary` / `accent` `#F59E0B` — **máx. ~12% da área visível** por viewport
- Semântica: `success` `#22C55E`, `error` `#EF4444`, `warning` = amber

**Fontes:** Inter (UI + display), JetBrains Mono (telemetria, eyebrows, logs). Não introduzir terceira família sem ADR.

---

## Direção artística (referências → decisões)

| Referência | Extrair | Aplicar neste repo | Não copiar |
|------------|---------|-------------------|------------|
| **Linear** | Transições curtas, blur sutil na entrada, tipografia negativa apertada, chrome mínimo | `pageEnter` (`animations.ts`), `HeaderShell` glass só após scroll, `letterSpacing.tight` em títulos | Layout roxo, sidebar fixa de app |
| **Raycast** | Barra flutuante, densidade alta, meta em mono, foco keyboard | `Header` pill + `HeaderStatusPills`, nav com underline gradient | Paleta neutra fria sem amber |
| **Warp** | Terminal confidence, fundo escuro, grid técnico | `body::after` dot grid 24px, `HeroColumnGuides` em `wide+` | UI 100% monospace |
| **Datadog** | Tiles de métrica, séries temporais, hierarquia alerta | `TelemetryMonitor` SensorCard, `TelemetryTrendChart`, thresholds | Saturação de cores por widget |
| **Sentry** | Timeline de eventos, severidade por cor de linha | `EventLog` pattern (info/warn/critical), `getEventLogLineColor` | Ilustrações de erro cartoon |
| **Retool** | Painéis utilitários, borda inset, densidade de formulário | `operationalGlass`, Contact/Projects drawers | Aspecto “builder” cinza claro |

**Metáfora única:** *control room cinematográfico* — câmera lenta no marketing (Home/Hero), corte seco no workspace (`workspaceEnter` sem slide no `/live-lab`).

---

## Princípios de motion

1. **Causalidade** — animação responde a evento (socket, scroll, hover), não decora idle.
2. **Uma família de easing** — `motionPresets.ease.out` `[0.22, 1, 0.36, 1]`; spring só em tap (`ease.spring`).
3. **Dois regimes** — *Editorial* (Home, About): stagger 40–48px, blur reveal; *Operational* (Live Lab): fade/opcidade, flash de valor, sem bounce.
4. **Loops contados** — máx. **2** animações infinitas visíveis (ex.: status dot + atmosphere); resto `animation: none` em reduced motion.
5. **Blur como lente, não névoa** — `pageEnter` max `blur(6px)` entrada; proibido `blur(20px+)` em containers de conteúdo.

Arquivos canônicos: `motionPresets.ts`, `animations.ts`, `GlobalStyles` L223–228.

---

## Regras de composição

- **Grid mental 12 col** — `layout.contentMax` 1200px / `contentWide` 1320px; conteúdo nunca full-bleed sem máscara (hero wash excepted).
- **Hierarquia de bloco (ordem fixa):** `SectionEyebrow` (mono + linha 24px) → título → `SectionLead` / `PageSubtitle` → conteúdo → CTA.
- **Assimetria permitida:** Home hero (coluna texto + atmosfera direita); **proibida** em formulários Contact e grids Skills homogêneos.
- **Barra de acento 3px** (`sizes.bar.accent`) — só StatCard / ExperienceCard / filosofia — não em cada card de projeto.
- **Índice de seção** (`fontSize.sectionIndex`) — Home apenas; opacidade decorativa 0.12–0.2, nunca competir com H2.
- **Densidade Datadog:** em painéis operacionais, preferir mais linhas de dados que cards vazios com padding excessivo (`spacing.xl` em grid de 12+ células).

---

## Regras de spacing

| Token | Valor | Uso |
|-------|-------|-----|
| `pageX` | `clamp(1.25rem, 4vw, 2.5rem)` | Padding horizontal de página |
| `pageY` | `clamp(2.5rem, 6vw, 4rem)` | Padding vertical de página |
| `section` | `6rem` | Entre grandes blocos marketing |
| `sectionSm` | `4rem` | Entre blocos em páginas internas |
| `sectionLg` | `8rem` | Hero footer breathing room |
| `xxl` | `3rem` | Gap de grid editorial |
| `workspaceGap` | `1px` | Separação shell Live Lab (hairline, não 16px) |

- Gap interno de card: `lg` (1.5rem) marketing; `md` (1rem) operational.
- **Nunca** `margin: 2.3rem` ou valores fora da escala — estender `shared.ts` se faltar token.
- Header offset de conteúdo: `sizes.layout.headerOffset` `5.25rem` — páginas devem respeitar `padding-top` no main quando fixo.

---

## Regras de tipografia

| Papel | family | size / weight | cor |
|-------|--------|---------------|-----|
| Page H1 | `display` | `fontSize.display` + **`gradientTextDisplay`** | clip gradient |
| Hero H1 | `display` | unificar para `heroDisplay` **ou** clamp único em `HeroHeadline` | `text` sólido (não gradient hero) |
| Section H2 | `display` | `clamp(2rem, 4.5vw, 3rem)` weight 700 | `text` |
| Eyebrow | `mono` | `xs`, `letterSpacing` 0.12–0.18em, UPPERCASE | `accent` |
| Body | `body` | `md`, weight 400, `lineHeight.relaxed` | `textSecondary` |
| Métrica | `mono` ou `display` | `lg`+, `font-feature-settings: "tnum"` | `text` / status |
| Log line | `mono` | `xs`–`sm` | `textMuted` → semantic |

- **Um H1 por rota** — verificar `Router` + página.
- `text-wrap: balance` em títulos de seção (`Home.style.ts` `SectionTitle`).
- Proibido `font-weight: 800` solto — usar `fontWeight.bold` (700) ou semibold.
- Proibido misturar `PageTitle` sólido (About) com gradient (Projects) — fonte: `pageLayout.style.ts`.

---

## Regras de iluminação

| Técnica | Token / mixin | Onde |
|---------|---------------|------|
| Rim light superior | `gradientSurfaceRim` + `livingSurface` / `operationalGlass::before` | Cards premium, painéis Live Lab |
| Wash featured | `featuredSpotlight` (::after 45% height) | Project featured, hero card |
| Pointer specular | `pointerSpotlight` + `--spot-opacity` | Marketing cards, **off** em grid >12 células |
| Hero bloom | `gradientHeroCenter`, orbs ≤ `primary` 10% alpha | `HeroAmbient` only |
| Chrome glow | `shadows.glow` | Avatar About, badge LIVE — **1 por seção** |
| Glass | `effects.backdrop.header` `blur(18px) saturate(150%)` | Header scrolled, workspace header |

**Teto de glow:** soma de camadas com `rgba(245,158,11,*)` ≤ 3 por componente raiz.

**Grain:** `#root::before` opacity `0.028`, z-index 9998 — não adicionar segundo noise layer.

---

## Regras de profundidade

| Nível | z-index / shadow | Elemento |
|-------|------------------|----------|
| Ambiente | 0 | `body::before/after`, atmosphere |
| Conteúdo | 1–2 (`zIndex.content`) | `#root`, sections |
| Chrome | `sticky + 1` | Header |
| Dropdown | 100 | menus |
| Modal | 300 | Skills cert modal |
| Toast | 400 | `ToastHost` |

**Sombras:**

- Cards/painéis: **`theme.elevation.*` apenas**
- Header scrolled / workspace: **`theme.shadows.md`** (hairline + drop)
- Proibido: `elevation.lg` + `shadows.glow` + `0 24px 48px rgba(...)` no mesmo nó (Hero portrait hoje — refatorar para um nível)

**Inset:** um `inset 0 1px 0 borderLight` por `operationalGlass` — Datadog/Retool panel style.

---

## Regras de interação

- Hover card: `translateY(-liftMd)` 3px + `elevation.lg` + `borderLight` — via `interactiveLift` (`surfaces.ts`).
- Focus: `focusRing` `rgba(245,158,11,0.45)` — nunca `outline: none` sem `:focus-visible`.
- Active/selected: borda `primaryBorderFaint` + `elevation.lg`, sem scale > 1.02 (Linear discipline).
- CTAs primários: `gradientButtonPrimary` + `buttonShine`; altura mín `sizes.button.minHeight` 44px.
- Links nav: underline `gradientNavUnderline` no hover — não background pill em desktop.

---

## Regras de acessibilidade

- Contraste texto em `surfaceGlass`: validar `text` / `textSecondary` ≥ 4.5:1 (WCAG AA).
- Estado de conexão Live: texto + ícone + `aria-live="polite"` — não só `StatusDot` verde.
- `prefers-reduced-motion`: desligar `pageEnter` blur/scale, loops `blink`/`ambientPulse`, `scrollReveal` blur.
- Decorativo: `aria-hidden` em `HeroAtmosphere`, grid guides, grain.
- Touch targets ≥ 44px — `Header` menu, showcase cards `role="button"` + Enter/Space.

---

## Padrões de performance

- `React.memo` em `Hero` quando i18n re-render (já aplicado).
- Lazy routes (`Router.tsx`) — não importar Recharts na Home.
- `will-change: transform` só durante hover ativo — não permanente em grids.
- Animar `transform` + `opacity` preferencialmente; evitar `box-shadow` animation em 20+ células.
- Grain SVG fixo — não regenerar por frame.
- Socket-driven UI: throttle flash 100ms/célula (`realtime-dashboard-motion`).

---

## Padrões de responsividade

| Breakpoint | px | Comportamento |
|------------|-----|---------------|
| `mobile` | 480 | Stack single col, `pageX` mínimo |
| `tablet` | 768 | Header padding `lg`, hide center nav |
| `desktop` | 1024 | `ContentGrid` → 1 col |
| `wide` | 1280 | `HeroColumnGuides` visíveis |
| `ultraWide` | 1600 | `contentWide` max-width |

- `@media (hover: hover)` para lifts — touch não deve “prender” hover.
- Live Lab: coluna única < `tablet`; chart `min-height: 200px`.

---

## Anti-patterns (rejeitar no review)

- Bootstrap: botões retangulares flat, `border-radius: 4px`, azul primário
- Template SaaS: hero três colunas iguais, pricing cards, testimonial carousel
- Grid repetitivo: Skills só `auto-fill minmax(280px)` sem featured row
- Excesso glow: `shadows.glow` em cada card do grid
- Motion exagerada: `valueFlash` com `scale(1.02)` em todos os sensores simultâneos
- Cards estáticos: zero hover, zero spotlight em showcase selecionável
- UI flat: `background: surface` sem border + elevation + rim
- Landing genérica: gradiente roxo, ilustração 3D, “Trusted by” logos

---

## Exemplos

Ver [examples.md](examples.md).

## Arquivos canônicos

`theme.ts`, `theme/shared.ts`, `theme/effects.ts`, `surfaces.ts`, `GlobalStyles.ts`, `pageLayout.style.ts`
