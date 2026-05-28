/**
 * @fileoverview Styled components for the Contact page — operational input console.
 */

// Libraries
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Components
import {
  buttonPrimaryRim,
  buttonShine,
  operationalGlass,
  panelChrome,
} from '../../styles/surfaces';

export interface InputStyleProps {
  $hasError?: boolean;
}

export interface SubmitButtonStyleProps {
  $loading?: boolean;
}

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

const CONTACT_LABEL_TRACKING = '0.14em';

const contactFieldFocusVisible = css`
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focusRing};
  };
`;

const contactFieldPlaceholder = css`
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    line-height: inherit;
    opacity: 1;
  };
`;

const contactFieldBase = css<InputStyleProps>`
  width: 100%;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  ${contactFieldPlaceholder};

  ${({ $hasError, theme }) => ($hasError
    ? css`
          border-color: ${theme.colors.error};

          &:focus-visible {
            border-color: ${theme.colors.error};
            box-shadow: 0 0 0 2px ${theme.colors.errorSurface};
          };
        `
    : contactFieldFocusVisible)};
`;

/* *************************************************************************************************
 ********************************************* LAYOUT **********************************************
 ************************************************************************************************ */

/**
 * Centered editorial column — single-stack input console (no 50/50 marketing split).
 */
export const ContactConsoleColumn = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.proseWide};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

/**
 * Operational glass shell for the contact form — rim via operationalGlass ::before only.
 */
export const FormSection = styled(motion.section)`
  ${operationalGlass};
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  padding: clamp(${({ theme }) => theme.spacing.xl}, 4vw, ${({ theme }) => theme.spacing.xxl});

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  };
`;

export const ConsoleEyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${CONTACT_LABEL_TRACKING};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
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
 * Single-column field stack (console density — no paired marketing rows).
 */
export const FormFieldStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Optional paired row for name + email on wider viewports only.
 */
export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.md};
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
 * Uppercase mono field label — industrial telemetry caption.
 */
export const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${CONTACT_LABEL_TRACKING};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Graphite console text input with tactical focus ring.
 */
export const Input = styled.input<InputStyleProps>`
  ${contactFieldBase};
  min-height: ${({ theme }) => theme.sizes.button.minHeight};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
`;

/**
 * Graphite console textarea with tactical focus ring.
 */
export const TextArea = styled.textarea<InputStyleProps>`
  ${contactFieldBase};
  padding: ${({ theme }) => theme.spacing.md};
  min-height: 160px;
  resize: vertical;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

/**
 * Semantic error copy — #EF4444 token.
 */
export const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

/**
 * Screen-reader live region for submit success and API errors.
 */
export const FormFeedback = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/**
 * Premium primary CTA — gradient + metallic sheen, 44px touch target.
 */
export const SubmitButton = styled(motion.button)<SubmitButtonStyleProps>`
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: ${({ theme }) => theme.sizes.button.minHeight};
  padding: ${({ theme }) => theme.sizes.button.paddingY}
    ${({ theme }) => theme.sizes.button.paddingX};
  background: ${({ theme }) => theme.colors.gradientButtonPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  ${buttonShine};
  ${buttonPrimaryRim};

  @media (hover: hover) {
    &:hover:not(:disabled) {
      filter: brightness(1.04);
    };
  };

  &:disabled {
    opacity: ${({ theme }) => theme.effects.opacity.disabled};
    cursor: not-allowed;
  };
`;

/**
 * Success state inside the live region after submission.
 */
export const SuccessMessage = styled(motion.p)`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.successSurface};
  color: ${({ theme }) => theme.colors.success};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

/* *************************************************************************************************
 ******************************************** AUX STRIP ********************************************
 ************************************************************************************************ */

/**
 * Secondary channels below the console — not a form/info split column.
 */
export const ContactAuxStrip = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  };
`;

export const InfoCard = styled(motion.div)`
  ${panelChrome};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  };
`;

export const InfoTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${CONTACT_LABEL_TRACKING};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const InfoItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderLight};
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  };

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focusRing};
  };

  svg {
    width: ${({ theme }) => theme.sizes.icon.sm};
    height: ${({ theme }) => theme.sizes.icon.sm};
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  };
`;

export const LiveLabCTACard = styled(motion.div)`
  ${operationalGlass};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

  & > * {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.content};
  };
`;

export const LiveLabCTATitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${CONTACT_LABEL_TRACKING};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

export const LiveLabCTADescription = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: 28ch;
`;

export const LiveLabCTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-height: ${({ theme }) => theme.sizes.button.minHeight};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradientButtonPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  ${buttonShine};
  ${buttonPrimaryRim};

  &:hover {
    filter: brightness(1.04);
    color: ${({ theme }) => theme.colors.onPrimary};
  };

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focusRing};
  };
`;
