// Libraries
import styled, { css } from 'styled-components';

// Types
import { CardVariant } from '@/components/Card/Card.types';

// Components
import {
  cardMarketingGlass,
  cardStatSignal,
  cardOperationalCell,
  cardShowcaseSurface,
  cardInteractive,
  cardPointerVars,
} from '@/styles/surfaces';

const variantStyles = {
  [CardVariant.MarketingGlass]: css`
    ${cardMarketingGlass};
  `,
  [CardVariant.StatSignal]: css`
    ${cardStatSignal};
  `,
  [CardVariant.Operational]: css`
    ${cardOperationalCell};
  `,
  [CardVariant.Showcase]: css`
    ${cardShowcaseSurface};
  `,
};

export const StyledCard = styled.div<{
  $variant: CardVariant;
  $interactive: boolean;
}>`
  ${cardPointerVars};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }

  ${({ $variant }) => variantStyles[$variant]};

  ${({ $interactive, $variant }) => ($interactive && $variant !== CardVariant.StatSignal
    && $variant !== CardVariant.Showcase
    ? cardInteractive
    : '')};
`;
