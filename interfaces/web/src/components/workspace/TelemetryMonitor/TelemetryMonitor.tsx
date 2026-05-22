// Core
import React, { useEffect, useRef } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { SensorReading } from '../../../hooks/useTelemetry';

// Components
import { useTelemetry } from '../../../hooks/useTelemetry';
import {
  MonitorRoot,
  MonitorHeader,
  MonitorTitle,
  MonitorStatus,
  StatusDot,
  MonitorGrid,
  SensorCard,
  SensorLabel,
  SensorValueRow,
  SensorValue,
  SensorUnit,
  ThresholdBar,
  ThresholdFill,
  ThresholdMeta,
  ThresholdStatus,
  ThresholdLimit,
  EventLogRoot,
  EventLogHeader,
  EventLogTitle,
  EventLogTick,
  EventLogScroll,
  EventLogLine,
  EventLogTime,
  ConnectingState,
} from './TelemetryMonitor.style';

/* -------------------------------------------------------
 * Helpers
 * ----------------------------------------------------- */

const formatTime = (ts: number): string => {
  const d = new Date(ts);
  return d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const calcPct = (r: SensorReading): number => {
  const range = r.threshold_critical * 1.1;
  return Math.min((r.value / range) * 100, 100);
};

/* -------------------------------------------------------
 * Sub-components
 * ----------------------------------------------------- */

const Sensor: React.FC<{ reading: SensorReading }> = ({ reading: r }) => (
  <SensorCard $status={r.status}>
    <SensorLabel>{r.label}</SensorLabel>
    <SensorValueRow>
      <SensorValue key={r.value} $status={r.status}>{r.value}</SensorValue>
      <SensorUnit>{r.unit}</SensorUnit>
    </SensorValueRow>
    <ThresholdBar>
      <ThresholdFill $pct={calcPct(r)} $status={r.status} />
    </ThresholdBar>
    <ThresholdMeta>
      <ThresholdStatus $status={r.status}>{r.status}</ThresholdStatus>
      <ThresholdLimit>crit {r.threshold_critical}{r.unit}</ThresholdLimit>
    </ThresholdMeta>
  </SensorCard>
);

/* -------------------------------------------------------
 * Main component
 * ----------------------------------------------------- */

export const TelemetryMonitor: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { connected, readings, eventLog, tickCount } = useTelemetry();
  const logRef = useRef<HTMLDivElement>(null);

  // Auto-scroll event log to top (newest first)
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = 0;
    }
  }, [eventLog.length]);

  return (
    <MonitorRoot>
      <MonitorHeader>
        <MonitorTitle>
          {t('liveLab.monitor.title', 'Telemetry · Industrial sensors')}
        </MonitorTitle>
        <MonitorStatus $connected={connected}>
          <StatusDot $connected={connected} aria-hidden />
          {connected
            ? t('liveLab.monitor.live', 'WebSocket live')
            : t('liveLab.monitor.connecting', 'Connecting…')}
        </MonitorStatus>
      </MonitorHeader>

      {readings.length === 0 ? (
        <ConnectingState>
          <StatusDot $connected={false} aria-hidden />
          {t('liveLab.monitor.waitingData', 'Waiting for telemetry…')}
        </ConnectingState>
      ) : (
        <MonitorGrid>
          {readings.map((r) => (
            <Sensor key={r.id} reading={r} />
          ))}
        </MonitorGrid>
      )}

      <EventLogRoot>
        <EventLogHeader>
          <EventLogTitle>
            {t('liveLab.monitor.eventLog', 'Event log')}
          </EventLogTitle>
          <EventLogTick>
            {t('liveLab.monitor.tick', 'tick')} #{tickCount}
          </EventLogTick>
        </EventLogHeader>
        <EventLogScroll ref={logRef}>
          {eventLog.map((entry, i) => (
            <EventLogLine key={i} $type={entry.type}>
              <EventLogTime>{formatTime(entry.ts)}</EventLogTime>
              <span>{entry.message}</span>
            </EventLogLine>
          ))}
          {eventLog.length === 0 && (
            <EventLogLine $type="info">
              <EventLogTime>—</EventLogTime>
              <span>{t('liveLab.monitor.noEvents', 'No events yet…')}</span>
            </EventLogLine>
          )}
        </EventLogScroll>
      </EventLogRoot>
    </MonitorRoot>
  );
};
