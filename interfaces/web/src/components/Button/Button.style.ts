// Libraries
import styled from 'styled-components';

// Types
import type { ButtonVariant } from './Button.types';

interface StyledButtonProps {
  $variant?: ButtonVariant;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: 2px solid transparent;
  min-height: 48px;
  box-sizing: border-box;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    transform 0.15s ease;

  ${({ $variant = 'primary', theme }) => {
    switch ($variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: white;
          border-color: ${theme.colors.primary};

          &:hover {
            filter: brightness(1.1);
            transform: translateY(-1px);
          };

          &:active {
            transform: translateY(0);
          };
        `;
      case 'secondary':
        return `
          background-color: transparent;
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};

          &:hover {
            border-color: ${theme.colors.primary};
            color: ${theme.colors.primary};
            transform: translateY(-1px);
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
          border-color: ${theme.colors.primary};

          &:hover {
            background-color: ${theme.colors.primary};
            color: white;
            transform: translateY(-1px);
          };

          &:active {
            transform: translateY(0);
          };
        `;
    }
  }};
`;
