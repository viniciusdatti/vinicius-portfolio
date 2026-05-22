// Libraries
import styled, { css } from 'styled-components';

export const RailRoot = styled.nav`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: ${({ theme }) => theme.sizes.layout.moduleRailWidth};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.xs};
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  box-shadow: inset -1px 0 0 ${({ theme }) => theme.colors.borderLight};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: row;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    overflow-x: auto;
  };
`;

const railItemStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  border: 1px solid transparent;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    background ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;
  cursor: pointer;
  background: transparent;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderSubtle};
  };

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: 1;
    min-width: 4.5rem;
  };
`;

export const RailButton = styled.button<{ $active: boolean }>`
  ${railItemStyles}

  ${({ $active, theme }) => ($active
    ? css`
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primaryBorderFaint};
          background: ${theme.colors.primarySurface};
        `
    : '')};
`;

export const RailIndex = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: ${({ theme }) => theme.effects.opacity.mutedText};
`;
