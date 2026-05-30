// Core
import React, { useMemo } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Hooks
import { useSystemHealth } from '../../../hooks/useSystemHealth';

// Layout
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

// Components
import { LanguageToggle } from '../../LanguageToggle';

// Types
import { OperationalStatusTone } from '../../../types/telemetry';

// Common
import { ThemeToggle } from '../../common/ThemeToggle';

// Lib
import {
  resolveSystemHealthLabel,
  resolveSystemHealthTone,
} from '../../../lib/systemHealth';

// Store
import { useTelemetryStore } from '../../../store/telemetryStore';

const PORTFOLIO_MODULE_KEYS: Record<string, string> = {
  '/': 'system.modules.home',
  '/about': 'system.modules.about',
  '/projects': 'system.modules.cases',
  '/skills': 'system.modules.capabilities',
  '/contact': 'system.modules.contact',
  '/live-lab': 'system.modules.liveLab',
};

export const SystemBar = (): React.ReactElement => {
  const { t } = useTranslation();
  const location = useLocation();
  const { status, version } = useSystemHealth();

  const isLiveLab: boolean = location.pathname === '/live-lab';
  const telemetryConnected: boolean = useTelemetryStore((s) => s.connected);
  const telemetryTick: number = useTelemetryStore((s) => s.tickCount);

  const moduleKey: string = useMemo((): string => {
    if (isLiveLab) {
      return 'system.modules.liveLab';
    }
    return PORTFOLIO_MODULE_KEYS[location.pathname] ?? 'system.modules.portfolio';
  }, [isLiveLab, location.pathname]);

  const apiTone: OperationalStatusTone = useMemo(
    (): OperationalStatusTone => resolveSystemHealthTone(status),
    [status],
  );

  const apiLabel: string = useMemo(
    (): string => resolveSystemHealthLabel(status, t, 'systemBar'),
    [status, t],
  );

  const wsTone: OperationalStatusTone = telemetryConnected
    ? OperationalStatusTone.Ok
    : OperationalStatusTone.Warn;
  const wsLabel: string = telemetryConnected
    ? t('system.status.telemetryLive')
    : t('system.status.telemetryIdle');

  const buildLabel: string = version
    ? t('system.status.build', { version })
    : t('system.status.buildUnknown');

  const tickLabel: string | null = isLiveLab && telemetryConnected
    ? t('system.status.telemetryTick', { tick: telemetryTick })
    : null;

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
              {tickLabel ? (
                <StatusPill $tone={OperationalStatusTone.Idle}>{tickLabel}</StatusPill>
              ) : null}
              <StatusPill $tone={OperationalStatusTone.Idle}>{buildLabel}</StatusPill>
            </>
          ) : (
            <StatusPill $tone={OperationalStatusTone.Idle}>
              {t('system.status.latencyLive')}
            </StatusPill>
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
