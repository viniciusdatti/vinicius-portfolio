// Core
import React, { useEffect, useRef } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { SensorStatus, TELEMETRY_EVENT_LOG_MAX, type SensorReading } from '@/types/telemetry';

// Components
import { formatClockTime, resolveI18nKeyOrFallback } from '@/lib/i18nDisplay';
import { telemetryMicroSnapTransition } from '@/styles/animations';
import { useTelemetry } from '@/components/workspace/TelemetryProvider';
import { MonitorTelemetryField } from '@/components/atmosphere/MonitorTelemetryField';
import { TelemetryMetricSnap } from '@/components/workspace/TelemetryMonitor/TelemetryMetricSnap';
import { OperationalKpiStrip } from '@/components/workspace/TelemetryMonitor/OperationalKpiStrip';
import { TelemetryTrendChart } from '@/components/workspace/TelemetryMonitor/TelemetryTrendChart';
import { SensorSparkline } from '@/components/workspace/TelemetryMonitor/SensorSparkline';
import {
  MonitorRoot,
  MonitorHeader,
  MonitorHeaderGroup,
  MonitorTitle,
  MonitorStatus,
  MonitorToolbar,
  ToolbarSep,
  StatusDot,
  MonitorBody,
  MonitorChartPane,
  MonitorSensorsPane,
  MonitorGrid,
  SensorCard,
  SensorCardInner,
  SensorHeader,
  SensorStatusBadge,
  SensorLabel,
  SensorValueRow,
  SensorValue,
  SensorUnit,
  ThresholdBar,
  ThresholdFill,
  ThresholdCritMarker,
  ThresholdLimit,
  EventLogRoot,
  EventLogHeader,
  EventLogTitle,
  EventLogTick,
  EventLogScroll,
  EventLogLine,
  EventLogPrefix,
  EventLogTime,
  ConnectingState,
} from '@/components/workspace/TelemetryMonitor/TelemetryMonitor.style';

/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

const resolveSensorLabel = (
  reading: SensorReading,
  translate: (key: string) => string,
): string => resolveI18nKeyOrFallback(
  `liveLab.monitor.sensors.${reading.id}`,
  reading.label,
  translate,
);

const resolveSensorStatusLabel = (
  status: SensorStatus,
  translate: (key: string) => string,
): string => resolveI18nKeyOrFallback(
  `liveLab.monitor.statusLabels.${status}`,
  status,
  translate,
);

const calcPct = (r: SensorReading): number => {
  const range = r.threshold_critical * 1.1;
  return Math.min((r.value / range) * 100, 100);
};

const critMarkerPct = (r: SensorReading): number => {
  const range = r.threshold_critical * 1.1;
  return (r.threshold_critical / range) * 100;
};

const logPrefix = (type: 'info' | 'warn' | 'critical'): string => {
  if (type === 'critical') return 'CRT';
  if (type === 'warn') return 'WRN';
  return 'INF';
};

const formatReading = (value: number): string => value.toFixed(2);

/* -------------------------------------------------------
 * Sub-components
 * ----------------------------------------------------- */

function Sensor({
  reading: r,
  index,
}: {
  reading: SensorReading;
  index: number;
}): React.ReactElement {
  const { t } = useTranslation();
  const { history } = useTelemetry();
  const samples = history[r.id] ?? [];
  const sensorLabel: string = resolveSensorLabel(r, t);
  const statusLabel: string = resolveSensorStatusLabel(r.status, t);

  return (
    <SensorCard
      $status={r.status}
      $sweepDelay={index * 1.4}
      aria-label={`${sensorLabel}, ${formatReading(r.value)} ${r.unit}, ${statusLabel}`}
    >
      <SensorCardInner>
        <SensorHeader>
          <SensorLabel>{sensorLabel}</SensorLabel>
          <SensorStatusBadge $status={r.status}>{statusLabel}</SensorStatusBadge>
        </SensorHeader>
        <SensorValueRow>
          <TelemetryMetricSnap snapKey={r.value}>
            <SensorValue $status={r.status}>
              {formatReading(r.value)}
            </SensorValue>
          </TelemetryMetricSnap>
          <SensorUnit>{r.unit}</SensorUnit>
        </SensorValueRow>
        <SensorSparkline values={samples} status={r.status} />
        <ThresholdBar>
          <ThresholdFill
            $status={r.status}
            animate={{ width: `${calcPct(r)}%` }}
            transition={telemetryMicroSnapTransition}
          />
          <ThresholdCritMarker $pct={critMarkerPct(r)} aria-hidden />
        </ThresholdBar>
        <ThresholdLimit>
          {t('liveLab.monitor.critLimit', {
            value: r.threshold_critical,
            unit: r.unit,
          })}
        </ThresholdLimit>
      </SensorCardInner>
    </SensorCard>
  );
}

/* -------------------------------------------------------
 * Main component
 * ----------------------------------------------------- */

export function TelemetryMonitor(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const {
    connected, readings, history, eventLog, tickCount,
  } = useTelemetry();
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = 0;
    }
  }, [eventLog.length]);

  return (
    <MonitorRoot>
      <MonitorTelemetryField />
      <MonitorHeader>
        <MonitorHeaderGroup>
          <MonitorTitle>
            {t('liveLab.monitor.title')}
          </MonitorTitle>
          <MonitorToolbar>
            <span>{t('liveLab.monitor.window')}</span>
            <ToolbarSep />
            <span>{t('liveLab.monitor.samples', { count: 30 })}</span>
          </MonitorToolbar>
        </MonitorHeaderGroup>
        <MonitorStatus
          $connected={connected}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <StatusDot $connected={connected} aria-hidden />
          {connected
            ? t('liveLab.monitor.live')
            : t('liveLab.monitor.connecting')}
        </MonitorStatus>
      </MonitorHeader>

      <OperationalKpiStrip
        readings={readings}
        tickCount={tickCount}
        connected={connected}
      />

      {readings.length === 0 ? (
        <ConnectingState>
          <StatusDot $connected={false} aria-hidden />
          {t('liveLab.monitor.waitingData')}
        </ConnectingState>
      ) : (
        <MonitorBody>
          <MonitorChartPane>
            <TelemetryTrendChart
              readings={readings}
              history={history}
              title={t('liveLab.monitor.trendChart')}
            />
          </MonitorChartPane>
          <MonitorSensorsPane>
            <MonitorGrid>
              {readings.map((r, index) => (
                <Sensor key={r.id} reading={r} index={index} />
              ))}
            </MonitorGrid>
          </MonitorSensorsPane>
        </MonitorBody>
      )}

      <EventLogRoot>
        <EventLogHeader>
          <EventLogTitle>
            {t('liveLab.monitor.eventLog')}
          </EventLogTitle>
          <EventLogTick>
            {eventLog.length}
            /
            {TELEMETRY_EVENT_LOG_MAX}
            {' · '}
            {t('liveLab.monitor.tick')}
            {' '}
            <TelemetryMetricSnap snapKey={tickCount}>
              #
              {tickCount}
            </TelemetryMetricSnap>
          </EventLogTick>
        </EventLogHeader>
        <EventLogScroll
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {eventLog.map((entry, idx) => (
            <EventLogLine
              key={`${entry.ts}-${entry.message}`}
              $type={entry.type}
              $isLatest={idx === 0 && connected}
            >
              <EventLogTime>{formatClockTime(entry.ts, i18n.language)}</EventLogTime>
              <EventLogPrefix $type={entry.type}>
                [
                {logPrefix(entry.type)}
                ]
              </EventLogPrefix>
              <span>{entry.message}</span>
            </EventLogLine>
          ))}
          {eventLog.length === 0 && (
            <EventLogLine $type="info">
              <EventLogTime>—</EventLogTime>
              <EventLogPrefix $type="info">[INF]</EventLogPrefix>
              <span>{t('liveLab.monitor.noEvents')}</span>
            </EventLogLine>
          )}
        </EventLogScroll>
      </EventLogRoot>
    </MonitorRoot>
  );
}
