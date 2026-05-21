// Libraries
import styled from 'styled-components';

// Types
import type { ButtonVariant } from './Button.types';

// Components
import { buttonShine } from '../../styles/surfaces';

interface StyledButtonProps {
  $variant?: ButtonVariant;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: ${theme.colors.gradientButtonPrimary};
          color: ${theme.colors.onPrimary};
          border-color: transparent;
          box-shadow: ${theme.shadows.sm}, ${theme.shadows.glow};
          ${buttonShine};

          &:hover {
            box-shadow: ${theme.shadows.md}, ${theme.shadows.glow};
            transform: translateY(-${theme.motion.distance.liftSm});
          };

          &:active {
            transform: translateY(0);
          };
        `;
      case 'secondary':
        return `
          background: ${theme.colors.surfaceGlass};
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};
          backdrop-filter: ${theme.effects.backdrop.glass};

          &:hover {
            border-color: ${theme.colors.borderLight};
            background: ${theme.colors.surfaceHover};
            transform: translateY(-${theme.motion.distance.liftSm});
          };

          &:active {
            transform: translateY(0);
          };
        `;
      case 'outline':
      default:
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border-color: ${theme.colors.primaryBorderFaint};

          &:hover {
            background-color: ${theme.colors.primaryLight};
            border-color: ${theme.colors.primary};
            transform: translateY(-${theme.motion.distance.liftSm});
          };

          &:active {
            transform: translateY(0);
          };
        `;
    }
  }};
`;
