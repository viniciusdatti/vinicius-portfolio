// Core
import React, { useMemo } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import { useSystemHealth, SystemHealthStatus } from '@/hooks/useSystemHealth';
import { useChatStore } from '@/store';
import { formatSessionLabel } from '@/utils/workspaceModule';
import {
  StatusCluster,
  StatusPill,
  StatusDot,
} from '@/components/layout/SystemBar/SystemBar.style';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Header status — minimal API signal on portfolio routes; full transport chrome only in Live Lab.
 */
export function HeaderStatusPills(): React.ReactElement {
  const { t } = useTranslation();
  const location = useLocation();
  const { status } = useSystemHealth();
  const isLiveLab: boolean = location.pathname === '/live-lab';
  const isConnected: boolean = useChatStore((s) => s.isConnected);
  const sessionId: string | null = useChatStore((s) => s.sessionId);
  const isAdminOnline: boolean = useChatStore((s) => s.isAdminOnline);

  const apiTone: 'ok' | 'warn' | 'idle' = useMemo(() => {
    if (status === SystemHealthStatus.Online) {
      return 'ok';
    }
    if (status === SystemHealthStatus.Offline) {
      return 'warn';
    }
    return 'idle';
  }, [status]);

  const apiLabel: string = useMemo(() => {
    if (status === SystemHealthStatus.Online) {
      return t('header.status.apiOnline');
    }
    if (status === SystemHealthStatus.Offline) {
      return t('header.status.apiOffline');
    }
    return t('header.status.apiChecking');
  }, [status, t]);

  if (!isLiveLab) {
    return (
      <StatusCluster role="status" aria-live="polite">
        <StatusPill $tone={apiTone}>
          <StatusDot $tone={apiTone} aria-hidden />
          {apiLabel}
        </StatusPill>
      </StatusCluster>
    );
  }

  const wsTone: 'ok' | 'warn' | 'idle' = isConnected ? 'ok' : 'warn';
  const wsLabel: string = isConnected
    ? t('system.status.wsLive')
    : t('system.status.wsReconnecting');

  const presenceTone: 'ok' | 'idle' = isAdminOnline ? 'ok' : 'idle';
  const presenceLabel: string = isAdminOnline
    ? t('system.status.presenceOnline')
    : t('system.status.presenceOffline');

  const sessionLabel: string | null = formatSessionLabel(sessionId);
  const sessionText: string = sessionLabel
    ? t('system.status.session', { id: sessionLabel })
    : t('system.status.sessionNone');

  return (
    <StatusCluster role="status" aria-live="polite">
      <StatusPill $tone={apiTone}>
        <StatusDot $tone={apiTone} aria-hidden />
        {apiLabel}
      </StatusPill>
      <StatusPill $tone={wsTone}>
        <StatusDot $tone={wsTone} aria-hidden />
        {wsLabel}
      </StatusPill>
      <StatusPill $tone={presenceTone}>
        <StatusDot $tone={presenceTone} aria-hidden />
        {presenceLabel}
      </StatusPill>
      <StatusPill $tone="idle">{sessionText}</StatusPill>
    </StatusCluster>
  );
}
