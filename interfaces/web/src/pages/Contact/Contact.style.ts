/**
 * @fileoverview Styled components for the Contact page.
 * Contains all visual styling for the contact form, info cards, and layout components.
 */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface InputStyleProps {
  $hasError?: boolean;
}

export interface SubmitButtonStyleProps {
  $loading?: boolean;
}

/**
 * Main container for the Contact page content.
 * Centers content with responsive padding.
 */
export const PageContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.contentMax};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl}
    ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.pageY}
      ${({ theme }) => theme.spacing.pageX};
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.ultraWide}) {
    max-width: ${({ theme }) => theme.layout.contentWide};
  };
`;

/**
 * Header section containing title and subtitle.
 */
export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

/**
 * Animated page title with responsive font sizing.
 */
export const PageTitle = styled(motion.h1)`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.display};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * Animated subtitle with muted text color.
 */
export const PageSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

/**
 * Two-column grid layout for form and info sections.
 * Collapses to single column on smaller screens.
 */
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  };
`;

/**
 * Container for the contact form with surface styling.
 */
export const FormSection = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  padding: ${({ theme }) => theme.spacing.xxl};
  box-shadow: ${({ theme }) => theme.elevation.md};
`;

/**
 * Form element with flex column layout.
 */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Two-column row for form inputs.
 * Collapses to single column on mobile.
 */
export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  };
`;

/**
 * Container for label and input with error message.
 */
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

/**
 * Form field label with secondary text styling.
 */
export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Text input field with error state support.
 */
export const Input = styled.input<InputStyleProps>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.error : theme.colors.border};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
    background-color: ${({ $hasError, theme }) =>
      $hasError ? 'inherit' : theme.colors.primarySurface};
  };
`;

/**
 * Multi-line text input with error state support.
 */
export const TextArea = styled.textarea<InputStyleProps>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  min-height: 150px;
  resize: vertical;
  border-color: ${({ $hasError, theme }) =>
    $hasError ? theme.colors.error : theme.colors.border};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? theme.colors.error : theme.colors.primary};
    background-color: ${({ $hasError, theme }) =>
      $hasError ? 'inherit' : theme.colors.primarySurface};
  };
`;

/**
 * Error message text displayed below form fields.
 */
export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

/**
 * Animated submit button with loading state support.
 */
export const SubmitButton = styled(motion.button)<SubmitButtonStyleProps>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: ${({ theme }) => theme.effects.opacity.disabled};
    cursor: not-allowed;
  };
`;

/**
 * Success message displayed after form submission.
 */
export const SuccessMessage = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.successSurface};
  color: ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-align: center;
`;

/**
 * Container for contact info cards with stagger animation.
 */
export const InfoSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

/**
 * Card container for contact information items.
 */
export const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
`;

/**
 * Title for info card sections.
 */
export const InfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Vertical list container for info items.
 */
export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

/**
 * Clickable info item with icon and text.
 */
export const InfoItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }

  svg {
    width: ${({ theme }) => theme.sizes.icon.sm};
    height: ${({ theme }) => theme.sizes.icon.sm};
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  };
`;

/**
 * Call-to-action card for live chat feature.
 */
export const ChatCTACard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.gradientContactChatCta};
  border: 1px solid ${({ theme }) => theme.colors.primaryBorderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

/**
 * Title for the chat CTA card.
 */
export const ChatCTATitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

/**
 * Description text for the chat CTA card.
 */
export const ChatCTADescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Button linking to the live chat feature.
 */
export const ChatCTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: 0;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.onPrimary};
  };
`;
