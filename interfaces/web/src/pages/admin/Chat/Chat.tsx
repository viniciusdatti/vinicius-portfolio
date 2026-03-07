/**
 * @fileoverview Admin Chat component for real-time visitor communication.
 * Provides a dashboard interface for managing and responding to chat sessions.
 */

// Core
import React, { useState, useRef, useEffect } from 'react';

// Libraries
import { AnimatePresence } from 'framer-motion';

// Types
import { ChatMessageSenderType } from '../../../types';

// Components
import { useAdminChat } from '../../../hooks/useAdminChat';
import { useAdminChatEvents } from '../../../hooks/useAdminChatEvents';
import {
  PageContainer,
  Header,
  BackLink,
  HeaderTitle,
  Title,
  ConnectionBadge,
  Content,
  Sidebar,
  SidebarHeader,
  SidebarTitle,
  SessionList,
  SessionItem,
  SessionInfo,
  VisitorName,
  SessionTime,
  SessionMeta,
  LastMessage,
  UnreadBadge,
  TypingBadge,
  EmptyState,
  EmptyStateDescription,
  ChatArea,
  ChatHeader,
  ChatHeaderInfo,
  CloseButton,
  MessagesContainer,
  Message,
  MessageContent,
  MessageTime,
  ChatFooter,
  MessageInput,
  SendButton,
  NoChatSelected,
  NoChatSelectedDescription,
  EventsSection,
  EventsToggle,
  EventsList,
  EventItem,
  EventItemContent,
  EventsListEmpty,
  SessionCompanyLine,
} from './Chat.style';

/** Local UI state for the Chat view. */
interface ChatState {
  inputValue: string;
  eventsOpen: boolean;
}

/**
 * Admin Chat component for managing real-time conversations with visitors.
 * Displays a list of active chat sessions and provides an interface for responding.
 */
export const Chat: React.FC = (): React.ReactElement => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const receivedEvents = useAdminChatEvents();

  /* ***********************************************************************************************
   **************************************** INITIAL STATE *******************************************
   *********************************************************************************************** */

  const initialState: ChatState = {
    inputValue: '',
    eventsOpen: false,
  };

  const [inputValue, setInputValue] = useState<string>(initialState.inputValue);
  const [eventsOpen, setEventsOpen] = useState<boolean>(initialState.eventsOpen);

  /* ***********************************************************************************************
   ****************************************** EFFECTS **********************************************
   *********************************************************************************************** */
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

  /**
   * Scrolls to the bottom of the messages container when messages change.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  /* ***********************************************************************************************
   ****************************************** METHODS ***********************************************
   *********************************************************************************************** */

  /**
   * Handles sending a message to the active session.
   */
  const handleSend = (): void => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  /**
   * Handles keyboard events for the message input.
   * Sends message on Enter key press (without Shift).
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /**
   * Handles input changes and triggers typing indicator.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    if (e.target.value) {
      sendTyping();
    }
  };

  /**
   * Formats a date string to time format (HH:MM).
   */
  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Formats a date string to a relative format.
   * Shows time only for today, otherwise shows date and time.
   */
  const formatDate = (dateString: string): string => {
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

  /* ***********************************************************************************************
   *************************************** COMPONENT HANDLING **************************************
   *********************************************************************************************** */

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
                <EmptyStateDescription>
                  As conversas aparecerão aqui quando visitantes iniciarem um chat no Live Lab.
                </EmptyStateDescription>
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
                    <SessionCompanyLine>
                      🏢 {session.visitor_company}
                    </SessionCompanyLine>
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
          <EventsSection>
            <EventsToggle
              type="button"
              onClick={() => setEventsOpen((o) => !o)}
              aria-expanded={eventsOpen}
            >
              Eventos recebidos ({receivedEvents.length})
            </EventsToggle>
            {eventsOpen && (
              <EventsList>
                {receivedEvents.length === 0 ? (
                  <EventsListEmpty>
                    Nenhum evento ainda. Eventos do socket aparecem aqui com a conexão ativa.
                  </EventsListEmpty>
                ) : (
                  [...receivedEvents].reverse().map((ev, i) => (
                    <EventItem key={`${ev.at}-${i}`}>
                      <span data-type={ev.type}>{ev.type}</span>
                      <span data-time={ev.at}>
                        {new Date(ev.at).toLocaleTimeString()}
                      </span>
                      {ev.type === 'new_message' && typeof ev.data === 'object' && ev.data !== null && 'content' in ev.data && (
                        <EventItemContent>
                          {(ev.data as { content?: string }).content}
                        </EventItemContent>
                      )}
                    </EventItem>
                  ))
                )}
              </EventsList>
            )}
          </EventsSection>
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
                      $isAdmin={msg.sender_type === ChatMessageSenderType.Admin}
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
              <NoChatSelectedDescription>
                Você receberá notificações quando novos visitantes iniciarem conversas.
              </NoChatSelectedDescription>
            </NoChatSelected>
          )}
        </ChatArea>
      </Content>
    </PageContainer>
  );
};
