/**
 * @fileoverview Styled components for the Admin Chat page.
 * Contains all visual styling for the real-time chat interface.
 */

// Libraries
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// ============================================
// Interfaces
// ============================================

/**
 * Props for the ConnectionBadge component.
 */
export interface ConnectionBadgeProps {
  /** Whether the WebSocket connection is active */
  $connected: boolean;
}

/**
 * Props for the SessionItem component.
 */
export interface SessionItemProps {
  /** Whether this session is currently selected */
  $active: boolean;
}

/**
 * Props for the Message component.
 */
export interface MessageProps {
  /** Whether the message was sent by an admin */
  $isAdmin: boolean;
}

// ============================================
// Layout Components
// ============================================

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const Content = styled.main`
  display: grid;
  grid-template-columns: 320px 1fr;
  height: calc(100vh - 73px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  };
`;

// ============================================
// Header Components
// ============================================

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  };
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`;

export const ConnectionBadge = styled.span<ConnectionBadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  background-color: ${({ $connected, theme }) =>
    $connected ? theme.colors.success + '20' : theme.colors.error + '20'};
  color: ${({ $connected, theme }) =>
    $connected ? theme.colors.success : theme.colors.error};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
  };
`;

// ============================================
// Sidebar Components
// ============================================

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

export const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SidebarTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SessionList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const SessionItem = styled.button<SessionItemProps>`
  width: 100%;
  text-align: left;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primaryLight : 'transparent'};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary : 'transparent'};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primaryLight : theme.colors.surfaceHover};
  };
`;

export const SessionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const VisitorName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const SessionTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SessionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LastMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
`;

export const SessionCompanyLine = styled(LastMessage)`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const UnreadBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const TypingBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.success};
  font-style: italic;
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EmptyStateDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

// ============================================
// Chat Area Components
// ============================================

export const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatHeaderInfo = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  };

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textMuted};
  };
`;

export const CloseButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.error}20;
  color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.error}30;
  };
`;

// ============================================
// Messages Components
// ============================================

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Message = styled(motion.div)<MessageProps>`
  max-width: 70%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ $isAdmin, theme }) =>
    $isAdmin ? theme.colors.primary : theme.colors.surface};
  color: ${({ $isAdmin }) => ($isAdmin ? 'white' : 'inherit')};
  align-self: ${({ $isAdmin }) => ($isAdmin ? 'flex-end' : 'flex-start')};
  border: ${({ $isAdmin, theme }) =>
    $isAdmin ? 'none' : `1px solid ${theme.colors.border}`};
`;

export const MessageContent = styled.p`
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  white-space: pre-wrap;
  word-break: break-word;
`;

export const MessageTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

// ============================================
// Chat Footer Components
// ============================================

export const ChatFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  };

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  };
`;

export const SendButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  };

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  };
`;

// ============================================
// Empty State Components
// ============================================

export const NoChatSelected = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textMuted};
  gap: ${({ theme }) => theme.spacing.md};

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: ${({ theme }) => theme.colors.text};
  };

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  };
`;

export const NoChatSelectedDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

// ============================================
// Eventos recebidos (socket)
// ============================================

export const EventsSection = styled.div`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const EventsToggle = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  };
`;

export const EventsList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EventItem = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 2px;

  [data-type] {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  };
  [data-time] {
    opacity: 0.8;
  };
`;

export const EventItemContent = styled.span`
  font-size: 0.75rem;
  opacity: 0.9;
`;

export const EventsListEmpty = styled.p`
  padding: ${({ theme }) => theme.spacing.sm};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
