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

// Types
import {
  TelemetryEventLogPlacement,
  type TelemetryMonitorProps,
} from '@/components/Workspace/TelemetryMonitor/TelemetryMonitor.types';

// Components
import { useTelemetry } from '@/components/Workspace/TelemetryProvider';
import { MonitorTelemetryField } from '@/components/Atmosphere/MonitorTelemetryField';
import { OperationalKpiStrip } from '@/components/Workspace/TelemetryMonitor/OperationalKpiStrip';
import { TelemetryOperationalEventLog } from '@/components/Workspace/TelemetryMonitor/TelemetryOperationalEventLog';
import { TelemetrySensorCard } from '@/components/Workspace/TelemetryMonitor/TelemetrySensorCard';
import {
  ChartPaneFallback,
  ConnectingState,
  MonitorChartPane,
  MonitorDashboard,
  MonitorGrid,
  MonitorHeader,
  MonitorHeaderGroup,
  MonitorMonitorsGrid,
  MonitorRoot,
  MonitorSensorsPane,
  MonitorStatus,
  MonitorTerminalRow,
  MonitorTitle,
  MonitorToolbar,
  StatusDot,
  ToolbarSep,
} from '@/components/Workspace/TelemetryMonitor/TelemetryMonitor.style';

const TelemetryTrendChart = lazy(
  () => import('@/components/Workspace/TelemetryMonitor/TelemetryTrendChart').then(
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
        <MonitorDashboard>
          <MonitorMonitorsGrid>
            <MonitorChartPane data-testid="telemetry-chart-pane">
              <Suspense fallback={<ChartPaneFallback aria-hidden />}>
                <TelemetryTrendChart
                  readings={readings}
                  history={history}
                  title={t('liveLab.monitor.trendChart')}
                />
              </Suspense>
            </MonitorChartPane>
            <MonitorSensorsPane data-testid="telemetry-sensors-pane">
              <MonitorGrid>
                {readings.map((r, index) => (
                  <TelemetrySensorCard key={r.id} reading={r} index={index} />
                ))}
              </MonitorGrid>
            </MonitorSensorsPane>
          </MonitorMonitorsGrid>
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
