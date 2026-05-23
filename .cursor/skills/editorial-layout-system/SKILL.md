---
name: editorial-layout-system
description: >-
  Layout editorial cinematográfico — page shell, section index, eyebrows,
  assimetria Hero, grids magazine. Linear magazine + Raycast density. Use em
  pages/, Home/, pageLayout.style.ts.
paths: interfaces/web/src/pages/**,interfaces/web/src/components/home/**,interfaces/web/src/components/Hero/**,interfaces/web/src/styles/pageLayout.style.ts
---

# Editorial Layout System

**Escopo:** rotas marketing `/`, `/about`, `/skills`, `/projects`, `/contact` — **não** `/live-lab` (ver `realtime-dashboard-motion`).

**Arquivo canônico:** `interfaces/web/src/styles/pageLayout.style.ts` — hoje **subutilizado**; duplicatas em `About.style.ts`, `Skills.style.ts`, `Projects.style.ts`, `Contact.style.ts` violam este skill.

---

## Identidade visual

Páginas contam **história técnica** em ritmo de revista/engineering blog — não wiki de cards iguais.

| Camada | Função |
|--------|--------|
| Masthead | Eyebrow + H1 gradient + lead prose |
| Capítulo | Section index (Home) ou H2 + lead |
| Corpo | Grid assimétrico ou `ContentGrid` 2 col |
| Evidência | Cards, showcase, stats |
| CTA | Um primário por viewport — Linear single-action |

**Tom:** confiança calma (Warp/Linear), não hype SaaS (“🚀 Transform your…”).

---

## Direção artística

| Referência | Editorial neste portfólio |
|------------|---------------------------|
| **Linear** | Títulos tight, muito whitespace vertical, uma ação clara |
| **Raycast** | Meta mono antes do título, listas densas em Projects |
| **Warp** | Hero técnico, grid guides 33/66% em wide |
| **Magazine** | `SectionIndex` decorativo, `eyebrowLineExpand` 24px |
| **Retool** | Só em blocos “tool” (form Contact) — não masthead |

**Cinematic:** Hero = abertura de filme (`HeroHeadlineClip` máscara y 105%→0); páginas internas = capítulos com `scrollReveal` blur 8px **uma vez**.

---

## Princípios de motion

| Zona | Variant | Parâmetros |
|------|---------|------------|
| Page mount | `pageEnter` | y 12px, scale 0.992, blur 6px — **gated** reduced motion |
| Page title | `editorialTitle` | stagger `editorialDelay` 0.18 |
| Section | `scrollReveal` | y 40px `distance.editorial`, blur 8px |
| Eyebrow line | `eyebrowLineExpand` | width 0→24px, 0.5s | Home only |
| Hero | `hero*` stagger | `heroDelay` 0.1, clip headline |

**Proibido em páginas:** bounce, rotate, stagger > 0.2s entre 10+ filhos iguais (Skills grid).

---

## Regras de composição

### Page shell (obrigatório)

```tsx
<PageContainer>
  <PageHeader>           {/* centralizado, max proseWide */}
    <SectionEyebrow />   {/* opcional */}
    <PageTitle />        {/* gradient — sempre */}
    <PageSubtitle />     {/* prose lead */}
  </PageHeader>
  {/* sections */}
</PageContainer>
```

### Home (única com índice decorativo)

```
[Hero full viewport — assimetria]
[Section 01 — eyebrow + index + title + lead + grid]
[Section 02 — Live Lab teaser — operationalGlass]
...
```

### About (editorial 2 col)

- `ContentGrid`: narrativa | foto/timeline
- Timeline: vertical line `borderSubtle`, não cards boxed iguais

### Projects (ferramenta + editorial)

- Masthead editorial + `FilterBar` Retool-dense abaixo
- Grid showcase + drawer — drawer = panel lateral, não página nova

### Skills (quebrar homogeneidade)

- **Obrigatório:** 1 row featured (2 col span) + grid secundário
- Modal certificado = `zIndex.modal`, não full-page white

### Contact

- Form em `operationalGlass`; hero textual compacto — não split 50/50 marketing fluff

**Assimetria:** permitida ratio 55/45 ou 40/60; **proibido** 50/50 três blocos repetidos.

---

## Regras de spacing

| Contexto | Token |
|----------|-------|
| Page padding | `pageX` + `pageY` via `PageContainer` |
| Após masthead | `sectionSm` (4rem) antes primeiro bloco |
| Entre seções Home | `sectionSm` tablet+, `xxl` mobile vertical |
| `PageHeader` margin-bottom | `sectionSm` |
| Prose block gap | `md` entre parágrafos (Global `p` margin-bottom) |

**Hero:** `sizes.hero.minHeight` `min(92vh, 920px)` — não `100vh` fixo com header overlap bug.

**Não** duplicar `PageContainer` com `max-width: 1100px` local — usar `contentMax` / `contentWide`.

---

## Regras de tipografia

### Masthead

- H1: `PageTitle` — `gradientTextDisplay`, **nunca** `color: text` sólido
- Lead: `PageSubtitle` — `md`, `textSecondary`, max `layout.prose`
- Eyebrow: `SectionEyebrow` de `pageLayout` ou Home pattern com linha `::before`

### Seções

- H2: `SectionTitle` clamp `2rem–3rem`, weight 700, `text-wrap: balance`
- Index: `sectionIndex` clamp `3.5rem–6rem`, cor `textMuted` opacity ~0.15, `pointer-events: none`

### Hero (exceção controlada)

- `HeroHeadline`: alinhar token `heroDisplay` `clamp(3.25rem, 9vw, 5.75rem)` — remover clamp divergente `2rem–3rem` atual
- Subhead: `heroSubtitle` token
- Deco tags: `HeroDecoTag` mono xs

---

## Regras de iluminação

- Masthead **sem** card container — luz vem do `body::before` hero wash
- Seções alternadas: opcional `backgroundSecondary` band full-bleed com `gradientSectionFade` máscara
- Fotos About: `gradientHeroRing` conic — single ring, não double border + glow
- Section eyebrow line: `accent` 50% opacity — não glow

---

## Regras de profundidade

- Masthead: plano 0 — texto flutua sobre atmosfera global
- Cards dentro de seção: elevation conforme `premium-card-system`
- Section index: z-index 0, behind content
- Hero atmosphere: z-index 0, content z-index 2 (`Hero` children)

**Footer:** `gradientFooter` fade — não sombra pesada.

---

## Regras de interação

- Scroll suave `html` — desligado em reduced motion
- `HeroScrollCue`: `scrollCueBounce` 6px — único loop hero aceitável
- Section links: hover underline gradient — não card lift em links inline
- FilterBar Projects: estado active com border bottom 2px primary — Linear tab feel

---

## Regras de acessibilidade

- Um `h1` por página; seções `h2` sequenciais — não pular níveis
- `SectionIndex` decorativo: `aria-hidden="true"`
- `PageHeader` centralizado — leitura natural para screen readers
- Modal Skills: focus trap, `aria-modal`, restore focus
- Hero scroll cue: `aria-label` no botão, chevron `aria-hidden`

---

## Padrões de performance

- `scrollReveal` com `viewport: { once: true }` — não re-animate on scroll up
- Hero `React.memo` — manter
- Imagens About avatar: width/height attrs, lazy below fold
- Não renderizar `HeroColumnGuides` below `wide` — já condicionado

---

## Padrões de responsividade

| BP | Layout |
|----|--------|
| < tablet | Single column, `pageX` min, hero `minHeightMobile` 88vh |
| tablet | Nav collapse, section padding `sectionSm` |
| desktop | `ContentGrid` 2→1 col |
| wide | Hero guides 33/66% |
| ultraWide | `contentWide` 1320px |

`text-wrap: balance` em títulos — fallback graceful.

---

## Anti-patterns

- Wall of equal cards (Skills)
- Centered everything sem hierarquia
- PageTitle sem gradient em uma rota só
- Duplicar `PageContainer` 4×
- Section padding `6rem` entre cada parágrafo curto
- Lorem-style three-column features icons
- Bootstrap `container` + `row` / `col-md-4`
- Landing “Trusted by” logo strip

---

## Exemplos

Ver [examples.md](examples.md).

## Checklist PR editorial

- [ ] Importa `pageLayout.style.ts`
- [ ] H1 gradient
- [ ] Eyebrow mono + linha se marcação de capítulo
- [ ] Grid não 100% homogêneo em Skills/Projects
- [ ] `pageEnter` gated
