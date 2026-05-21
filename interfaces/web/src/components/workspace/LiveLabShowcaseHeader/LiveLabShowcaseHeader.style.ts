// Libraries
import styled from 'styled-components';

export const ShowcaseHeaderRoot = styled.div`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ShowcaseHeaderCopy = styled.div`
  min-width: 0;
`;

export const ShowcaseTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.gradientTextDisplay};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
`;

export const ShowcaseLead = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.proseWide};
`;

export const ShowcaseBadge = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.primaryBorderFaint};
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primarySurface};
`;
