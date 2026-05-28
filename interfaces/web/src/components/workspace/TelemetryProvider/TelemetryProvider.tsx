// Core
import React, { createContext, useContext, useEffect } from 'react';

// Store
import { useTelemetryStore } from '../../../store/telemetryStore';

// Types
import type { TelemetryState } from '../../../types/telemetry';

// Hooks
import { useTelemetrySocket } from '../../../hooks/useTelemetry';

// Component
import type { TelemetryProviderProps } from './TelemetryProvider.types';

const TelemetryContext = createContext<TelemetryState | null>(null);

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
