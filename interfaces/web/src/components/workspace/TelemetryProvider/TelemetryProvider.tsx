// Core
import React, { createContext, useContext, useEffect } from 'react';

// Hooks
import { useTelemetrySocket } from '@/hooks/useTelemetry';

// Store
import { useTelemetryStore } from '@/store/telemetryStore';

// Types
import type { TelemetryState } from '@/types/telemetry';
import type { TelemetryProviderProps } from './TelemetryProvider.types';

const TelemetryContext = createContext<TelemetryState | null>(null);

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

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

function useTelemetry(): TelemetryState {
  const ctx = useContext(TelemetryContext);
  if (!ctx) {
    throw new Error('useTelemetry must be used within TelemetryProvider');
  }
  return ctx;
}

export { TelemetryProvider, useTelemetry };
