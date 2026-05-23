// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { useTelemetry } from '@/components/Workspace/TelemetryProvider';
import { useSystemHealth, SystemHealthStatus } from '@/hooks/useSystemHealth';
import {
  ShowcaseHeaderRoot,
  ShowcaseHeaderCopy,
  ShowcaseTitle,
  ShowcaseLead,
  ShowcaseMeta,
  ShowcaseMetaRow,
  ShowcaseBadge,
  LiveSignalStatus,
  StatusDot,
} from '@/components/Workspace/LiveLabShowcaseHeader/LiveLabShowcaseHeader.style';

export const LiveLabShowcaseHeader: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { connected, tickCount } = useTelemetry();
  const { status } = useSystemHealth();
  const apiOnline: boolean = status === SystemHealthStatus.Online;

  return (
    <ShowcaseHeaderRoot role="region" aria-label={t('liveLab.title')}>
      <ShowcaseHeaderCopy>
        <ShowcaseTitle>{t('liveLab.title')}</ShowcaseTitle>
        <ShowcaseLead>{t('liveLab.subtitle')}</ShowcaseLead>
        <ShowcaseMetaRow>
          <LiveSignalStatus
            $live={connected}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <StatusDot $live={connected} aria-hidden />
            {connected
              ? t('liveLab.header.transportLive', { tick: tickCount })
              : t('liveLab.header.transportConnecting')}
          </LiveSignalStatus>
          <ShowcaseMeta>
            <StatusDot $live={apiOnline} aria-hidden />
            {apiOnline
              ? t('header.status.apiOnline')
              : t('header.status.apiChecking')}
          </ShowcaseMeta>
        </ShowcaseMetaRow>
      </ShowcaseHeaderCopy>
      <ShowcaseBadge title={t('liveLab.header.badgeTooltip')}>
        {t('liveLab.header.badge')}
      </ShowcaseBadge>
    </ShowcaseHeaderRoot>
  );
};
