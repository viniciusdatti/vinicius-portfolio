// Core
import React from 'react';

// Libraries
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

// Styles
import {
  ChartLabel,
  ChartPane,
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
} from '../LiveLabObservatory.style';

// Types
import {
  LiveLabObservatoryLogLine,
  LiveLabObservatorySensorDef,
  LiveLabObservatoryViewProps,
} from '../LiveLabObservatory.types';
import { SensorStatus } from '../../../../types/telemetry';

// LiveLabObservatory
import { LiveLabObservatoryAnimatedValue } from '../LiveLabObservatoryAnimatedValue';
import { LiveLabObservatoryLogRow } from '../LiveLabObservatoryLogRow';
import { LiveLabObservatorySparkline } from '../LiveLabObservatorySparkline';
import { sparkPathFromValues } from '../LiveLabObservatory.helpers';

export const LiveLabObservatoryView: React.FC<LiveLabObservatoryViewProps> = ({
  apiLabel,
  isApiLive,
  transportModeLabel,
  sensors,
  logs,
  tick,
  aggregateSpark,
}): React.ReactElement => {
  const { t } = useTranslation();
  const theme = useTheme();

  const strokeForStatus = (sensorStatus: SensorStatus): string => (
    sensorStatus === SensorStatus.Warn ? theme.colors.warning : theme.colors.success
  );

  return (
    <ObservatoryRoot>
      <ObservatoryChrome>
        <ObservatoryTitle>{t('home.liveLabPreview.observatoryTitle')}</ObservatoryTitle>
        <ObservatoryLive $live={isApiLive}>
          {apiLabel}
        </ObservatoryLive>
      </ObservatoryChrome>
      <ObservatoryBody>
        <SensorPanel>
          {sensors.map((s: LiveLabObservatorySensorDef, i: number) => (
            <SensorTile key={s.id} $status={s.status}>
              <SensorTileLabel>{s.label}</SensorTileLabel>
              <LiveLabObservatoryAnimatedValue
                base={s.base}
                variance={s.variance}
                unit={s.unit}
                status={s.status}
                liveValue={s.liveValue}
              />
              <LiveLabObservatorySparkline
                seed={i + s.base}
                strokeColor={strokeForStatus(s.status)}
                values={s.sparklineValues}
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
              <LiveLabObservatoryLogRow
                key={`${line.time}-${line.msg}`}
                line={line}
              />
            ))}
          </LogPane>
        </SidePanel>
      </ObservatoryBody>
      <ObservatoryFooter>
        <OpsMetric>
          {t('home.liveLabPreview.footer.transport')}
          {' · '}
          <strong>{transportModeLabel}</strong>
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
          <strong>{sensors.length}</strong>
        </OpsMetric>
      </ObservatoryFooter>
    </ObservatoryRoot>
  );
};
