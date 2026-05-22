// Libraries
import styled, { css, keyframes } from 'styled-components';

// Components
import { operationalGlass } from '@/styles/surfaces';

const livePulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`;

export const KpiStripRoot = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const KpiTile = styled.div<{ $accent?: 'default' | 'warn' | 'critical' | 'live' }>`
  ${operationalGlass};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  min-width: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $accent, theme }) => {
    if ($accent === 'critical') return theme.colors.error;
    if ($accent === 'warn') return theme.colors.warning;
    if ($accent === 'live') return theme.colors.success;
    return theme.colors.primaryBorderFaint;
  }};
    opacity: 0.85;
  }
`;

export const KpiLabel = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const KpiValue = styled.span<{ $live?: boolean }>`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: clamp(1.125rem, 2vw, 1.35rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
  line-height: 1.1;

  ${({ $live }) => $live && css`
    animation: ${livePulse} 2.5s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `}
`;

export const KpiMeta = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.caption};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.04em;
`;
