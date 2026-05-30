// Libraries
import styled, { css } from 'styled-components';

export interface EmbedInputStyleProps {
  $hasError?: boolean;
}

export interface EmbedSubmitStyleProps {
  $loading?: boolean;
}

const embedFieldFocus = css`
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.focusRing};
  };
`;

const embedFieldError = css<EmbedInputStyleProps>`
  border-color: ${({ theme }) => theme.colors.error};

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.error};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.errorSurface};
  };
`;

export const EmbedForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const EmbedField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const EmbedLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;

export const EmbedInput = styled.input<EmbedInputStyleProps>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 1;
  };

  ${({ $hasError }) => ($hasError ? embedFieldError : embedFieldFocus)};
`;

export const EmbedTextArea = styled.textarea<EmbedInputStyleProps>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text};
  min-height: 120px;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 1;
  };

  ${({ $hasError }) => ($hasError ? embedFieldError : embedFieldFocus)};
`;

export const EmbedError = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
`;

export const EmbedSubmit = styled.button<EmbedSubmitStyleProps>`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradientButtonPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  opacity: ${({ $loading, theme }) => ($loading ? theme.effects.opacity.disabled : 1)};

  &:disabled {
    opacity: ${({ theme }) => theme.effects.opacity.disabled};
  };
`;

export const EmbedSuccess = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.success};
`;

export const EmbedFeedback = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;
