// Core
import React, {
  lazy,
  Suspense,
  useEffect,
  useRef,
} from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import {
  SensorStatus,
  TELEMETRY_EVENT_LOG_MAX,
  type SensorReading,
} from '@/types/telemetry';
import {
  TelemetryEventLogPlacement,
  type TelemetryMonitorProps,
} from '@/components/Workspace/TelemetryMonitor/TelemetryMonitor.types';

// Components
import { formatClockTime, resolveI18nKeyOrFallback } from '@/lib/i18nDisplay';
import { telemetryMicroSnapTransition } from '@/styles/animations';
import { useTelemetry } from '@/components/Workspace/TelemetryProvider';
import { MonitorTelemetryField } from '@/components/Atmosphere/MonitorTelemetryField';
import { TelemetryValueFlash } from '@/components/Workspace/TelemetryMonitor/TelemetryValueFlash';
import { OperationalKpiStrip } from '@/components/Workspace/TelemetryMonitor/OperationalKpiStrip';
import { SensorSparkline } from '@/components/Workspace/TelemetryMonitor/SensorSparkline';
import {
  MonitorRoot,
  MonitorHeader,
  MonitorHeaderGroup,
  MonitorTitle,
  MonitorStatus,
  MonitorToolbar,
  ToolbarSep,
  StatusDot,
  MonitorMainGrid,
  ChartPaneFallback,
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
} from '@/components/Workspace/TelemetryMonitor/TelemetryMonitor.style';

const TelemetryTrendChart = lazy(
  () => import('@/components/Workspace/TelemetryMonitor/TelemetryTrendChart').then(
    (module) => ({ default: module.TelemetryTrendChart }),
  ),
);

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

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
  const range: number = r.threshold_critical * 1.1;
  return Math.min((r.value / range) * 100, 100);
};

const critMarkerPct = (r: SensorReading): number => {
  const range: number = r.threshold_critical * 1.1;
  return (r.threshold_critical / range) * 100;
};

const logPrefix = (type: 'info' | 'warn' | 'critical'): string => {
  if (type === 'critical') return 'CRT';
  if (type === 'warn') return 'WRN';
  return 'INF';
};

const formatReading = (value: number): string => value.toFixed(2);

// =================================================================================================
// ============================================ SUB-COMPONENTS =====================================
// =================================================================================================

interface SensorProps {
  reading: SensorReading;
  index: number;
}

const Sensor: React.FC<SensorProps> = ({
  reading: r,
  index,
}): React.ReactElement => {
  const { t } = useTranslation();
  const { history } = useTelemetry();
  const samples: number[] = history[r.id] ?? [];
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
          <TelemetryValueFlash cellId={`sensor-${r.id}`} valueKey={r.value}>
            <SensorValue $status={r.status}>
              {formatReading(r.value)}
            </SensorValue>
          </TelemetryValueFlash>
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
};

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

export const TelemetryMonitor: React.FC<TelemetryMonitorProps> = ({
  eventLogPlacement = TelemetryEventLogPlacement.Embedded,
}): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const {
    connected,
    readings,
    history,
    eventLog,
    tickCount,
  } = useTelemetry();
  const logRef = useRef<HTMLDivElement>(null);
  const showMonitor: boolean = eventLogPlacement !== TelemetryEventLogPlacement.Flow;
  const showEventLog: boolean = eventLogPlacement !== TelemetryEventLogPlacement.None;

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = 0;
    }
  }, [eventLog.length]);

  if (!showMonitor && showEventLog) {
    return (
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
            <TelemetryValueFlash cellId="tick-counter" valueKey={tickCount}>
              #
              {tickCount}
            </TelemetryValueFlash>
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
    );
  }

  return (
    <MonitorRoot>
      {showMonitor ? <MonitorTelemetryField /> : null}
      {showMonitor ? (
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
      ) : null}

      {showMonitor ? (
        <OperationalKpiStrip
          readings={readings}
          tickCount={tickCount}
          connected={connected}
        />
      ) : null}

      {showMonitor && readings.length === 0 ? (
        <ConnectingState>
          <StatusDot $connected={false} aria-hidden />
          {t('liveLab.monitor.waitingData')}
        </ConnectingState>
      ) : null}

      {showMonitor && readings.length > 0 ? (
        <MonitorMainGrid>
          <MonitorChartPane>
            <Suspense fallback={<ChartPaneFallback aria-hidden />}>
              <TelemetryTrendChart
                readings={readings}
                history={history}
                title={t('liveLab.monitor.trendChart')}
              />
            </Suspense>
          </MonitorChartPane>
          <MonitorSensorsPane>
            <MonitorGrid>
              {readings.map((r, index) => (
                <Sensor key={r.id} reading={r} index={index} />
              ))}
            </MonitorGrid>
          </MonitorSensorsPane>
          {showEventLog && eventLogPlacement === TelemetryEventLogPlacement.Embedded ? (
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
                  <TelemetryValueFlash cellId="tick-counter" valueKey={tickCount}>
                    #
                    {tickCount}
                  </TelemetryValueFlash>
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
          ) : null}
        </MonitorMainGrid>
      ) : null}
    </MonitorRoot>
  );
};
