/**
 * @fileoverview Live Lab telemetry monitor — KPI strip, trend chart, sensors, event log.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React, {
  lazy,
  Suspense,
  useEffect,
  useRef,
} from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { useTelemetry } from '../TelemetryProvider';
import { MonitorTelemetryField } from '../../atmosphere/MonitorTelemetryField';

// Component
import {
  TelemetryEventLogPlacement,
  type TelemetryMonitorProps,
} from './TelemetryMonitor.types';
import { OperationalKpiStrip } from './OperationalKpiStrip';
import { TelemetryOperationalEventLog } from './TelemetryOperationalEventLog';
import { TelemetrySensorCard } from './TelemetrySensorCard';
import {
  ChartPaneFallback,
  ConnectingState,
  MonitorDashboard,
  MonitorHeader,
  MonitorHeaderGroup,
  MonitorHeroChart,
  MonitorRoot,
  MonitorSensorStrip,
  MonitorStatus,
  MonitorTerminalRow,
  MonitorTitle,
  MonitorToolbar,
  StatusDot,
  ToolbarSep,
} from './TelemetryMonitor.style';

const TelemetryTrendChart = lazy(
  () => import('./TelemetryTrendChart').then(
    (module) => ({ default: module.TelemetryTrendChart }),
  ),
);

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

export const TelemetryMonitor: React.FC<TelemetryMonitorProps> = ({
  eventLogPlacement = TelemetryEventLogPlacement.Embedded,
}): React.ReactElement => {
  const { t } = useTranslation();
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
      <TelemetryOperationalEventLog
        logRef={logRef}
        connected={connected}
        eventLog={eventLog}
        tickCount={tickCount}
      />
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
        <MonitorDashboard
          $hasTerminal={
            showEventLog && eventLogPlacement === TelemetryEventLogPlacement.Embedded
          }
        >
          <MonitorHeroChart data-testid="telemetry-chart-pane">
            <Suspense fallback={<ChartPaneFallback aria-hidden />}>
              <TelemetryTrendChart
                readings={readings}
                history={history}
                title={t('liveLab.monitor.trendChart')}
              />
            </Suspense>
          </MonitorHeroChart>
          <MonitorSensorStrip data-testid="telemetry-sensors-pane">
            {readings.map((r, index) => (
              <TelemetrySensorCard
                key={r.id}
                reading={r}
                index={index}
                compact
              />
            ))}
          </MonitorSensorStrip>
          {showEventLog && eventLogPlacement === TelemetryEventLogPlacement.Embedded ? (
            <MonitorTerminalRow data-testid="telemetry-terminal-row">
              <TelemetryOperationalEventLog
                logRef={logRef}
                connected={connected}
                eventLog={eventLog}
                tickCount={tickCount}
              />
            </MonitorTerminalRow>
          ) : null}
        </MonitorDashboard>
      ) : null}
    </MonitorRoot>
  );
};
