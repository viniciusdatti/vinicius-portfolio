# Exemplos — Portfolio Visual Language

## Correto — título de página (Linear-like precision)

```ts
// pageLayout.style.ts — única fonte
export const PageTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.fontSize.display};
  background: ${({ theme }) => theme.colors.gradientTextDisplay};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;
```

## Incorreto — About.style.ts hoje

```ts
export const PageTitle = styled.h1`
  color: ${({ theme }) => theme.colors.text}; /* quebra identidade editorial */
`;
```

## Correto — profundidade Datadog-like (um nível)

```ts
export const SensorCard = styled.div`
  ${operationalGlass};
  box-shadow: ${({ theme }) => theme.elevation.md};
  &:hover {
    box-shadow: ${({ theme }) => theme.elevation.lg};
    border-color: ${({ theme }) => theme.colors.borderLight};
  }
`;
```

## Incorreto — Hero portrait stack

```ts
box-shadow: ${theme.elevation.lg}, 0 24px 48px rgba(0,0,0,0.45); /* + rim + glow = muddy */
```

## Correto — amber budget (sinal vivo)

```tsx
<SectionEyebrow>LIVE LAB</SectionEyebrow> {/* accent OK */}
<StatNumber>{count}</StatNumber>          {/* text branco — métrica não é CTA */}
```

## Incorreto — amber em tudo

```ts
color: ${theme.colors.primary}; /* em parágrafo body 400px largo */
```

## Correto — reduced motion gate (obrigatório implementar)

```ts
const reduced = usePrefersReducedMotion();
const variants = reduced
  ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
  : pageEnter;
```

## Incorreto — pageEnter sempre

```tsx
<motion.main variants={pageEnter} /> /* blur(6px) com vestibular disorders */
```
