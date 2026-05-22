// Libraries
import styled, { css, keyframes, DefaultTheme } from 'styled-components';

const progressPulse = (theme: DefaultTheme) => keyframes`
  0% {
    opacity: ${theme.effects.opacity.heroGlowMin};
  };
  50% {
    opacity: ${theme.effects.opacity.heroGlowMax};
  };
  100% {
    opacity: ${theme.effects.opacity.heroGlowMin};
  };
`;

export const BootRoot = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  flex-shrink: 0;
`;

export const BootRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

export const BootCopy = styled.div`
  min-width: 0;
`;

export const BootTitle = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const BootPhase = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
`;

export const BootTrack = styled.div`
  flex: 1;
  min-width: 120px;
  max-width: 280px;
  height: 3px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.borderSubtle};
  overflow: hidden;
`;

export const BootFill = styled.div<{ $progress: number; $live: boolean }>`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.gradientLiveLabBar};
  transition: width ${({ theme }) => theme.transitions.slow};
  ${({ $live, theme }) => $live && css`
    animation: ${progressPulse(theme)} 2.4s ease-in-out infinite;
  `};
`;
