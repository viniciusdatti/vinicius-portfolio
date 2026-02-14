// Core
import React, { useState, useRef, useEffect } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Store
import { useChatStore } from '../../store';

// Styles
import { fadeInUp } from '../../styles/animations';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PageSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

// Chat Styles
const ChatContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 500px;
`;

const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StatusBadge = styled.span<{ $online: boolean }>`
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
  }
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IntroForm = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  justify-content: center;
`;

const IntroTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  text-align: center;
`;

const IntroDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const StartButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-top: ${({ theme }) => theme.spacing.md};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const Message = styled(motion.div)<{ $isOwn: boolean }>`
  max-width: 80%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ $isOwn, theme }) =>
    $isOwn ? theme.colors.primary : theme.colors.backgroundSecondary};
  color: ${({ $isOwn }) => ($isOwn ? 'white' : 'inherit')};
  align-self: ${({ $isOwn }) => ($isOwn ? 'flex-end' : 'flex-start')};
`;

const MessageContent = styled.p`
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const MessageTime = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: fit-content;
`;

const TypingDot = styled(motion.span)`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.textMuted};
  border-radius: 50%;
`;

const ChatFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const MessageInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const SendButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const OfflineNotice = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.warning}20;
  color: ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-align: center;
`;

// Tech Explanation Styles
const TechSection = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const TechTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TechDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const StackList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StackItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const StackIcon = styled.span`
  font-size: 1.5rem;
`;

const StackInfo = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.textMuted};
    margin: 0;
  }
`;

const LiveLab: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState<'intro' | 'chat'>('intro');
  const [visitorName, setVisitorName] = useState('');
  const [visitorCompany, setVisitorCompany] = useState('');
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isAdminOnline,
    isTyping,
    addMessage,
  } = useChatStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleStartChat = () => {
    // Add welcome message
    addMessage({
      id: Date.now(),
      content: t('liveLab.chat.intro.description'),
      sender_type: 'admin',
      is_read: true,
      created_at: new Date().toISOString(),
    });
    setStep('chat');
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      addMessage({
        id: Date.now(),
        content: inputValue,
        sender_type: 'visitor',
        is_read: false,
        created_at: new Date().toISOString(),
      });
      setInputValue('');

      // Simulate response (remove when WebSocket is implemented)
      setTimeout(() => {
        addMessage({
          id: Date.now() + 1,
          content: 'Obrigado pela mensagem! Este é um demo - o chat real será implementado com WebSocket.',
          sender_type: 'admin',
          is_read: true,
          created_at: new Date().toISOString(),
        });
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder={t('liveLab.chat.intro.namePlaceholder')}
                  />
                </InputGroup>

                <InputGroup>
                  <Label>{t('liveLab.chat.intro.company')} ({t('common.optional')})</Label>
                  <Input
                    value={visitorCompany}
                    onChange={(e) => setVisitorCompany(e.target.value)}
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
                    $isOwn={msg.sender_type === 'visitor'}
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
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('liveLab.chat.placeholder')}
                  maxLength={1000}
                />
                <SendButton
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
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

export default LiveLab;
