# Exemplos — Editorial Layout System

## Correto — página About

```tsx
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  SectionEyebrow,
  ContentGrid,
} from '@/styles/pageLayout.style';

export const About = () => (
  <PageContainer>
    <PageHeader>
      <SectionEyebrow>{t('about.eyebrow')}</SectionEyebrow>
      <PageTitle>{t('about.title')}</PageTitle>
      <PageSubtitle>{t('about.lead')}</PageSubtitle>
    </PageHeader>
    <ContentGrid>{/* story | timeline */}</ContentGrid>
  </PageContainer>
);
```

## Incorreto — duplicata local

```ts
// About.style.ts — REMOVER após migração
export const PageContainer = styled.div` max-width: 1200px; ... `;
export const PageTitle = styled.h1` color: ${text}; `;
```

## Correto — Home section capítulo

```tsx
<Section>
  <SectionIndex aria-hidden>01</SectionIndex>
  <SectionEyebrow>Observability</SectionEyebrow>
  <SectionTitle variants={scrollRevealTitle}>...</SectionTitle>
  <SectionLead>...</SectionLead>
</Section>
```

## Correto — Skills featured row

```ts
export const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  ${FeaturedSkillCard} {
    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      grid-column: span 2;
    }
  }
`;
```

## Incorreto

```ts
display: grid;
grid-template-columns: repeat(3, 1fr); /* 3 iguais em todo breakpoint */
```
