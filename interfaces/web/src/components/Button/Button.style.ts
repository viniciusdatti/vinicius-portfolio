// Libraries
import styled from 'styled-components';

// Components
import { buttonPrimaryRim, buttonShine } from '../../styles/surfaces';

// Component
import type { ButtonVariant } from './Button.types';

interface StyledButtonProps {
  $variant?: ButtonVariant;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.sizes.button.paddingY}
    ${({ theme }) => theme.sizes.button.paddingX};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.normal};
  cursor: pointer;
  border: 1px solid transparent;
  min-height: ${({ theme }) => theme.sizes.button.minHeight};
  box-sizing: border-box;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast};

  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          position: relative;
          overflow: hidden;
          background: ${theme.colors.gradientButtonPrimary};
          color: ${theme.colors.onPrimary};
          border-color: transparent;
          ${buttonShine};
          ${buttonPrimaryRim};

          &:hover {
            filter: brightness(1.04);
          };

          &:active {
            filter: brightness(0.98);
          };
        `;
      case 'secondary':
        return `
          border-radius: ${theme.borderRadius.sm};
          background: ${theme.colors.surfaceGlass};
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};
          backdrop-filter: ${theme.effects.backdrop.glass};

          &:hover {
            border-color: ${theme.colors.borderLight};
            background: ${theme.colors.surfaceHover};
          };
        `;
      case 'outline':
      default:
        return `
          border-radius: ${theme.borderRadius.sm};
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primaryBorderFaint};

          &:hover {
            background-color: ${theme.colors.primaryLight};
            border-color: ${theme.colors.primary};
          };
        `;
    }
  }};
`;
