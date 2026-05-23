# Exemplos — Premium Card System

## Correto — archetype marketing (glass only)

```ts
export const MarketingCard = styled.article`
  ${glassSurface};
  ${featuredSpotlight};
  ${cardInteractive};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
`;
```

## Incorreto — Card.style.ts atual

```ts
${livingSurface};
${glassSurface};  /* background duplicado */
&:hover { transform: translateY(-6px); } /* token diz 3px */
```

## Correto — showcase selecionável (Linear row)

```tsx
<ShowcaseCard
  role="button"
  tabIndex={0}
  aria-label={`${title}${selected ? ', selected' : ''}`}
  $selected={selected}
/>
```

```ts
export const ShowcaseCard = styled(motion.div)<{ $selected: boolean }>`
  ${glassSurface};
  ${cardInteractive};
  box-shadow: ${({ theme, $selected }) =>
    $selected ? theme.elevation.lg : theme.elevation.sm};
  border-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primaryBorderFaint : theme.colors.border};
`;
```

## Correto — operational (Retool)

```ts
export const MetricCell = styled.div`
  ${operationalGlass};
  padding: ${({ theme }) => theme.spacing.md};
  &:hover {
    border-color: ${({ theme }) => theme.colors.borderLight};
    /* sem translateY em grid 12+ */
  }
`;
```

## Incorreto

```ts
&:hover {
  transform: scale(1.03);
  box-shadow: 0 0 40px ${theme.colors.primary}; /* glow stack */
}
```
