// Libraries
import styled, { keyframes, DefaultTheme } from 'styled-components';

// Components
import { panelInsetRim } from '@/styles/surfaces';

const livePulse = (theme: DefaultTheme) => keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 ${theme.colors.success};
  };
  50% {
    opacity: 0.85;
    box-shadow: 0 0 0 4px transparent;
  };
`;

export const LiveMicroRoot = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  width: 100%;
  max-width: 280px;
  ${panelInsetRim};
`;

export const LiveMicroDot = styled.span<{ $live: boolean }>`
  width: ${({ theme }) => theme.sizes.badge.dot};
  height: ${({ theme }) => theme.sizes.badge.dot};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  flex-shrink: 0;
  background: ${({ $live, theme }) => ($live ? theme.colors.success : theme.colors.textMuted)};
  animation: ${({ $live, theme }) => ($live ? livePulse(theme) : 'none')} 2.4s
    ease-in-out infinite;
`;

export const LiveMicroLabel = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

export const LiveMicroHint = styled.span`
  display: block;
  margin-top: 2px;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;
