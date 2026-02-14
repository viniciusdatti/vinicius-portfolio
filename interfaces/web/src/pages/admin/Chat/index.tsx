// Core
import React, { useState, useRef, useEffect } from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Hooks
import { useAdminChat } from '../../../hooks/useAdminChat';

// ============================================
// Styled Components
// ============================================

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
`;

const ConnectionBadge = styled.span<{ $connected: boolean }>`
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
  }
`;

const Content = styled.main`
  display: grid;
  grid-template-columns: 320px 1fr;
  height: calc(100vh - 73px);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SidebarTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SessionList = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
`;

const SessionItem = styled.button<{ $active: boolean }>`
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
  }
`;

const SessionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const VisitorName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const SessionTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const SessionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LastMessage = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
`;

const UnreadBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const TypingBadge = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.success};
  font-style: italic;
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatHeaderInfo = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const CloseButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.error}20;
  color: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.error}30;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Message = styled(motion.div)<{ $isAdmin: boolean }>`
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

const MessageContent = styled.p`
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  white-space: pre-wrap;
  word-break: break-word;
`;

const MessageTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

const ChatFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const MessageInput = styled.input`
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
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const SendButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const NoChatSelected = styled.div`
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
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  }
`;

// ============================================
// Component
// ============================================

const AdminChat: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    sessions,
    activeSessionId,
    activeSession,
    activeMessages,
    isConnected,
    joinSession,
    sendMessage,
    sendTyping,
    closeSession,
  } = useAdminChat();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      sendTyping();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return formatTime(dateString);
    }
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <PageContainer>
      <Header>
        <BackLink to="/admin">← Voltar ao Dashboard</BackLink>
        <HeaderTitle>
          <Title>💬 Chat Admin</Title>
          <ConnectionBadge $connected={isConnected}>
            {isConnected ? 'Conectado' : 'Desconectado'}
          </ConnectionBadge>
        </HeaderTitle>
        <div />
      </Header>

      <Content>
        <Sidebar>
          <SidebarHeader>
            <SidebarTitle>
              Conversas ({sessions.length})
            </SidebarTitle>
          </SidebarHeader>
          <SessionList>
            {sessions.length === 0 ? (
              <EmptyState>
                <p>🔔 Nenhuma conversa ativa</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  As conversas aparecerão aqui quando visitantes iniciarem um chat no Live Lab.
                </p>
              </EmptyState>
            ) : (
              sessions.map((session) => (
                <SessionItem
                  key={session.session_id}
                  $active={activeSessionId === session.session_id}
                  onClick={() => joinSession(session.session_id)}
                >
                  <SessionInfo>
                    <VisitorName>
                      👤 {session.visitor_name}
                    </VisitorName>
                    <SessionTime>{formatDate(session.started_at)}</SessionTime>
                  </SessionInfo>
                  {session.visitor_company && (
                    <LastMessage style={{ marginBottom: '4px' }}>
                      🏢 {session.visitor_company}
                    </LastMessage>
                  )}
                  <SessionMeta>
                    {session.is_typing ? (
                      <TypingBadge>digitando...</TypingBadge>
                    ) : session.last_message ? (
                      <LastMessage>{session.last_message}</LastMessage>
                    ) : (
                      <LastMessage>Nova conversa</LastMessage>
                    )}
                    {session.unread_count > 0 && (
                      <UnreadBadge>{session.unread_count}</UnreadBadge>
                    )}
                  </SessionMeta>
                </SessionItem>
              ))
            )}
          </SessionList>
        </Sidebar>

        <ChatArea>
          {activeSession ? (
            <>
              <ChatHeader>
                <ChatHeaderInfo>
                  <h3>👤 {activeSession.visitor_name}</h3>
                  <span>
                    {activeSession.visitor_company && `🏢 ${activeSession.visitor_company} • `}
                    Iniciado às {formatTime(activeSession.started_at)}
                  </span>
                </ChatHeaderInfo>
                <CloseButton onClick={() => closeSession(activeSession.session_id)}>
                  Encerrar conversa
                </CloseButton>
              </ChatHeader>

              <MessagesContainer>
                <AnimatePresence>
                  {activeMessages.map((msg) => (
                    <Message
                      key={msg.id}
                      $isAdmin={msg.sender_type === 'admin'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MessageContent>{msg.content}</MessageContent>
                      <MessageTime>{formatTime(msg.created_at)}</MessageTime>
                    </Message>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </MessagesContainer>

              <ChatFooter>
                <MessageInput
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite sua resposta..."
                  maxLength={5000}
                />
                <SendButton
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enviar
                </SendButton>
              </ChatFooter>
            </>
          ) : (
            <NoChatSelected>
              <h3>💬 Chat em Tempo Real</h3>
              <p>Selecione uma conversa na lista para começar a responder.</p>
              <p style={{ fontSize: '0.875rem' }}>
                Você receberá notificações quando novos visitantes iniciarem conversas.
              </p>
            </NoChatSelected>
          )}
        </ChatArea>
      </Content>
    </PageContainer>
  );
};

export default AdminChat;
