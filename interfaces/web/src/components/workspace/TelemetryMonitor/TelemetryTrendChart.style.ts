// Libraries
import styled, { keyframes } from 'styled-components';

// Components
import { glassSurface } from '@/styles/surfaces';

const panelScan = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  8% { opacity: 0.35; }
  100% { transform: translateX(100%); opacity: 0; }
`;

export const ChartRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 260px;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  ${glassSurface};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      radial-gradient(
        ellipse 90% 55% at 50% 0%,
        ${({ theme }) => theme.colors.primary}0c,
        transparent 65%
      ),
      ${({ theme }) => theme.colors.gradientSurfaceRim};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.borderLight} 40%,
      transparent
    );
    z-index: 2;
    pointer-events: none;
  }
`;

export const ChartTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &::after {
    content: '';
    flex: 1;
    max-width: 120px;
    height: 1px;
    background: ${({ theme }) => theme.colors.borderSubtle};
    opacity: 0.6;
  }
`;

export const ChartPlot = styled.div`
  flex: 1;
  min-height: 200px;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 40%,
      ${({ theme }) => theme.colors.primary}05 50%,
      transparent 60%
    );
    animation: ${panelScan} 12s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }
  }
`;
