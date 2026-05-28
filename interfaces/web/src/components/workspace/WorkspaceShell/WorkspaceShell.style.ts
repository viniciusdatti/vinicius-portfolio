/**
 * @fileoverview Workspace shell layout for Live Lab operational viewport.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { panelInsetRim } from '../../../styles/surfaces';

export const WorkspaceRoot = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
  isolation: isolate;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: calc(100vh - ${({ theme }) => theme.sizes.layout.headerOffset});
  overflow: visible;
  background: ${({ theme }) => theme.colors.background};

  body.live-lab-immersive & {
    height: auto;
    min-height: calc(100vh - ${({ theme }) => theme.sizes.layout.headerOffset});
    overflow: visible;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 130% 85% at 50% 105%, rgba(0, 0, 0, 0.45) 0%, transparent 58%),
      radial-gradient(ellipse 60% 45% at 88% 12%, ${({ theme }) => theme.colors.primary}14 0%, transparent 52%),
      radial-gradient(ellipse 50% 40% at 6% 78%, ${({ theme }) => theme.colors.accent}0a 0%, transparent 48%),
      linear-gradient(180deg, ${({ theme }) => theme.colors.background}cc 0%, #060708ee 100%);
  }
`;

export const WorkspaceChrome = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  gap: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    body.workspace-operational & {
      height: calc(100vh - ${({ theme }) => theme.sizes.layout.headerOffset});
      max-height: calc(100vh - ${({ theme }) => theme.sizes.layout.headerOffset});
    }
  }

`;

export const LiveLabImmersionBand = styled(motion.section)`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

export const LiveLabPinStage = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  overflow: hidden;
`;

export const ImmersionProgressTrack = styled.div`
  height: 2px;
  width: 100%;
  background: ${({ theme }) => theme.colors.borderSubtle};
  flex-shrink: 0;
  overflow: hidden;
`;

export const ImmersionProgressFill = styled.div`
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: ${({ theme }) => theme.colors.gradientLiveLabBar};
`;

export const LiveLabLogFlow = styled.div`
  flex-shrink: 0;
  min-height: min(28vh, 260px);
  max-height: min(32vh, 300px);
  margin: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.panel};
  ${panelInsetRim};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-left: ${({ theme }) => theme.spacing.xl};
    margin-right: ${({ theme }) => theme.spacing.xl};
  }
`;

export const TelemetryWorkspace = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.panel};
  ${panelInsetRim};
  position: relative;
  box-shadow:
    inset 0 1px 0 ${({ theme }) => theme.colors.borderLight},
    inset 0 -48px 64px rgba(0, 0, 0, 0.35);
  margin-bottom: ${({ theme }) => theme.spacing.md};

  body.live-lab-immersive & {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;
