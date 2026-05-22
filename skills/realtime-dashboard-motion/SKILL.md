---
name: realtime-dashboard-motion
description: >-
  Motion e UX operacional do Live Lab — telemetria Socket.IO, TelemetryMonitor,
  charts, BootHandshake. Estética Datadog/Sentry/Retool com cinematic restraint.
  Use em workspace/, live-lab, telemetry, Recharts.
paths: interfaces/web/src/components/workspace/**,interfaces/web/src/components/home/LiveLab*/**,interfaces/web/src/pages/**/LiveLab*
---

# Realtime Dashboard Motion

Escopo: `/live-lab`, `TelemetryProvider`, `WorkspaceShell`, `TelemetryMonitor`, `LiveLabAtmosphere`, `BootHandshake`, `LiveLabObservatory`, `TelemetryTrendChart`.

**Pai:** `portfolio-visual-language` — amber semântico e graphite aplicam-se aqui em regime *operational*.

---

## Identidade visual

Painel de **infraestrutura ao vivo**: o usuário está “dentro” do sistema, não lendo marketing.

| Elemento | Tratamento |
|----------|------------|
| Fundo monitor | `background` sólido + `MonitorRoot::before` radial amber 6–10% alpha |
| Tipografia dominante | `fontFamily.mono` no `MonitorRoot` — herança para filhos |
| Valores | Grandes, tabulares, cor por `SensorStatus` via `getSensorValueColor` |
| Logs | Sentry-like timeline — linha mono, cor por `EventLogType` |
| Charts | Datadog-like — grid sutil, sem animação barra chamativa |

**Cor de estado (não decorativa):**

- `SensorStatus` OK → `success` / `text`
- Warn → `warning`
- Critical → `error`
- Desconectado → `textMuted` (nunca vermelho piscando sem copy)

---

## Direção artística

| Referência | No Live Lab |
|------------|-------------|
| **Datadog** | Grid de sensores uniforme, sparkline/threshold bar, refresh feel |
| **Sentry** | `slideIn` em nova linha de log, severidade por cor |
| **Retool** | `operationalGlass`, inset highlight, padding compacto |
| **Warp** | Fundo técnico, monospace, sem ilustração |
| **Linear** | Transição de rota `workspaceEnter` — fade only, sem slide |
| **Raycast** | `LiveLabShowcaseHeader` status cluster compacto |

**Cinematic rule:** câmera *estática* no workspace — motion local (célula, log, barra), não parallax de página.

---

## Princípios de motion

| ID | Regra | Implementação atual |
|----|-------|---------------------|
| M1 | Socket → flash local | `valueFlash` + remount key no valor |
| M2 | Log → enter once | `slideIn` 280ms, `translateY(-4px)` |
| M3 | Live indicator → slow pulse | `blink` 50% opacity; `badgeGlow` header |
| M4 | Atmosphere → background only | `ambientPulse` 6s no `MonitorRoot::before` |
| M5 | Boot → progress determinístico | `shimmer` + `progressPulse` — desliga após complete |
| M6 | Chart → dados primeiro | Recharts `isAnimationActive={!reduced}` |

**Proibido:** `scale(1.08)` em todo grid no tick do socket; `rotate` em cards; parallax scroll no monitor.

**Framer nesta zona:** usar `workspaceEnter` em `Layout` para `/live-lab` — **não** `pageEnter` (blur desloca leitura de métricas).

---

## Regras de composição

```
LiveLabAtmosphere (z-0)
└─ WorkspaceShell
   ├─ LiveLabShowcaseHeader  [status | title | badges]
   ├─ BootHandshake          [progress | steps]  (mount once)
   └─ TelemetryMonitor
      ├─ MonitorHeader        [MONITOR_TITLE | connection]
      ├─ SensorGrid           [N × SensorCard]
      ├─ TelemetryTrendChart
      └─ EventLogScroll
```

- Header do monitor: `padding md xl`, `border-bottom` 1px `border` — Retool panel divider.
- Sensor grid: `gap` `sm`–`md`, células **mesma altura** na linha (CSS grid `1fr` rows).
- Event log: altura fixa flex `min-height: 0`, scroll interno — Sentry issue stream.
- Chart: largura 100%, legenda mono `xs`, não sobrepor tiles.

---

## Regras de spacing

- `MonitorHeader`: `spacing.md` vertical, `spacing.xl` horizontal.
- `SensorCard` interno: `spacing.md` padding; valor → label gap `xs`.
- Entre grid e chart: `spacing.lg` (não `section` 6rem — operational density).
- `WorkspaceShell`: gap `workspaceGap` **1px** — separador hairline entre módulos.
- BootHandshake: compact — altura barra ≤ 4px track + label `xs`.

---

## Regras de tipografia

| Elemento | Estilo |
|----------|--------|
| `MonitorTitle` | `xs`, `letter-spacing: 0.12em`, UPPERCASE, `textMuted` |
| `MonitorStatus` | `xs`, `letter-spacing: 0.08em`, success/muted |
| `SensorLabel` | `xs` mono, muted |
| `SensorValue` | `lg`–`xl`, tabular, cor status |
| `EventLogLine` | `xs` mono, cor por tipo |
| Chart axis | `xs` mono, `textMuted` |

**Não** usar `fontSize.display` dentro de tile 120px — hierarquia quebrada.

Threshold copy: `textMuted` + percentual — Datadog KPI secondary line.

---

## Regras de iluminação

- `MonitorRoot::before`: dois radiais amber (`primary`10, `accent`08) — **único** bloom do viewport monitor.
- `SensorCard`: `operationalGlass` + opcional top border status 2px (`getSensorStatusColor`).
- Status glow em badge: opacity ≤ 0.7, não `shadows.glow` externo em cada tile.
- Chart container: `elevation.sm` — sem triple shadow (`TelemetryTrendChart` refactor target).

---

## Regras de profundidade

- Stack: atmosphere 0 → shell content 1 → monitor children 1 (relative).
- Cards: `elevation.md` repouso; hover `elevation.lg` — **sem** `translateY` > 2px em grid denso (opcional: só border).
- `EventLogScroll`: `inset` shadow leve para “well” — um nível.
- Não competir com grain global 9998 — painéis opacos suficientes.

---

## Regras de interação

- Hover sensor: brighten `borderLight`, não spotlight pointer.
- Click: selecionar série/chart — não necessário em MVP; foco em leitura.
- Connection toggle: status textual + dot — `aria-live` no `MonitorStatus` wrapper.
- Value update: flash **max 1/célula/100ms** (throttle no handler/store).

---

## Regras de acessibilidade

- `MonitorStatus`: `role="status"` `aria-live="polite"` `aria-atomic="true"`.
- Cada `SensorCard`: `aria-label={`${label}, ${value}, ${status}`}` — cor não é único indicador.
- `blink` desligado em `prefers-reduced-motion` (já em `MonitorRoot::before`).
- Chart: título visível + `aria-label` no container para leitores.
- Focus order: header → grid row-major → log → chart controls.

---

## Padrões de performance

- Socket updates: batch React state (Zustand) — evitar 50 `setState`/s.
- `valueFlash`: prefer CSS class toggle vs remount se key churn alto.
- Recharts: `animationDuration={300}` max; desligar com reduced motion.
- Desmontar `BootHandshake` após complete — não manter shimmer infinito.
- `LiveLabAtmosphere` orbs: `pointer-events: none`, GPU apenas `opacity`/`transform`.

---

## Padrões de responsividade

- `< tablet`: stack vertical — atmosphere height reduzida, chart abaixo grid.
- Grid sensores: `repeat(auto-fill, minmax(140px, 1fr))` mobile; `minmax(180px, 1fr)` desktop.
- Font scale: não reduzir abaixo 11px effective (`xs` 0.75rem = 12px @ 16px root).
- Header workspace: pills podem wrap — `flex-wrap` + gap `xs`.

---

## Anti-patterns

- Dashboard “Christmas tree” — todos os status piscando
- Gráfico 3D / gradient fill area neon
- Slide horizontal de página no Live Lab
- Modal sobre monitor para dados secundários
- Logs com bounce/elastic
- Métricas fake sem socket (estático) com animação “live” — desonesto
- Retool-grey claro em dark theme

---

## Exemplos

Ver [examples.md](examples.md).

## Arquivos

`TelemetryMonitor.tsx|.style.ts`, `TelemetryTrendChart.style.ts`, `WorkspaceShell.tsx`, `LiveLabAtmosphere.style.ts`, `BootHandshake.style.ts`, `TelemetryProvider.tsx`, `useTelemetry.ts`, `telemetryStore`
