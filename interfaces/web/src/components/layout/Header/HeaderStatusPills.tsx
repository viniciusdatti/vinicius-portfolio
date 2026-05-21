// Core
import React, { useMemo } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import { useSystemHealth, SystemHealthStatus } from '../../../hooks/useSystemHealth';
import { useChatStore, useWorkspaceStore } from '../../../store';
import { formatSessionLabel } from '../../../utils/workspaceModule';
import {
  StatusCluster,
  StatusPill,
  StatusDot,
} from '../SystemBar/SystemBar.style';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Compact realtime status — lives inside the single portfolio header (not a second bar).
 */
export const HeaderStatusPills: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const location = useLocation();
  const { status, version } = useSystemHealth();
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
      return t('system.status.apiOnline');
    }
    if (status === SystemHealthStatus.Offline) {
      return t('system.status.apiOffline');
    }
    return t('system.status.apiChecking');
  }, [status, t]);

  const wsTone: 'ok' | 'warn' | 'idle' = isConnected ? 'ok' : 'warn';
  const wsLabel: string = isConnected
    ? t('system.status.wsLive')
    : t('system.status.wsIdle');

  const presenceTone: 'ok' | 'idle' = isAdminOnline ? 'ok' : 'idle';
  const presenceLabel: string = isAdminOnline
    ? t('system.status.presenceOnline')
    : t('system.status.presenceOffline');

  const sessionLabel: string | null = formatSessionLabel(sessionId);
  const sessionText: string = sessionLabel
    ? t('system.status.session', { id: sessionLabel })
    : t('system.status.sessionNone');

  const buildLabel: string = version
    ? t('system.status.build', { version })
    : t('system.status.buildUnknown');

  return (
    <StatusCluster role="status" aria-live="polite">
      <StatusPill $tone={apiTone}>
        <StatusDot $tone={apiTone} aria-hidden />
        {apiLabel}
      </StatusPill>
      {isLiveLab ? (
        <>
          <StatusPill $tone={wsTone}>
            <StatusDot $tone={wsTone} aria-hidden />
            {wsLabel}
          </StatusPill>
          <StatusPill $tone={presenceTone}>
            <StatusDot $tone={presenceTone} aria-hidden />
            {presenceLabel}
          </StatusPill>
          <StatusPill $tone="idle">{sessionText}</StatusPill>
          <StatusPill $tone="idle">{buildLabel}</StatusPill>
        </>
      ) : null}
    </StatusCluster>
  );
};
