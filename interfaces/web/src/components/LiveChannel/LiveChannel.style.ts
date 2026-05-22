// Libraries
import styled, { keyframes, css, DefaultTheme } from 'styled-components';
import { motion } from 'framer-motion';

// Components
import { livingSurface } from '../../styles/surfaces';

const connectionPulse = (theme: DefaultTheme) => keyframes`
  0%, 100% {
    opacity: 1;
  };
  50% {
    opacity: ${theme.effects.opacity.pulseMid};
  };
`;

export const ChannelSurface = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: ${({ theme }) => theme.sizes.chat.minHeight};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  ${livingSurface};
`;

export const ContextStrip = styled.div`
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.primarySurface};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;

export const ChannelMain = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

export const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`;

export const ChatHeaderLead = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

export const ChatTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

export const ChatMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
`;

export interface StatusBadgeProps {
  $online: boolean;
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  background-color: ${({ $online, theme }) =>
    $online ? theme.colors.successSurface : theme.colors.mutedSurface};
  color: ${({ $online, theme }) =>
    $online ? theme.colors.success : theme.colors.textMuted};

  &::before {
    content: '';
    width: ${({ theme }) => theme.sizes.badge.dotSm};
    height: ${({ theme }) => theme.sizes.badge.dotSm};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background-color: currentColor;
  };
`;

export interface ConnectionStatusProps {
  $connected: boolean;
  $reconnecting?: boolean;
  $synchronized?: boolean;
}

export const ConnectionStatus = styled.span<ConnectionStatusProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  color: ${({ $connected, $reconnecting, $synchronized, theme }) =>
    $synchronized
      ? theme.colors.primary
      : $connected
        ? theme.colors.success
        : $reconnecting
          ? theme.colors.warning
          : theme.colors.error};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: '';
    width: ${({ theme }) => theme.sizes.badge.dotSm};
    height: ${({ theme }) => theme.sizes.badge.dotSm};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background-color: currentColor;
    animation: ${({ $connected, $synchronized, theme }) =>
      $connected || $synchronized
        ? 'none'
        : css`
            ${connectionPulse(theme)} 1.5s infinite;
          `};
  };
`;

export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 0;
`;

export const IntroForm = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  overflow-y: auto;
`;

export const IntroTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin: 0;
`;

export const IntroDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin: 0;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const StartButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradientButtonPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  transition: box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.sm};
  };
`;

export interface MessageProps {
  $isOwn: boolean;
}

export const Message = styled(motion.div)<MessageProps>`
  max-width: min(82%, ${({ theme }) => theme.sizes.chat.messageMaxWidth});
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ $isOwn, theme }) =>
    $isOwn ? theme.colors.gradientMessageOwn : theme.colors.surfaceElevated};
  color: ${({ $isOwn, theme }) =>
    $isOwn ? theme.colors.onPrimary : theme.colors.text};
  align-self: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
  border: 1px solid
    ${({ $isOwn, theme }) =>
      $isOwn ? 'transparent' : theme.colors.borderSubtle};
  border-left: ${({ $isOwn, theme }) =>
    $isOwn ? '1px solid transparent' : `2px solid ${theme.colors.primary}`};
  box-shadow: ${({ $isOwn, theme }) =>
    $isOwn ? theme.shadows.sm : theme.elevation.sm};
`;

export const MessageContent = styled.p`
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

export const MessageTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  opacity: ${({ theme }) => theme.effects.opacity.mutedText};
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

export const TypingIndicator = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: fit-content;
`;

export const TypingDot = styled(motion.span)`
  width: ${({ theme }) => theme.sizes.badge.dotSm};
  height: ${({ theme }) => theme.sizes.badge.dotSm};
  background-color: ${({ theme }) => theme.colors.textMuted};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const ChatFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  flex-shrink: 0;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const SendButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradientButtonPrimary};
  color: ${({ theme }) => theme.colors.onPrimary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &:disabled {
    opacity: ${({ theme }) => theme.effects.opacity.disabled};
    cursor: not-allowed;
  };
`;

export const OfflineNotice = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.warningSurface};
  color: ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  flex-shrink: 0;
`;
