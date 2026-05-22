// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { useTelemetry } from '@/components/workspace/TelemetryProvider';
import {
  ShowcaseHeaderRoot,
  ShowcaseHeaderCopy,
  ShowcaseTitle,
  ShowcaseLead,
  ShowcaseMeta,
  ShowcaseBadge,
  StatusDot,
} from '@/components/workspace/LiveLabShowcaseHeader/LiveLabShowcaseHeader.style';

export function LiveLabShowcaseHeader(): React.ReactElement {
  const { t } = useTranslation();
  const { connected, tickCount } = useTelemetry();

  return (
    <ShowcaseHeaderRoot role="region" aria-label={t('liveLab.title')}>
      <ShowcaseHeaderCopy>
        <ShowcaseTitle>{t('liveLab.title')}</ShowcaseTitle>
        <ShowcaseLead>{t('liveLab.subtitle')}</ShowcaseLead>
        <ShowcaseMeta>
          <StatusDot $live={connected} aria-hidden />
          {connected
            ? t('liveLab.header.transportLive', { tick: tickCount })
            : t('liveLab.header.transportConnecting')}
        </ShowcaseMeta>
      </ShowcaseHeaderCopy>
      <ShowcaseBadge title={t('liveLab.header.badgeTooltip')}>
        {t('liveLab.header.badge')}
      </ShowcaseBadge>
    </ShowcaseHeaderRoot>
  );
}
