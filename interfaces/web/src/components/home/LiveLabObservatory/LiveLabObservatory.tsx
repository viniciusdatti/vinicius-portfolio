// Core
import React, { useEffect, useMemo, useState } from 'react';

// Libraries
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { formatClockTime } from '@/lib/i18nDisplay';

// Types
import { SensorStatus } from '@/types/telemetry';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useSystemHealth, SystemHealthStatus } from '@/hooks/useSystemHealth';

// Components
import { LiveLabObservatoryLogLine } from './LiveLabObservatory.types';
import { LiveLabObservatoryAnimatedValue } from './LiveLabObservatoryAnimatedValue';
import { LiveLabObservatorySparkline } from './LiveLabObservatorySparkline';
import {
  buildObservatorySparkline,
  getObservatorySensors,
  LOG_MESSAGE_KEYS,
  sparkPathFromValues,
} from './LiveLabObservatory.helpers';
import {
  ChartLabel,
  ChartPane,
  LogLine,
  LogPane,
  ObservatoryBody,
  ObservatoryChrome,
  ObservatoryFooter,
  ObservatoryLive,
  ObservatoryRoot,
  ObservatoryTitle,
  OpsMetric,
  SensorPanel,
  SensorTile,
  SensorTileLabel,
  SidePanel,
  SparklineSvg,
} from './LiveLabObservatory.style';

export const LiveLabObservatory: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { status } = useSystemHealth();
  const isApiLive: boolean = status === SystemHealthStatus.Online;
  const reduced: boolean = usePrefersReducedMotion();
  const [logIndex, setLogIndex] = useState<number>(0);
  const [tick, setTick] = useState<number>(0);
  const sensors = useMemo(() => getObservatorySensors(t), [t]);

  const logs: LiveLabObservatoryLogLine[] = useMemo(() => {
    const items: LiveLabObservatoryLogLine[] = [];
    for (let i: number = 0; i < 4; i += 1) {
      const idx: number = (logIndex + i) % LOG_MESSAGE_KEYS.length;
      const messageKey: string = LOG_MESSAGE_KEYS[idx];
      const message: string = t(messageKey);
      const now: Date = new Date();
      now.setSeconds(now.getSeconds() - i * 2);
      items.push({
        time: formatClockTime(now.getTime(), i18n.language),
        msg: message,
        type: messageKey.includes('threshold') ? 'warn' : 'info',
      });
    }
    return items;
  }, [logIndex, i18n.language, t]);

  useEffect(() => {
    if (reduced) return undefined;
    const logId: number = window.setInterval(
      () => setLogIndex((n: number) => (n + 1) % LOG_MESSAGE_KEYS.length),
      3200,
    );
    const tickId: number = window.setInterval(() => setTick((n: number) => n + 1), 1000);
    return (): void => {
      window.clearInterval(logId);
      window.clearInterval(tickId);
    };
  }, [reduced]);

  const aggregateSpark: number[] = useMemo(() => buildObservatorySparkline(1.4, 32), []);

  const strokeForStatus = (sensorStatus: SensorStatus): string => (
    sensorStatus === SensorStatus.Warn ? theme.colors.warning : theme.colors.success
  );

  return (
    <ObservatoryRoot>
      <ObservatoryChrome>
        <ObservatoryTitle>{t('home.liveLabPreview.observatoryTitle')}</ObservatoryTitle>
        <ObservatoryLive $live={isApiLive}>
          {isApiLive
            ? t('home.liveLabPreview.badge')
            : t('home.hero.liveMicro.apiSync')}
        </ObservatoryLive>
      </ObservatoryChrome>
      <ObservatoryBody>
        <SensorPanel>
          {sensors.map((s, i) => (
            <SensorTile key={s.id} $status={s.status}>
              <SensorTileLabel>{s.label}</SensorTileLabel>
              <LiveLabObservatoryAnimatedValue
                base={s.base}
                variance={s.variance}
                unit={s.unit}
                status={s.status}
              />
              <LiveLabObservatorySparkline
                seed={i + s.base}
                strokeColor={strokeForStatus(s.status)}
              />
            </SensorTile>
          ))}
        </SensorPanel>
        <SidePanel>
          <ChartPane>
            <ChartLabel>{t('home.liveLabPreview.trendLabel')}</ChartLabel>
            <SparklineSvg viewBox="0 0 200 64" aria-hidden>
              <defs>
                <linearGradient id="obs-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,229,255,0.25)" />
                  <stop offset="100%" stopColor="rgba(0,229,255,0)" />
                </linearGradient>
              </defs>
              <motion.path
                d={`${sparkPathFromValues(aggregateSpark, 200, 64)} L200,64 L0,64 Z`}
                fill="url(#obs-fill)"
                stroke="none"
              />
              <motion.path
                d={sparkPathFromValues(aggregateSpark, 200, 64)}
                fill="none"
                stroke="rgba(0,229,255,0.9)"
                strokeWidth="1.5"
              />
            </SparklineSvg>
          </ChartPane>
          <LogPane>
            {logs.map((line: LiveLabObservatoryLogLine) => (
              <LogLine key={`${line.time}-${line.msg}`} $type={line.type}>
                <time>{line.time}</time>
                <span>{line.msg}</span>
              </LogLine>
            ))}
          </LogPane>
        </SidePanel>
      </ObservatoryBody>
      <ObservatoryFooter>
        <OpsMetric>
          {t('home.liveLabPreview.footer.transport')}
          {' · '}
          <strong>live</strong>
        </OpsMetric>
        <OpsMetric>
          {t('home.liveLabPreview.footer.tick')}
          {' '}
          <strong>
            #
            {tick}
          </strong>
        </OpsMetric>
        <OpsMetric>
          {t('home.liveLabPreview.footer.sensors')}
          {' '}
          <strong>4</strong>
        </OpsMetric>
      </ObservatoryFooter>
    </ObservatoryRoot>
  );
};
