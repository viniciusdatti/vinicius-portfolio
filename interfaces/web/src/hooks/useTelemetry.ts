/**
 * useTelemetry — connects to /telemetry namespace and streams sensor readings.
 */

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { env } from '../config/env';

const SOCKET_URL: string = (() => {
  const apiUrl: string = env.apiUrl;
  return apiUrl.replace(/\/api\/v1\/?$/, '') || 'http://localhost:8000';
})();

export type SensorStatus = 'ok' | 'warn' | 'critical';

export interface SensorReading {
  id: string;
  label: string;
  unit: string;
  value: number;
  threshold_warn: number;
  threshold_critical: number;
  status: SensorStatus;
  ts: number;
}

export interface TelemetryTick {
  readings: SensorReading[];
  ts: number;
}

export interface TelemetryState {
  connected: boolean;
  readings: SensorReading[];
  history: Record<string, number[]>;
  eventLog: { ts: number; message: string; type: 'info' | 'warn' | 'critical' }[];
  tickCount: number;
}

const MAX_HISTORY = 30;
const MAX_LOG = 40;

export const useTelemetry = (): TelemetryState => {
  const socketRef = useRef<Socket | null>(null);
  const [state, setState] = useState<TelemetryState>({
    connected: false,
    readings: [],
    history: {},
    eventLog: [],
    tickCount: 0,
  });

  useEffect(() => {
    const socket = io(`${SOCKET_URL}/telemetry`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setState((prev) => ({
        ...prev,
        connected: true,
        eventLog: [
          {
            ts: Date.now(),
            message: 'WebSocket connected · namespace /telemetry',
            type: 'info' as const,
          },
          ...prev.eventLog,
        ].slice(0, MAX_LOG),
      }));
    });

    socket.on('disconnect', () => {
      setState((prev) => ({
        ...prev,
        connected: false,
        eventLog: [
          { ts: Date.now(), message: 'Transport disconnected', type: 'warn' as const },
          ...prev.eventLog,
        ].slice(0, MAX_LOG),
      }));
    });

    socket.on('telemetry_tick', (tick: TelemetryTick) => {
      setState((prev) => {
        const newHistory = { ...prev.history };
        const newLog = [...prev.eventLog];

        for (const r of tick.readings) {
          const prev_readings = newHistory[r.id] ?? [];
          newHistory[r.id] = [...prev_readings, r.value].slice(-MAX_HISTORY);

          if (r.status === 'critical') {
            newLog.unshift({
              ts: r.ts,
              message: `${r.label} CRITICAL · ${r.value}${r.unit} (threshold: ${r.threshold_critical}${r.unit})`,
              type: 'critical' as const,
            });
          } else if (r.status === 'warn' && Math.random() < 0.3) {
            newLog.unshift({
              ts: r.ts,
              message: `${r.label} warn · ${r.value}${r.unit}`,
              type: 'warn' as const,
            });
          }
        }

        return {
          ...prev,
          readings: tick.readings,
          history: newHistory,
          eventLog: newLog.slice(0, MAX_LOG),
          tickCount: prev.tickCount + 1,
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return state;
};
