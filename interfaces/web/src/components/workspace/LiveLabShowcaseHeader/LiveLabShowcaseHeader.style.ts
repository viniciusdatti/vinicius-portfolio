// Libraries
import styled, { css, keyframes } from 'styled-components';

// Components
import { glassSurface } from '@/styles/surfaces';

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
`;

const badgeGlow = keyframes`
  0%, 100% { border-color: rgba(245, 158, 11, 0.28); }
  50% { border-color: rgba(245, 158, 11, 0.55); }
`;

export const ShowcaseHeaderRoot = styled.div`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  ${glassSurface};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    gap: ${({ theme }) => theme.spacing.md};
  };

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

export const ShowcaseTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.75rem, 3.2vw, 2.35rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

export const ShowcaseLead = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.proseWide};
`;

export const ShowcaseMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ShowcaseMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.success};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.success}44;
  background: ${({ theme }) => theme.colors.successSurface};
  max-width: 100%;
  white-space: nowrap;
`;

export const ShowcaseMetaMuted = styled(ShowcaseMeta)`
  color: ${({ theme }) => theme.colors.textMuted};
  border-color: ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.mutedSurface};
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
    animation: ${pulse} 2.2s ease-in-out infinite;
  `};
`;

export const ShowcaseBadge = styled.span`
  position: relative;
  z-index: 1;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
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
