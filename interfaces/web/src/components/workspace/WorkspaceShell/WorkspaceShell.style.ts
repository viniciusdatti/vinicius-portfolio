// Libraries
import styled from 'styled-components';

// Components
import { panelInsetRim } from '@/styles/surfaces';

export const WorkspaceRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 130% 85% at 50% 105%, rgba(0, 0, 0, 0.72) 0%, transparent 58%),
      radial-gradient(ellipse 60% 45% at 88% 12%, ${({ theme }) => theme.colors.primary}14 0%, transparent 52%),
      radial-gradient(ellipse 50% 40% at 6% 78%, ${({ theme }) => theme.colors.accent}0a 0%, transparent 48%),
      linear-gradient(180deg, ${({ theme }) => theme.colors.background} 0%, #060708 100%);
  }
`;

export const WorkspaceChrome = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  overflow: hidden;
`;

export const TelemetryWorkspace = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md} 0;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.panel};
  ${panelInsetRim};
  position: relative;
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.borderLight},
    inset 0 -48px 64px rgba(0, 0, 0, 0.35);

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.sm};
  }
`;
