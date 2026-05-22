// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { useTelemetry } from '@/components/workspace/TelemetryProvider';
import { useSystemHealth, SystemHealthStatus } from '@/hooks/useSystemHealth';
import {
  ShowcaseHeaderRoot,
  ShowcaseHeaderCopy,
  ShowcaseTitle,
  ShowcaseLead,
  ShowcaseMeta,
  ShowcaseMetaMuted,
  ShowcaseMetaRow,
  ShowcaseBadge,
  StatusDot,
} from '@/components/workspace/LiveLabShowcaseHeader/LiveLabShowcaseHeader.style';

export function LiveLabShowcaseHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { connected, tickCount } = useTelemetry();
  const { status } = useSystemHealth();
  const apiOnline = status === SystemHealthStatus.Online;

  return (
    <ShowcaseHeaderRoot role="region" aria-label={t('liveLab.title')}>
      <ShowcaseHeaderCopy>
        <ShowcaseTitle>{t('liveLab.title')}</ShowcaseTitle>
        <ShowcaseLead>{t('liveLab.subtitle')}</ShowcaseLead>
        <ShowcaseMetaRow>
          {connected ? (
            <ShowcaseMeta>
              <StatusDot $live aria-hidden />
              {t('liveLab.header.transportLive', { tick: tickCount })}
            </ShowcaseMeta>
          ) : (
            <ShowcaseMetaMuted>
              <StatusDot $live={false} aria-hidden />
              {t('liveLab.header.transportConnecting')}
            </ShowcaseMetaMuted>
          )}
          <ShowcaseMetaMuted>
            <StatusDot $live={apiOnline} aria-hidden />
            {apiOnline
              ? t('header.status.apiOnline')
              : t('header.status.apiChecking')}
          </ShowcaseMetaMuted>
        </ShowcaseMetaRow>
      </ShowcaseHeaderCopy>
      <ShowcaseBadge title={t('liveLab.header.badgeTooltip')}>
        {t('liveLab.header.badge')}
      </ShowcaseBadge>
    </ShowcaseHeaderRoot>
  );
}
