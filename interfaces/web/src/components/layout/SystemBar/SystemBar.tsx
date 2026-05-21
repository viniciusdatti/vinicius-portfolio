// Core
import React, { useMemo } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Types
import { WorkspaceModule } from '../../../types';

// Components
import { useSystemHealth, SystemHealthStatus } from '../../../hooks/useSystemHealth';
import { useChatStore } from '../../../store';
import { formatSessionLabel } from '../../../utils/workspaceModule';
import { useWorkspaceStore } from '../../../store';
import { ThemeToggle } from '../../common/ThemeToggle';
import { LanguageToggle } from '../../LanguageToggle';
import {
  SystemBarRoot,
  SystemBarInner,
  SystemBarCluster,
  SystemId,
  SystemDivider,
  SystemModule,
  StatusCluster,
  StatusPill,
  StatusDot,
  SystemBarActions,
} from './SystemBar.style';

const LIVE_LAB_MODULE_LABEL_KEYS: Record<WorkspaceModule, string> = {
  [WorkspaceModule.Identity]: 'system.modules.profile',
  [WorkspaceModule.Cases]: 'system.modules.cases',
  [WorkspaceModule.Capabilities]: 'system.modules.capabilities',
  [WorkspaceModule.Channel]: 'system.modules.channel',
};

const PORTFOLIO_MODULE_KEYS: Record<string, string> = {
  '/': 'system.modules.home',
  '/about': 'system.modules.about',
  '/projects': 'system.modules.cases',
  '/skills': 'system.modules.capabilities',
  '/contact': 'system.modules.contact',
  '/live-lab': 'system.modules.liveLab',
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const SystemBar: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const location = useLocation();
  const { status, version } = useSystemHealth();

  const isLiveLab: boolean = location.pathname === '/live-lab';
  const isConnected: boolean = useChatStore((s) => s.isConnected);
  const sessionId: string | null = useChatStore((s) => s.sessionId);
  const isAdminOnline: boolean = useChatStore((s) => s.isAdminOnline);

  const activeLiveLabModule: WorkspaceModule = useWorkspaceStore(
    (s) => s.activeLiveLabModule
  );

  const moduleKey: string = useMemo((): string => {
    if (isLiveLab) {
      return LIVE_LAB_MODULE_LABEL_KEYS[activeLiveLabModule];
    }
    return PORTFOLIO_MODULE_KEYS[location.pathname] ?? 'system.modules.portfolio';
  }, [isLiveLab, location.pathname, activeLiveLabModule]);

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
    <SystemBarRoot role="status" aria-live="polite">
      <SystemBarInner>
        <SystemBarCluster>
          <SystemId>{t('system.id')}</SystemId>
          <SystemDivider aria-hidden>·</SystemDivider>
          <SystemModule>{t(moduleKey)}</SystemModule>
        </SystemBarCluster>
        <StatusCluster>
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
          ) : (
            <StatusPill $tone="idle">{t('system.status.latencyLive')}</StatusPill>
          )}
        </StatusCluster>
        <SystemBarActions>
          <LanguageToggle />
          <ThemeToggle />
        </SystemBarActions>
      </SystemBarInner>
    </SystemBarRoot>
  );
};
