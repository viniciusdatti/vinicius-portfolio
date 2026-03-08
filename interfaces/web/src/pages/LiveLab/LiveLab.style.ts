/**
 * @fileoverview Styled components for the LiveLab page.
 * Contains all visual styling for the real-time chat interface and tech explanation section.
 */

// Libraries
import styled from 'styled-components';
import { motion } from 'framer-motion';

// =============================================================================
// Page Layout
// =============================================================================

/**
 * Main container for the LiveLab page with responsive padding.
 */
export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  };
`;

/**
 * Header section with centered text alignment.
 */
export const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

/**
 * Animated page title with responsive font size.
 */
export const PageTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * Subtitle with muted text color.
 */
export const PageSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

/**
 * Two-column grid layout that collapses on smaller screens.
 * Both columns stretch to the same height (row height = max of both).
 */
export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

// =============================================================================
// Chat Container
// =============================================================================

/**
 * Main chat container. Fills grid cell height so it always matches the right panel.
 */
export const ChatContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  height: 100%;
`;

/**
 * Chat header with title and status badge.
 */
export const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/**
 * Chat title with icon support.
 */
export const ChatTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/**
 * Props for the StatusBadge component.
 */
export interface StatusBadgeProps {
  /** Whether the admin is online */
  $online: boolean;
}

/**
 * Badge showing online/offline status with colored indicator.
 */
export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: ${({ $online, theme }) =>
    $online ? theme.colors.success + '20' : theme.colors.textMuted + '20'};
  color: ${({ $online, theme }) =>
    $online ? theme.colors.success : theme.colors.textMuted};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
  };
`;

/**
 * Scrollable chat body container.
 */
export const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

// =============================================================================
// Intro Form
// =============================================================================

/**
 * Intro form container with centered content.
 */
export const IntroForm = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  overflow-y: auto;
`;

/**
 * Intro form title.
 */
export const IntroTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  text-align: center;
`;

/**
 * Intro form description text.
 */
export const IntroDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

/**
 * Input group container for label and input pairs.
 */
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

/**
 * Form label styling.
 */
export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Text input styling.
 */
export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

/**
 * Primary action button for starting chat.
 */
export const StartButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  };
`;

// =============================================================================
// Chat Messages
// =============================================================================

/**
 * Props for the Message component.
 */
export interface MessageProps {
  /** Whether the message is from the current user */
  $isOwn: boolean;
}

/**
 * Chat message bubble with different styling for own/other messages.
 */
export const Message = styled(motion.div)<MessageProps>`
  max-width: 80%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ $isOwn, theme }) =>
    $isOwn ? theme.colors.primary : theme.colors.backgroundSecondary};
  color: ${({ $isOwn }) => ($isOwn ? 'white' : 'inherit')};
  align-self: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
`;

/**
 * Message text content.
 */
export const MessageContent = styled.p`
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

/**
 * Message timestamp.
 */
export const MessageTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

// =============================================================================
// Typing Indicator
// =============================================================================

/**
 * Container for typing indicator animation.
 */
export const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: fit-content;
`;

/**
 * Animated dot for typing indicator.
 */
export const TypingDot = styled(motion.span)`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.textMuted};
  border-radius: 50%;
`;

// =============================================================================
// Chat Footer
// =============================================================================

/**
 * Chat footer with input and send button.
 */
export const ChatFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/**
 * Message input field.
 */
export const MessageInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

/**
 * Send message button.
 */
export const SendButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  };
`;

/**
 * Notice displayed when admin is offline.
 */
export const OfflineNotice = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.warning}20;
  color: ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
`;

/**
 * Props for the ConnectionStatus component.
 */
export interface ConnectionStatusProps {
  /** Whether the WebSocket is connected */
  $connected: boolean;
}

/**
 * WebSocket connection status indicator.
 */
export const ConnectionStatus = styled.div<ConnectionStatusProps>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ $connected, theme }) =>
    $connected ? theme.colors.success : theme.colors.error};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
    animation: ${({ $connected }) => ($connected ? 'none' : 'pulse 1.5s infinite')};
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  };
`;

// =============================================================================
// Tech Explanation Section
// =============================================================================

/**
 * Container for the technology explanation section.
 * Stretches to match the chat panel height (same grid row).
 */
export const TechSection = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  min-height: 100%;
`;

/**
 * Tech section title.
 */
export const TechTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

/**
 * Tech section description text.
 */
export const TechDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

/**
 * Container for the technology stack list.
 */
export const StackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

/**
 * Individual stack item container.
 */
export const StackItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

/**
 * Stack item icon.
 */
export const StackIcon = styled.span`
  font-size: 1.5rem;
`;

/**
 * Stack item information container.
 */
export const StackInfo = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0;
  };
`;
