// Core
import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

// Types
import { ChatMessageSenderType } from '@/types';
import {
  LiveChannelStep,
  initialLiveChannelState,
  type LiveChannelState,
} from '@/components/LiveChannel/LiveChannel.types';

// Components
import { useChat } from '@/hooks/useChat';
import { useWorkspaceStore, useSystemEventStore } from '@/store';
import { scrollToContainerEnd } from '@/utils/scrollToContainerEnd';
import { messageEnter, typingDot } from '@/styles/animations';
import {
  SystemEventLevel,
  SystemEventType,
} from '@/types/system-events';
import { EventLog } from '@/components/LiveChannel/EventLog';
import {
  ChannelSurface,
  ChannelMain,
  ContextStrip,
  ChatHeader,
  ChatHeaderLead,
  ChatTitle,
  ChatMetaRow,
  ConnectionStatus,
  StatusBadge,
  IntroForm,
  IntroTitle,
  IntroDescription,
  InputGroup,
  Label,
  Input,
  StartButton,
  ChatBody,
  Message,
  MessageContent,
  MessageTime,
  TypingIndicator,
  TypingDot,
  OfflineNotice,
  ChatFooter,
  MessageInput,
  SendButton,
} from '@/components/LiveChannel/LiveChannel.style';

/* ***********************************************************************************************
 **************************************** INITIAL STATE *******************************************
 *********************************************************************************************** */

/* ***********************************************************************************************
 ****************************************** METHODS ***********************************************
 *********************************************************************************************** */

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Persistent realtime channel — core product surface (WebSocket visitor chat).
 */
export function LiveChannel(): React.ReactElement {
  const { t } = useTranslation();
  const [state, setState] = useState<LiveChannelState>(initialLiveChannelState);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queuedContextDraftRef = useRef<string | null>(null);

  const {
    sessionId,
    messages,
    isConnected,
    isAdminOnline,
    isTyping,
    startSession,
    sendMessage,
    sendTyping,
  } = useChat();

  const activeCaseTitle: string | null = useWorkspaceStore((s) => s.activeCaseTitle);
  const pendingChannelDraft: string | null = useWorkspaceStore(
    (s) => s.pendingChannelDraft,
  );
  const setPendingChannelDraft = useWorkspaceStore((s) => s.setPendingChannelDraft);
  const pushEvent = useSystemEventStore((s) => s.push);

  const isReconnecting: boolean = state.wasConnected && !isConnected;

  const applyContextDraft = useCallback(
    (draft: string): void => {
      if (sessionId && isConnected) {
        sendMessage(draft);
        pushEvent(
          SystemEventType.ContextInject,
          SystemEventLevel.Info,
          'workspace.events.contextInject',
          { title: activeCaseTitle ?? '' },
        );
        return;
      }
      if (state.step === LiveChannelStep.Chat) {
        setState((prev: LiveChannelState) => ({ ...prev, inputValue: draft }));
        return;
      }
      queuedContextDraftRef.current = draft;
      if (activeCaseTitle) {
        setState((prev: LiveChannelState) => ({
          ...prev,
          visitorCompany: prev.visitorCompany || activeCaseTitle,
        }));
      }
    },
    [
      sessionId,
      isConnected,
      state.step,
      activeCaseTitle,
      sendMessage,
      pushEvent,
    ],
  );

  useEffect(() => {
    scrollToContainerEnd(messagesEndRef.current, 'smooth');
  }, [messages]);

  useEffect(() => {
    if (sessionId) {
      setState((prev: LiveChannelState) => ({
        ...prev,
        step: LiveChannelStep.Chat,
      }));
    }
  }, [sessionId]);

  useEffect(() => {
    if (isConnected) {
      setState((prev: LiveChannelState) => ({ ...prev, wasConnected: true }));
    }
  }, [isConnected]);

  useEffect(() => {
    if (!pendingChannelDraft) {
      return;
    }
    const draft: string = pendingChannelDraft;
    setPendingChannelDraft(null);
    applyContextDraft(draft);
  }, [pendingChannelDraft, setPendingChannelDraft, applyContextDraft]);

  useEffect(() => {
    const queued: string | null = queuedContextDraftRef.current;
    if (!queued || !sessionId || !isConnected) {
      return;
    }
    queuedContextDraftRef.current = null;
    sendMessage(queued);
    pushEvent(
      SystemEventType.ContextInject,
      SystemEventLevel.Info,
      'workspace.events.contextInject',
      { title: activeCaseTitle ?? '' },
    );
  }, [sessionId, isConnected, activeCaseTitle, sendMessage, pushEvent]);

  const handleStartChat = (): void => {
    startSession(state.visitorName || 'Visitor', state.visitorCompany || undefined);
    setState((prev: LiveChannelState) => ({
      ...prev,
      step: LiveChannelStep.Chat,
    }));
    pushEvent(
      SystemEventType.SessionOpen,
      SystemEventLevel.Info,
      'workspace.events.sessionRequested',
    );
  };

  const handleSend = (): void => {
    if (state.inputValue.trim() && sessionId) {
      sendMessage(state.inputValue);
      pushEvent(
        SystemEventType.MessageOut,
        SystemEventLevel.Info,
        'workspace.events.messageOut',
      );
      setState((prev: LiveChannelState) => ({ ...prev, inputValue: '' }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prev: LiveChannelState) => ({
      ...prev,
      inputValue: e.target.value,
    }));
    if (sessionId && e.target.value) {
      sendTyping();
    }
  };

  const isSynchronized: boolean = isConnected && sessionId != null;

  const getConnectionLabel = (): string => {
    if (isSynchronized) return t('system.status.wsSynchronized');
    if (isConnected) return t('system.status.wsLive');
    if (isReconnecting) return t('system.status.wsReconnecting');
    return t('system.status.wsConnecting');
  };

  const connectionLabel: string = getConnectionLabel();

  return (
    <ChannelSurface aria-label={t('workspace.channel.title')}>
      {activeCaseTitle ? (
        <ContextStrip>
          {t('workspace.events.contextActive', { title: activeCaseTitle })}
        </ContextStrip>
      ) : null}
      <ChannelMain>
        <ChatHeader>
          <ChatHeaderLead>
            <ChatTitle>{t('workspace.channel.title')}</ChatTitle>
            <ChatMetaRow>
              <ConnectionStatus
                $connected={isConnected}
                $reconnecting={isReconnecting}
                $synchronized={isSynchronized}
              >
                {connectionLabel}
              </ConnectionStatus>
              <StatusBadge $online={isAdminOnline}>
                {isAdminOnline
                  ? t('system.status.presenceOnline')
                  : t('system.status.presenceOffline')}
              </StatusBadge>
            </ChatMetaRow>
          </ChatHeaderLead>
        </ChatHeader>

        <AnimatePresence mode="wait">
          {state.step === LiveChannelStep.Intro ? (
            <IntroForm
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <IntroTitle>{t('liveLab.chat.intro.title')}</IntroTitle>
              <IntroDescription>
                {t('liveLab.chat.intro.description')}
              </IntroDescription>
              <InputGroup>
                <Label>{t('liveLab.chat.intro.name')}</Label>
                <Input
                  value={state.visitorName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setState((prev: LiveChannelState) => ({
                      ...prev,
                      visitorName: e.target.value,
                    }));
                  }}
                  placeholder={t('liveLab.chat.intro.namePlaceholder')}
                />
              </InputGroup>
              <InputGroup>
                <Label>
                  {t('liveLab.chat.intro.company')}
                  {' '}
                  (
                  {t('common.optional')}
                  )
                </Label>
                <Input
                  value={state.visitorCompany}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setState((prev: LiveChannelState) => ({
                      ...prev,
                      visitorCompany: e.target.value,
                    }));
                  }}
                  placeholder={t('liveLab.chat.intro.companyPlaceholder')}
                />
              </InputGroup>
              <StartButton type="button" onClick={handleStartChat}>
                {t('liveLab.chat.intro.start')}
              </StartButton>
            </IntroForm>
          ) : (
            <ChatBody key="chat">
              {messages.map((msg, index: number) => (
                <Message
                  key={msg.id || index}
                  $isOwn={msg.sender_type === ChatMessageSenderType.Visitor}
                  variants={messageEnter}
                  initial="initial"
                  animate="animate"
                >
                  <MessageContent>{msg.content}</MessageContent>
                  <MessageTime>
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </MessageTime>
                </Message>
              ))}
              {isTyping ? (
                <TypingIndicator aria-live="polite">
                  <TypingDot variants={typingDot} animate="animate" />
                  <TypingDot
                    variants={typingDot}
                    animate="animate"
                    transition={{ delay: 0.15 }}
                  />
                  <TypingDot
                    variants={typingDot}
                    animate="animate"
                    transition={{ delay: 0.3 }}
                  />
                </TypingIndicator>
              ) : null}
              <div ref={messagesEndRef} />
            </ChatBody>
          )}
        </AnimatePresence>

        {state.step === LiveChannelStep.Chat ? (
          <>
            {!isAdminOnline ? (
              <OfflineNotice>{t('liveLab.chat.offlineNotice')}</OfflineNotice>
            ) : null}
            <ChatFooter>
              <MessageInput
                value={state.inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder={t('liveLab.chat.placeholder')}
                maxLength={1000}
                disabled={!sessionId}
              />
              <SendButton
                type="button"
                onClick={handleSend}
                disabled={!state.inputValue.trim() || !sessionId || !isConnected}
              >
                {t('liveLab.chat.send')}
              </SendButton>
            </ChatFooter>
          </>
        ) : null}
      </ChannelMain>
      <EventLog />
    </ChannelSurface>
  );
}
