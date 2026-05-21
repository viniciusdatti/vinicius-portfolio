// Core
import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { useSystemHealth, SystemHealthStatus } from '../../../hooks/useSystemHealth';
import { useChatStore } from '../../../store';
import {
  PresenceStrip,
  PresenceInner,
  PresenceLead,
  PresencePills,
  PresencePill,
  PresenceLink,
} from './RealtimePresence.style';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Subtle realtime signal on the home page — engineering proof without full console UI.
 */
export const RealtimePresence: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { status } = useSystemHealth();
  const isConnected: boolean = useChatStore((s) => s.isConnected);

  const apiTone: 'ok' | 'idle' | 'warn' = useMemo(() => {
    if (status === SystemHealthStatus.Online) {
      return 'ok';
    }
    if (status === SystemHealthStatus.Offline) {
      return 'warn';
    }
    return 'idle';
  }, [status]);

  const apiLabel: string =
    status === SystemHealthStatus.Online
      ? t('home.realtime.apiLive')
      : status === SystemHealthStatus.Offline
        ? t('home.realtime.apiAway')
        : t('home.realtime.apiSync');

  const transportTone: 'ok' | 'idle' | 'warn' = isConnected ? 'ok' : 'idle';
  const transportLabel: string = isConnected
    ? t('home.realtime.channelReady')
    : t('home.realtime.channelIdle');

  return (
    <PresenceStrip>
      <PresenceInner>
        <PresenceLead>{t('home.realtime.lead')}</PresenceLead>
        <PresencePills>
          <PresencePill $tone={apiTone}>{apiLabel}</PresencePill>
          <PresencePill $tone={transportTone}>{transportLabel}</PresencePill>
          <PresenceLink to="/live-lab">{t('home.realtime.openLab')}</PresenceLink>
        </PresencePills>
      </PresenceInner>
    </PresenceStrip>
  );
};
