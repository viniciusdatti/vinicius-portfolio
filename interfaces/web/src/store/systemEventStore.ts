// Libraries
import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';

// Types
import {
  SystemEvent,
  SystemEventLevel,
  SystemEventType,
} from '../types/system-events';

const MAX_EVENTS: number = 48;

interface SystemEventState {
  events: SystemEvent[];
  push: (
    type: SystemEventType,
    level: SystemEventLevel,
    messageKey: string,
    messageParams?: Record<string, string>
  ) => void;
  clear: () => void;
}

const createEventId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useSystemEventStore: UseBoundStore<StoreApi<SystemEventState>> = create<
SystemEventState
>((set) => ({
  events: [],

  push: (
    type: SystemEventType,
    level: SystemEventLevel,
    messageKey: string,
    messageParams?: Record<string, string>,
  ): void => {
    const entry: SystemEvent = {
      id: createEventId(),
      type,
      level,
      messageKey,
      messageParams,
      at: new Date().toISOString(),
    };
    set((state: SystemEventState) => {
      const next: SystemEvent[] = [...state.events, entry].slice(-MAX_EVENTS);
      return { events: next };
    });
  },

  clear: (): void => set({ events: [] }),
}));
