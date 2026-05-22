/**
 * @fileoverview Styled components for the Contact page.
 * Contains all visual styling for the contact form, info cards, and layout components.
 */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Components
import {
  cardInteractive,
  cardMarketingGlass,
  operationalGlass,
} from '@/styles/surfaces';

export interface InputStyleProps {
  $hasError?: boolean;
}

export interface SubmitButtonStyleProps {
  $loading?: boolean;
}

/**
 * Two-column grid layout for form and info sections.
 * Collapses to single column on smaller screens.
 */
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
    gap: clamp(2rem, 6vw, 5rem);
  }
`;

/**
 * Container for the contact form with surface styling.
 */
export const FormSection = styled(motion.div)`
  ${operationalGlass};
  ${cardInteractive};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  padding: ${({ theme }) => theme.spacing.xxl};
  --spot-opacity: 0.2;

  &:focus-within {
    --spot-opacity: 0.65;
    border-color: ${({ theme }) => theme.colors.borderLight};
  }

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }
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
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  };
  border-color: ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.border)};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.primary)};
    background-color: ${({ $hasError, theme }) => ($hasError ? 'inherit' : theme.colors.primarySurface)};
  };
`;

/**
 * Multi-line text input with error state support.
 */
export const TextArea = styled.textarea<InputStyleProps>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  };
  min-height: 150px;
  resize: vertical;
  border-color: ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.border)};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ $hasError, theme }) => ($hasError ? theme.colors.error : theme.colors.primary)};
    background-color: ${({ $hasError, theme }) => ($hasError ? 'inherit' : theme.colors.primarySurface)};
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
  border-radius: ${({ theme }) => theme.borderRadius.md};
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
  ${cardMarketingGlass};
  ${cardInteractive};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  }
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
  ${cardMarketingGlass};
  background: ${({ theme }) => theme.colors.gradientContactChatCta};
  border: 1px solid ${({ theme }) => theme.colors.primaryBorderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.normal};

  @media (hover: hover) {
    &:hover {
      transform: translateY(-${({ theme }) => theme.motion.distance.liftSm});
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
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
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    color: ${({ theme }) => theme.colors.onPrimary};
  };
`;
