# Exemplos — Frontend Architecture

## Correto — página thin

```tsx
// pages/About/About.tsx
import { AboutSections } from '@/components/about';
import { PageContainer, PageHeader, PageTitle, PageSubtitle } from '@/styles/pageLayout.style';

export const About = () => {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>{t('about.title')}</PageTitle>
        <PageSubtitle>{t('about.lead')}</PageSubtitle>
      </PageHeader>
      <AboutSections />
    </PageContainer>
  );
};
```

## Incorreto — page god + api

```tsx
export const About = () => {
  const { data } = useQuery(...); /* OK */
  return <div style={{ padding: 40 }}>...</div>; /* inline + magic number */
};
```

## Correto — Layout motion branch

```tsx
const reduced = usePrefersReducedMotion();
const isLiveLab = pathname === '/live-lab';
const pageVariants = reduced
  ? reducedPageFade
  : isLiveLab
    ? workspaceEnter
    : pageEnter;
```

## Correto — Telemetry scope

```tsx
// pages/LiveLab/LiveLab.tsx
export const LiveLab = () => (
  <TelemetryProvider>
    <WorkspaceShell />
  </TelemetryProvider>
);
```

## Incorreto

```tsx
// App.tsx — NÃO
<TelemetryProvider>
  <RouterProvider />
</TelemetryProvider>
```

## Correto — import path

```ts
import { Button } from '@/components/Button';
```

## Incorreto

```ts
import { Button } from '@/components/Button/Button';
```
