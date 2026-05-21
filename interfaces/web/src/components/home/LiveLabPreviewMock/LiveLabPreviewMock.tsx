// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { useSystemHealth, SystemHealthStatus } from '../../../hooks/useSystemHealth';
import {
  PreviewRoot,
  ChatMock,
  ChatMockHeader,
  ChatMockDot,
  ChatMockBody,
  MockBubble,
  EventMock,
  EventMockTitle,
  EventMockList,
  EventMockItem,
  PreviewScan,
} from './LiveLabPreviewMock.style';

const MOCK_EVENT_KEYS: string[] = [
  'home.liveLabPreview.mock.events.transport',
  'home.liveLabPreview.mock.events.channel',
  'home.liveLabPreview.mock.events.presence',
  'home.liveLabPreview.mock.events.ready',
];

const MOCK_MESSAGE_KEYS: string[] = [
  'home.liveLabPreview.mock.messages.welcome',
  'home.liveLabPreview.mock.messages.visitor',
  'home.liveLabPreview.mock.messages.reply',
];

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Decorative Live Lab UI preview for the home page — density without mounting the full channel.
 */
export const LiveLabPreviewMock: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { status } = useSystemHealth();
  const apiLive: boolean = status === SystemHealthStatus.Online;

  return (
    <PreviewRoot aria-hidden>
      <ChatMock>
        <PreviewScan />
        <ChatMockHeader>
          <span>{t('home.liveLabPreview.mock.channelTitle')}</span>
          <ChatMockDot $live={apiLive} />
        </ChatMockHeader>
        <ChatMockBody>
          {MOCK_MESSAGE_KEYS.map((key: string) => (
            <MockBubble
              key={key}
              $own={key === 'home.liveLabPreview.mock.messages.visitor'}
            >
              {t(key)}
            </MockBubble>
          ))}
        </ChatMockBody>
      </ChatMock>
      <EventMock>
        <EventMockTitle>{t('home.liveLabPreview.mock.logTitle')}</EventMockTitle>
        <EventMockList>
          {MOCK_EVENT_KEYS.map((key: string) => (
            <EventMockItem key={key}>{t(key)}</EventMockItem>
          ))}
        </EventMockList>
      </EventMock>
    </PreviewRoot>
  );
};
