/**
 * @fileoverview Boot handshake overlay styles for Live Lab workspace entry.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Libraries
import styled, { css, keyframes, DefaultTheme } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { glassSurface } from '@/styles/surfaces';

const progressPulse = (theme: DefaultTheme) => keyframes`
  0% {
    opacity: ${theme.effects.opacity.heroGlowMin};
  }
  50% {
    opacity: ${theme.effects.opacity.heroGlowMax};
  }
  100% {
    opacity: ${theme.effects.opacity.heroGlowMin};
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
`;

export const BootRoot = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  ${glassSurface};
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  body.workspace-operational & {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.colors.primary}12 50%,
      transparent
    );
    animation: ${shimmer} 3.5s ease-in-out infinite;
    pointer-events: none;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`;

export const BootRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
`;

export const BootCopy = styled.div`
  min-width: 0;
`;

export const BootTitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const BootPhase = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  letter-spacing: 0.04em;
`;

export const BootTrack = styled.div`
  flex: 1;
  min-width: 140px;
  max-width: 360px;
  height: 4px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.borderSubtle};
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.35);
`;

export const BootFill = styled.div<{ $progress: number; $live: boolean }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.gradientLiveLabBar};
  transition: width ${({ theme }) => theme.transitions.slow};
  outline: 1px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  outline-offset: -1px;
  ${({ $live, theme }) => $live && css`
    animation: ${progressPulse(theme)} 2.4s ease-in-out infinite;
  `};
`;
