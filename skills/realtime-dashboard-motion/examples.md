# Exemplos — Realtime Dashboard Motion

## Correto — flash de valor (causal, curto)

```ts
const valueFlash = keyframes`
  0%   { background-color: ${p => p.theme.colors.primarySurface}; }
  100% { background-color: transparent; }
`;
// Duração ≤ 400ms, sem scale
```

## Incorreto — implementação atual agressiva

```ts
const valueFlash = keyframes`
  40%  { transform: scale(1.02); } /* Datadog nunca faz bounce em KPI */
`;
```

## Correto — rota Live Lab

```tsx
// Layout.tsx — variant por pathname
const isWorkspace = pathname.startsWith('/live-lab');
<MotionMain variants={isWorkspace ? workspaceEnter : pageVariants} />
```

## Correto — throttle socket

```ts
const lastFlash = useRef<Record<string, number>>({});
const onMetric = (id: string) => {
  const now = Date.now();
  if (now - (lastFlash.current[id] ?? 0) < 100) return;
  lastFlash.current[id] = now;
  triggerFlash(id);
};
```

## Correto — log line Sentry-like

```ts
export const EventLogLine = styled.div<{ $type: EventLogType }>`
  animation: ${slideIn} 0.28s ${easeOut} both;
  color: ${({ $type, theme }) => getEventLogLineColor($type, theme)};
`;
```

## Incorreto

```ts
animation: bounce 0.6s infinite; /* em EventLogLine */
```
