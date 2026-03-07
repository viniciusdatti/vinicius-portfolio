/**
 * @fileoverview Styled components for the Admin Login page.
 * Contains all visual styling for the login form and its elements.
 */

// Libraries
import { motion } from 'framer-motion';
import styled from 'styled-components';

/**
 * Main container that centers the login card on the page.
 * Provides full viewport height with centered content.
 */
export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

/**
 * Animated card container for the login form.
 * Features entrance animation and styled borders.
 */
export const LoginCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  width: 100%;
  max-width: 400px;
`;

/**
 * Logo section with branding and subtitle.
 * Centers content with accent color on the period.
 */
export const Logo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize.xxl};
    span {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: ${({ theme }) => theme.spacing.sm};
  };
`;

/**
 * Form container with vertical layout and consistent spacing.
 */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Wrapper for label and input pairs.
 */
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

/**
 * Styled label for form inputs.
 */
export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Text input field with consistent padding and border radius.
 */
export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

/**
 * Animated submit button with hover and tap effects.
 * Includes disabled state styling.
 */
export const SubmitButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.7;
  };
`;

/**
 * Error message display with error-themed background and text.
 */
export const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.error}20;
  color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
`;
