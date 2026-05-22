/**
 * @fileoverview Admin Chat component for real-time visitor communication.
 * Provides a dashboard interface for managing and responding to chat sessions.
 */

// Core
import React, { useState, useRef, useEffect } from 'react';

// Libraries
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Types
import { ChatMessageSenderType } from '../../../types';

// Components
import { messageEnter } from '../../../styles/animations';
import { useAdminChat } from '../../../hooks/useAdminChat';
import { scrollToContainerEnd } from '../../../utils/scrollToContainerEnd';
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
export function Chat(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const receivedEvents = useAdminChatEvents();
  const dateLocale: string = i18n.language;

  /* ***********************************************************************************************
  **************************************** INITIAL STATE *******************************************
  *********************************************************************************************** */

  const initialState: ChatState = {
    inputValue: '',
    eventsOpen: false,
  };

  const [state, setState] = useState<ChatState>(initialState);

  /* ***********************************************************************************************
  ****************************************** EFFECTS ***********************************************
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
    scrollToContainerEnd(messagesEndRef.current, 'smooth');
  }, [activeMessages]);

  /* ***********************************************************************************************
  ****************************************** METHODS ***********************************************
  *********************************************************************************************** */

  /**
   * Handles sending a message to the active session.
   */
  const handleSend = (): void => {
    if (state.inputValue.trim()) {
      sendMessage(state.inputValue);
      setState((prev: ChatState) => ({ ...prev, inputValue: '' }));
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
    setState((prev: ChatState) => ({ ...prev, inputValue: e.target.value }));
    if (e.target.value) {
      sendTyping();
    }
  };

  /**
   * Formats a date string to time format (HH:MM).
   */
  const formatTime = (dateString: string): string => new Date(dateString).toLocaleTimeString(
    dateLocale,
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );

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

    return date.toLocaleDateString(dateLocale, {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /* ***********************************************************************************************
  *************************************** COMPONENT HANDLING ***************************************
  *********************************************************************************************** */

  return (
    <PageContainer>
      <Header>
        <BackLink to="/admin">{t('admin.chat.back')}</BackLink>
        <HeaderTitle>
          <Title>
            💬
            {t('admin.chat.title')}
          </Title>
          <ConnectionBadge $connected={isConnected}>
            {isConnected ? t('admin.chat.connected') : t('admin.chat.disconnected')}
          </ConnectionBadge>
        </HeaderTitle>
        <div />
      </Header>

      <Content>
        <Sidebar>
          <SidebarHeader>
            <SidebarTitle>
              {t('admin.chat.conversations', { count: sessions.length })}
            </SidebarTitle>
          </SidebarHeader>
          <SessionList>
            {sessions.length === 0 ? (
              <EmptyState>
                <p>
                  🔔
                  {t('admin.chat.emptyTitle')}
                </p>
                <EmptyStateDescription>
                  {t('admin.chat.emptyDescription')}
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
                      👤
                      {' '}
                      {session.visitor_name}
                    </VisitorName>
                    <SessionTime>{formatDate(session.started_at)}</SessionTime>
                  </SessionInfo>
                  {session.visitor_company && (
                    <SessionCompanyLine>
                      🏢
                      {' '}
                      {session.visitor_company}
                    </SessionCompanyLine>
                  )}
                  <SessionMeta>
                    {(() => {
                      if (session.is_typing) {
                        return <TypingBadge>{t('admin.chat.typing')}</TypingBadge>;
                      }
                      if (session.last_message) {
                        return <LastMessage>{session.last_message}</LastMessage>;
                      }
                      return (
                        <LastMessage>{t('admin.chat.newConversation')}</LastMessage>
                      );
                    })()}
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
              onClick={() => setState((prev: ChatState) => ({
                ...prev,
                eventsOpen: !prev.eventsOpen,
              }))}
              aria-expanded={state.eventsOpen}
            >
              {t('admin.chat.eventsToggle', { count: receivedEvents.length })}
            </EventsToggle>
            {state.eventsOpen && (
              <EventsList>
                {receivedEvents.length === 0 ? (
                  <EventsListEmpty>{t('admin.chat.eventsEmpty')}</EventsListEmpty>
                ) : (
                  [...receivedEvents].reverse().map((ev) => (
                    <EventItem key={`${ev.at}-${ev.type}-${JSON.stringify(ev.data)}`}>
                      <span data-type={ev.type}>{ev.type}</span>
                      <span data-time={ev.at}>
                        {new Date(ev.at).toLocaleTimeString(dateLocale)}
                      </span>
                      {ev.type === 'new_message'
                        && typeof ev.data === 'object'
                        && ev.data !== null
                        && 'content' in ev.data && (
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
                  <h3>
                    👤
                    {activeSession.visitor_name}
                  </h3>
                  <span>
                    {activeSession.visitor_company && `🏢 ${activeSession.visitor_company} • `}
                    {t('admin.chat.startedAt', {
                      time: formatTime(activeSession.started_at),
                    })}
                  </span>
                </ChatHeaderInfo>
                <CloseButton onClick={() => closeSession(activeSession.session_id)}>
                  {t('admin.chat.closeSession')}
                </CloseButton>
              </ChatHeader>

              <MessagesContainer>
                <AnimatePresence>
                  {activeMessages.map((msg) => (
                    <Message
                      key={msg.id}
                      $isAdmin={msg.sender_type === ChatMessageSenderType.Admin}
                      variants={messageEnter}
                      initial="initial"
                      animate="animate"
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
                  value={state.inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={t('admin.chat.placeholder')}
                  maxLength={5000}
                />
                <SendButton
                  onClick={handleSend}
                  disabled={!state.inputValue.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('admin.chat.send')}
                </SendButton>
              </ChatFooter>
            </>
          ) : (
            <NoChatSelected>
              <h3>
                💬
                {t('admin.chat.noChatTitle')}
              </h3>
              <p>{t('admin.chat.noChatDescription')}</p>
              <NoChatSelectedDescription>
                {t('admin.chat.noChatHint')}
              </NoChatSelectedDescription>
            </NoChatSelected>
          )}
        </ChatArea>
      </Content>
    </PageContainer>
  );
}
