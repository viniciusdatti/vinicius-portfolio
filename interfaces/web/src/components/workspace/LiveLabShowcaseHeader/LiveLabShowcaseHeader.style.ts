// Libraries
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Styles
import { glassSurface } from '../../../styles/surfaces';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const badgeGlow = keyframes`
  0%, 100% { border-color: var(--badge-glow-faint); }
  50% { border-color: var(--badge-glow-strong); }
`;

export const ShowcaseHeaderRoot = styled(motion.header)`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  ${glassSurface};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.sm};
  };

  body.workspace-operational & {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.sm};
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary}10 0%,
      transparent 45%,
      ${({ theme }) => theme.colors.accent}06 100%
    );
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.borderLight};
    pointer-events: none;
    z-index: 0;
  }
`;

export const ShowcaseHeaderCopy = styled.div`
  min-width: 0;
  position: relative;
  z-index: 1;
`;

export const ShowcaseTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.5rem, 2.8vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};

  body.workspace-operational & {
    font-size: clamp(1.15rem, 2.4vw, 1.45rem);
    margin: 0;
  }
`;

export const ShowcaseLead = styled(motion.p)`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.proseWide};

  body.workspace-operational & {
    display: none;
  }
`;

export const ShowcaseMetaRow = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LiveSignalStatus = styled.div<{ $live: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $live, theme }) => ($live ? theme.colors.success : theme.colors.textMuted)};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ $live, theme }) => ($live
    ? theme.colors.success
    : theme.colors.borderSubtle)}44;
  background: ${({ $live, theme }) => ($live
    ? theme.colors.successSurface
    : theme.colors.mutedSurface)};
  max-width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;
  line-height: 1.35;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    white-space: nowrap;
  }

  ${({ $live, theme }) => $live && css`
    box-shadow: 0 0 28px ${theme.colors.primary}2e;
  `}
`;

export const ShowcaseMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.mutedSurface};
  max-width: 100%;
  white-space: normal;
  line-height: 1.35;
`;

export const StatusDot = styled.span<{ $live: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $live, theme }) => ($live ? theme.colors.success : theme.colors.textMuted)};
  ${({ $live }) => $live && css`
    animation: ${blink} 2.2s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  `};
`;

export const ShowcaseBadge = styled(motion.span)`
  --badge-glow-faint: ${({ theme }) => theme.colors.primaryBorderFaint};
  --badge-glow-strong: ${({ theme }) => theme.colors.primaryBorderStrong};
  position: relative;
  z-index: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primarySurface};
  ${glassSurface};
  animation: ${badgeGlow} 4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
