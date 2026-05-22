// Core
import React, { useEffect, useRef } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { TELEMETRY_EVENT_LOG_MAX, type SensorReading } from '@/types/telemetry';

// Components
import { useTelemetry } from '@/components/workspace/TelemetryProvider';
import { TelemetryTrendChart } from '@/components/workspace/TelemetryMonitor/TelemetryTrendChart';
import {
  MonitorRoot,
  MonitorHeader,
  MonitorTitle,
  MonitorStatus,
  StatusDot,
  MonitorBody,
  MonitorChartPane,
  MonitorSensorsPane,
  MonitorGrid,
  SensorCard,
  SensorValueCell,
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
} from '@/components/workspace/TelemetryMonitor/TelemetryMonitor.style';

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

function Sensor({ reading: r }: { reading: SensorReading }): React.ReactElement {
  return (
    <SensorCard $status={r.status}>
      <SensorLabel>{r.label}</SensorLabel>
      <SensorValueRow>
        <SensorValueCell>
          <SensorValue key={r.value} $status={r.status}>{r.value}</SensorValue>
        </SensorValueCell>
        <SensorUnit>{r.unit}</SensorUnit>
      </SensorValueRow>
      <ThresholdBar>
        <ThresholdFill $pct={calcPct(r)} $status={r.status} />
      </ThresholdBar>
      <ThresholdMeta>
        <ThresholdStatus $status={r.status}>{r.status}</ThresholdStatus>
        <ThresholdLimit>
          crit
          {r.threshold_critical}
          {r.unit}
        </ThresholdLimit>
      </ThresholdMeta>
    </SensorCard>
  );
}

/* -------------------------------------------------------
 * Main component
 * ----------------------------------------------------- */

export function TelemetryMonitor(): React.ReactElement {
  const { t } = useTranslation();
  const {
    connected, readings, history, eventLog, tickCount,
  } = useTelemetry();
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
        <MonitorBody>
          <MonitorChartPane>
            <TelemetryTrendChart
              readings={readings}
              history={history}
              title={t('liveLab.monitor.trendChart', 'Sensor trend · last samples')}
            />
          </MonitorChartPane>
          <MonitorSensorsPane>
            <MonitorGrid>
              {readings.map((r) => (
                <Sensor key={r.id} reading={r} />
              ))}
            </MonitorGrid>
          </MonitorSensorsPane>
        </MonitorBody>
      )}

      <EventLogRoot>
        <EventLogHeader>
          <EventLogTitle>
            {t('liveLab.monitor.eventLog', 'Event log')}
          </EventLogTitle>
          <EventLogTick>
            {eventLog.length}
            /
            {TELEMETRY_EVENT_LOG_MAX}
            {' · '}
            {t('liveLab.monitor.tick', 'tick')}
            {' '}
            #
            {tickCount}
          </EventLogTick>
        </EventLogHeader>
        <EventLogScroll ref={logRef}>
          {eventLog.map((entry) => (
            <EventLogLine key={`${entry.ts}-${entry.message}`} $type={entry.type}>
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
}
