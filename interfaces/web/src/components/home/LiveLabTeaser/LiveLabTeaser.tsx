// Core
import React, { useEffect, useMemo, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useSystemHealth, SystemHealthStatus } from '../../../hooks/useSystemHealth';

// Component
import {
  TeaserRoot,
  TeaserMetrics,
  TeaserMetric,
  TeaserMetricValue,
  TeaserMetricLabel,
  TeaserContextList,
  TeaserContextItem,
  TeaserActivity,
  TeaserActivityDot,
} from './LiveLabTeaser.style';

const CONTEXT_KEYS: string[] = [
  'home.liveLabPreview.context.transport',
  'home.liveLabPreview.context.persistence',
  'home.liveLabPreview.context.operational',
];

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

/**
 * Contextual Live Lab preview on home — real health signals, no decorative mock console.
 */
export const LiveLabTeaser = (): React.ReactElement => {
  const { t } = useTranslation();
  const { status, version } = useSystemHealth();
  const [tick, setTick] = useState<number>(0);

  useEffect(() => {
    const id: ReturnType<typeof setInterval> = setInterval(() => {
      setTick((prev: number) => prev + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const apiLive: boolean = status === SystemHealthStatus.Online;

  const transportValue: string = useMemo(() => {
    if (status === SystemHealthStatus.Online) {
      return t('home.liveLabPreview.metrics.transportLive');
    }
    if (status === SystemHealthStatus.Offline) {
      return t('home.liveLabPreview.metrics.transportIdle');
    }
    return t('home.liveLabPreview.metrics.transportSync');
  }, [status, t]);

  const activityLabel: string = useMemo(() => {
    const phase: number = tick % 3;
    if (phase === 0) {
      return t('home.liveLabPreview.activity.sync');
    }
    if (phase === 1 && version) {
      return t('home.liveLabPreview.activity.build', { version });
    }
    return t('home.liveLabPreview.activity.ready');
  }, [tick, version, t]);

  return (
    <TeaserRoot>
      <TeaserActivity>
        <TeaserActivityDot $live={apiLive} aria-hidden />
        <span>{activityLabel}</span>
      </TeaserActivity>
      <TeaserMetrics>
        <TeaserMetric>
          <TeaserMetricValue>{transportValue}</TeaserMetricValue>
          <TeaserMetricLabel>{t('home.liveLabPreview.metrics.transportLabel')}</TeaserMetricLabel>
        </TeaserMetric>
        <TeaserMetric>
          <TeaserMetricValue>{t('home.liveLabPreview.metrics.stackValue')}</TeaserMetricValue>
          <TeaserMetricLabel>{t('home.liveLabPreview.metrics.stackLabel')}</TeaserMetricLabel>
        </TeaserMetric>
      </TeaserMetrics>
      <TeaserContextList>
        {CONTEXT_KEYS.map((key: string) => (
          <TeaserContextItem key={key}>{t(key)}</TeaserContextItem>
        ))}
      </TeaserContextList>
    </TeaserRoot>
  );
};
