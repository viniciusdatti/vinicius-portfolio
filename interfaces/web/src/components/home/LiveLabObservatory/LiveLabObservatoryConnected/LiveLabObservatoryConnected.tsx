// Core
import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useTelemetrySocket } from '../../../../hooks/useTelemetry';
import { useSystemHealth } from '../../../../hooks/useSystemHealth';

// Types
import { ObservatoryDataMode } from '../LiveLabObservatory.types';

// Lib
import {
  resolveSystemHealthIsLive,
  resolveSystemHealthLabel,
} from '../../../../lib/systemHealth';

// LiveLabObservatory
import {
  buildAggregateSparkFromHistory,
  getObservatorySensors,
  mapTelemetryLogEntries,
  mapTelemetryReadingsToSensors,
  resolveObservatoryTransportLabel,
} from '../LiveLabObservatory.helpers';
import { LiveLabObservatoryView } from '../LiveLabObservatoryView';

export const LiveLabObservatoryConnected: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const { status } = useSystemHealth();
  const telemetry = useTelemetrySocket();
  const apiLabel: string = resolveSystemHealthLabel(status, t, 'observatory');
  const isApiLive: boolean = resolveSystemHealthIsLive(status);
  const fallbackSensors = useMemo(() => getObservatorySensors(t), [t]);

  const sensors = useMemo(
    () => mapTelemetryReadingsToSensors(
      telemetry.readings,
      telemetry.history,
      t,
      fallbackSensors,
    ),
    [telemetry.readings, telemetry.history, t, fallbackSensors],
  );

  const logs = useMemo(
    () => mapTelemetryLogEntries(telemetry.eventLog, i18n.language),
    [telemetry.eventLog, i18n.language],
  );

  const aggregateSpark = useMemo(
    () => buildAggregateSparkFromHistory(telemetry.history, 1.4),
    [telemetry.history],
  );

  const transportModeLabel: string = resolveObservatoryTransportLabel(
    ObservatoryDataMode.Live,
    telemetry.connected,
    t,
  );

  return (
    <LiveLabObservatoryView
      dataMode={ObservatoryDataMode.Live}
      apiLabel={apiLabel}
      isApiLive={isApiLive}
      isTransportLive={telemetry.connected}
      transportModeLabel={transportModeLabel}
      sensors={sensors}
      logs={logs}
      tick={telemetry.tickCount}
      aggregateSpark={aggregateSpark}
    />
  );
};
