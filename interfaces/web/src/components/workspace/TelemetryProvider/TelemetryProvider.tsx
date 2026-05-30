// Core
import React, {
  createContext,
  useContext,
  useEffect,
} from 'react';

// Hooks
import { useTelemetrySocket } from '../../../hooks/useTelemetry';

// Types
import { TelemetryState } from '../../../types/telemetry';
import { TelemetryProviderProps } from './TelemetryProvider.types';

// Store
import { useTelemetryStore } from '../../../store/telemetryStore';

const TelemetryContext = createContext<TelemetryState | null>(null);

export interface TelemetryFixtureProviderProps {
  value: TelemetryState;
  children: React.ReactNode;
}

export const TelemetryFixtureProvider = ({
  value,
  children,
}: TelemetryFixtureProviderProps): React.ReactElement => (
  <TelemetryContext.Provider value={value}>
    {children}
  </TelemetryContext.Provider>
);

const TelemetryProvider = ({
  children,
}: TelemetryProviderProps): React.ReactElement => {
  const state = useTelemetrySocket();
  const setTransportSnapshot = useTelemetryStore((s) => s.setTransportSnapshot);
  const reset = useTelemetryStore((s) => s.reset);

  useEffect(() => {
    setTransportSnapshot(state.connected, state.tickCount);
  }, [state.connected, state.tickCount, setTransportSnapshot]);

  useEffect(() => () => reset(), [reset]);

  return (
    <TelemetryContext.Provider value={state}>
      {children}
    </TelemetryContext.Provider>
  );
};

const useTelemetry = (): TelemetryState => {
  const ctx = useContext(TelemetryContext);
  if (!ctx) {
    throw new Error('useTelemetry must be used within TelemetryProvider');
  }
  return ctx;
};

export { TelemetryProvider, useTelemetry };
