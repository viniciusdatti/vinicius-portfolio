// Core
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '../../../../hooks/usePrefersReducedMotion';
import { useSystemHealth } from '../../../../hooks/useSystemHealth';

// Types
import {
  LiveLabObservatoryLogLine,
  ObservatoryDataMode,
} from '../LiveLabObservatory.types';

// Lib
import { formatClockTime } from '../../../../lib/i18n';
import {
  resolveSystemHealthIsLive,
  resolveSystemHealthLabel,
} from '../../../../lib/systemHealth';

// LiveLabObservatory
import {
  buildObservatorySparkline,
  getObservatorySensors,
  LOG_MESSAGE_KEYS,
  resolveLogTypeFromMessageKey,
  resolveObservatoryTransportLabel,
} from '../LiveLabObservatory.helpers';
import { LiveLabObservatoryView } from '../LiveLabObservatoryView';

interface SimulatedObservatoryState {
  logIndex: number;
  tick: number;
}

const initialState: SimulatedObservatoryState = {
  logIndex: 0,
  tick: 0,
};

export const LiveLabObservatorySimulated: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const { status } = useSystemHealth();
  const apiLabel: string = resolveSystemHealthLabel(status, t, 'observatory');
  const isApiLive: boolean = resolveSystemHealthIsLive(status);
  const reduced: boolean = usePrefersReducedMotion();
  const [state, setState] = useState<SimulatedObservatoryState>(initialState);
  const sensors = useMemo(() => getObservatorySensors(t), [t]);

  const logs: LiveLabObservatoryLogLine[] = useMemo(() => {
    const items: LiveLabObservatoryLogLine[] = [];
    for (let i: number = 0; i < 4; i += 1) {
      const idx: number = (state.logIndex + i) % LOG_MESSAGE_KEYS.length;
      const messageKey: string = LOG_MESSAGE_KEYS[idx];
      const message: string = t(messageKey);
      const now: Date = new Date();
      now.setSeconds(now.getSeconds() - i * 2);
      items.push({
        time: formatClockTime(now.getTime(), i18n.language),
        msg: message,
        type: resolveLogTypeFromMessageKey(messageKey),
      });
    }
    return items;
  }, [state.logIndex, i18n.language, t]);

  useEffect(() => {
    if (reduced) return undefined;
    const logId: number = window.setInterval(
      () => setState((prev: SimulatedObservatoryState) => ({
        ...prev,
        logIndex: (prev.logIndex + 1) % LOG_MESSAGE_KEYS.length,
      })),
      3200,
    );
    const tickId: number = window.setInterval(
      () => setState((prev: SimulatedObservatoryState) => ({
        ...prev,
        tick: prev.tick + 1,
      })),
      1000,
    );
    return (): void => {
      window.clearInterval(logId);
      window.clearInterval(tickId);
    };
  }, [reduced]);

  const aggregateSpark: number[] = useMemo(
    () => buildObservatorySparkline(1.4, 32),
    [],
  );

  const transportModeLabel: string = resolveObservatoryTransportLabel(
    ObservatoryDataMode.Simulated,
    false,
    t,
  );

  return (
    <LiveLabObservatoryView
      dataMode={ObservatoryDataMode.Simulated}
      apiLabel={apiLabel}
      isApiLive={isApiLive}
      isTransportLive={false}
      transportModeLabel={transportModeLabel}
      sensors={sensors}
      logs={logs}
      tick={state.tick}
      aggregateSpark={aggregateSpark}
    />
  );
};
