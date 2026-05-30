// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { useScrollMotion } from '../../../hooks/useScrollMotion';
import { useSystemHealth } from '../../../hooks/useSystemHealth';

// Styles
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
} from './LiveLabShowcaseHeader.style';

// Lib
import { resolveSystemHealthIsLive } from '../../../lib/systemHealth';

// Workspace
import { useTelemetry } from '../TelemetryProvider';

export const LiveLabShowcaseHeader: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { connected, tickCount } = useTelemetry();
  const { status } = useSystemHealth();
  const { stagger, item } = useScrollMotion();
  const reduced: boolean = usePrefersReducedMotion();
  const apiOnline: boolean = resolveSystemHealthIsLive(status);
  const motionInitial: string = reduced ? 'visible' : 'hidden';

  return (
    <ShowcaseHeaderRoot
      role="region"
      aria-label={t('liveLab.title')}
      variants={stagger}
      initial={motionInitial}
      animate="visible"
    >
      <ShowcaseHeaderCopy>
        <ShowcaseTitle variants={item}>{t('liveLab.title')}</ShowcaseTitle>
        <ShowcaseLead variants={item}>{t('liveLab.subtitle')}</ShowcaseLead>
        <ShowcaseMetaRow variants={item}>
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
      <ShowcaseBadge
        variants={item}
        title={t('liveLab.header.badgeTooltip')}
      >
        {t('liveLab.header.badge')}
      </ShowcaseBadge>
    </ShowcaseHeaderRoot>
  );
};
