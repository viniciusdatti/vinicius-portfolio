// Libraries
import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';

interface TelemetryStoreState {
  connected: boolean;
  tickCount: number;
  setTransportSnapshot: (connected: boolean, tickCount: number) => void;
  reset: () => void;
}

export const useTelemetryStore: UseBoundStore<StoreApi<TelemetryStoreState>> = create<
TelemetryStoreState
>((set) => ({
  connected: false,
  tickCount: 0,
  setTransportSnapshot: (connected: boolean, tickCount: number): void => {
    set({ connected, tickCount });
  },
  reset: (): void => {
    set({ connected: false, tickCount: 0 });
  },
}));
