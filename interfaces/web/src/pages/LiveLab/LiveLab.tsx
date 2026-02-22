/**
 * @fileoverview LiveLab page component.
 * Provides a real-time chat interface for visitors to communicate with the admin,
 * along with a technology stack explanation section.
 */

// Core
import React, { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent, FC } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

// Types
import { ChatMessageSenderType } from '../../types';

// Hooks
import { useChat } from '../../hooks/useChat';

// Styles
import { fadeInUp } from '../../styles/animations';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  ContentGrid,
  ChatContainer,
  ChatHeader,
  ChatTitle,
  StatusBadge,
  ChatBody,
  IntroForm,
  IntroTitle,
  IntroDescription,
  InputGroup,
  Label,
  Input,
  StartButton,
  Message,
  MessageContent,
  MessageTime,
  TypingIndicator,
  TypingDot,
  ChatFooter,
  MessageInput,
  SendButton,
  OfflineNotice,
  ConnectionStatus,
  TechSection,
  TechTitle,
  TechDescription,
  StackList,
  StackItem,
  StackIcon,
  StackInfo,
} from './LiveLab.style';

// =============================================================================
// Types
// =============================================================================

/**
 * Chat step state type.
 */
type ChatStep = 'intro' | 'chat';

// =============================================================================
// Component
// =============================================================================

/**
 * LiveLab page component that provides a real-time chat interface
 * for visitors to communicate with the portfolio owner.
 *
 * Features:
 * - WebSocket-based real-time messaging
 * - Visitor name and company collection
 * - Typing indicators
 * - Online/offline status display
 * - Technology stack explanation section
 *
 * @returns The LiveLab page component
 */
export const LiveLab: FC = () => {
  const { t } = useTranslation();

  // Form state
  const [step, setStep] = useState<ChatStep>('intro');
  const [visitorName, setVisitorName] = useState<string>('');
  const [visitorCompany, setVisitorCompany] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WebSocket chat hook
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

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Handles starting a new chat session.
   */
  const handleStartChat = (): void => {
    startSession(visitorName || 'Visitante', visitorCompany || undefined);
    setStep('chat');
  };

  /**
   * Handles sending a message.
   */
  const handleSend = (): void => {
    if (inputValue.trim() && sessionId) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  /**
   * Handles key press events in the message input.
   * Sends message on Enter key (without Shift).
   *
   * @param e - The keyboard event
   */
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /**
   * Handles input changes and sends typing indicator.
   *
   * @param e - The change event
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    if (sessionId && e.target.value) {
      sendTyping();
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {t('liveLab.title')}
        </PageTitle>
        <PageSubtitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {t('liveLab.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <ContentGrid>
        <ChatContainer
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <ChatHeader>
            <ChatTitle>
              💬 {t('liveLab.chat.title')}
              <ConnectionStatus $connected={isConnected}>
                {isConnected ? 'Conectado' : 'Conectando...'}
              </ConnectionStatus>
            </ChatTitle>
            <StatusBadge $online={isAdminOnline}>
              {isAdminOnline ? t('liveLab.chat.online') : t('liveLab.chat.offline')}
            </StatusBadge>
          </ChatHeader>

          <AnimatePresence mode="wait">
            {step === 'intro' ? (
              <IntroForm
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IntroTitle>{t('liveLab.chat.intro.title')}</IntroTitle>
                <IntroDescription>
                  {t('liveLab.chat.intro.description')}
                </IntroDescription>

                <InputGroup>
                  <Label>{t('liveLab.chat.intro.name')}</Label>
                  <Input
                    value={visitorName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setVisitorName(e.target.value)}
                    placeholder={t('liveLab.chat.intro.namePlaceholder')}
                  />
                </InputGroup>

                <InputGroup>
                  <Label>{t('liveLab.chat.intro.company')} ({t('common.optional')})</Label>
                  <Input
                    value={visitorCompany}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setVisitorCompany(e.target.value)}
                    placeholder={t('liveLab.chat.intro.companyPlaceholder')}
                  />
                </InputGroup>

                <StartButton
                  onClick={handleStartChat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('liveLab.chat.intro.start')}
                </StartButton>
              </IntroForm>
            ) : (
              <ChatBody key="chat">
                {messages.map((msg, index) => (
                  <Message
                    key={msg.id || index}
                    $isOwn={msg.sender_type === ChatMessageSenderType.Visitor}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <MessageContent>{msg.content}</MessageContent>
                    <MessageTime>
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </MessageTime>
                  </Message>
                ))}

                {isTyping && (
                  <TypingIndicator>
                    <TypingDot
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <TypingDot
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <TypingDot
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </TypingIndicator>
                )}

                <div ref={messagesEndRef} />
              </ChatBody>
            )}
          </AnimatePresence>

          {step === 'chat' && (
            <>
              {!isAdminOnline && (
                <OfflineNotice>
                  {t('liveLab.chat.offlineNotice')}
                </OfflineNotice>
              )}
              <ChatFooter>
                <MessageInput
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={t('liveLab.chat.placeholder')}
                  maxLength={1000}
                  disabled={!sessionId}
                />
                <SendButton
                  onClick={handleSend}
                  disabled={!inputValue.trim() || !sessionId || !isConnected}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('liveLab.chat.send')}
                </SendButton>
              </ChatFooter>
            </>
          )}
        </ChatContainer>

        <TechSection
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <TechTitle>{t('liveLab.techExplanation.title')}</TechTitle>
          <TechDescription>
            {t('liveLab.techExplanation.description')}
          </TechDescription>

          <StackList>
            <StackItem>
              <StackIcon>⚛️</StackIcon>
              <StackInfo>
                <h4>Frontend</h4>
                <p>{t('liveLab.techExplanation.stack.frontend')}</p>
              </StackInfo>
            </StackItem>
            <StackItem>
              <StackIcon>🐍</StackIcon>
              <StackInfo>
                <h4>Backend</h4>
                <p>{t('liveLab.techExplanation.stack.backend')}</p>
              </StackInfo>
            </StackItem>
            <StackItem>
              <StackIcon>🗄️</StackIcon>
              <StackInfo>
                <h4>Database</h4>
                <p>{t('liveLab.techExplanation.stack.database')}</p>
              </StackInfo>
            </StackItem>
          </StackList>
        </TechSection>
      </ContentGrid>
    </PageContainer>
  );
};
