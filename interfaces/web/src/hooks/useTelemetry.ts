/**
 * useTelemetry — connects to /telemetry namespace and streams sensor readings.
 * Labels are translated to Portuguese before being stored in state.
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

/* ***********************************************************************************************
 **************************************** LABEL MAP **********************************************
 *********************************************************************************************** */

/** Maps backend sensor label strings to Portuguese display names. */
const SENSOR_LABEL_PT: Readonly<Record<string, string>> = {
  'CRUSHER RPM': 'RPM DO BRITADOR',
  'MOTOR TEMP': 'TEMP DO MOTOR',
  'FEED PRESSURE': 'PRESSÃO DE ALIMENTAÇÃO',
  'VIBRATION': 'VIBRAÇÃO',
};

const toLocalLabel = (raw: string): string => SENSOR_LABEL_PT[raw] ?? raw;

/* ***********************************************************************************************
 **************************************** CONSTANTS **********************************************
 *********************************************************************************************** */

const MAX_HISTORY: number = 30;

/** Max event-log lines kept in memory and rendered (oldest dropped). */
export const TELEMETRY_EVENT_LOG_MAX: number = 40;

/** Pre-boot events shown immediately on mount before WebSocket connects. */
const INITIAL_LOG: TelemetryState['eventLog'] = [
  {
    ts: Date.now() - 1200,
    message: 'Inicializando cliente de telemetria…',
    type: 'info',
  },
  {
    ts: Date.now() - 600,
    message: 'Abrindo socket · namespace /telemetry',
    type: 'info',
  },
];

/* ***********************************************************************************************
 **************************************** HOOK ***************************************************
 *********************************************************************************************** */

export const useTelemetry = (): TelemetryState => {
  const socketRef = useRef<Socket | null>(null);
  const [state, setState] = useState<TelemetryState>({
    connected: false,
    readings: [],
    history: {},
    eventLog: INITIAL_LOG,
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
      const now: number = Date.now();
      setState((prev) => ({
        ...prev,
        connected: true,
        eventLog: [
          {
            ts: now,
            message: 'WebSocket conectado · namespace /telemetry',
            type: 'info' as const,
          },
          {
            ts: now - 80,
            message: 'Handshake concluído · aguardando telemetria',
            type: 'info' as const,
          },
          {
            ts: now - 160,
            message: 'Scan de sensores iniciado · intervalo 2s',
            type: 'info' as const,
          },
          ...prev.eventLog,
        ].slice(0, TELEMETRY_EVENT_LOG_MAX),
      }));
    });

    socket.on('disconnect', () => {
      setState((prev) => ({
        ...prev,
        connected: false,
        eventLog: [
          {
            ts: Date.now(),
            message: 'Transporte desconectado — aguardando reconexão',
            type: 'warn' as const,
          },
          ...prev.eventLog,
        ].slice(0, TELEMETRY_EVENT_LOG_MAX),
      }));
    });

    socket.io.on('reconnect_attempt', (attempt: number) => {
      setState((prev) => ({
        ...prev,
        eventLog: [
          {
            ts: Date.now(),
            message: `Tentativa de reconexão #${attempt}…`,
            type: 'warn' as const,
          },
          ...prev.eventLog,
        ].slice(0, TELEMETRY_EVENT_LOG_MAX),
      }));
    });

    socket.on('telemetry_tick', (tick: TelemetryTick) => {
      setState((prev) => {
        const newHistory: Record<string, number[]> = { ...prev.history };
        const newLog: TelemetryState['eventLog'] = [...prev.eventLog];
        const nextTick: number = prev.tickCount + 1;

        const localReadings: SensorReading[] = tick.readings.map(
          (r: SensorReading): SensorReading => ({
            ...r,
            label: toLocalLabel(r.label),
          })
        );

        for (const r of localReadings) {
          const prevHistory: number[] = newHistory[r.id] ?? [];
          newHistory[r.id] = [...prevHistory, r.value].slice(-MAX_HISTORY);

          if (r.status === 'critical') {
            newLog.unshift({
              ts: r.ts,
              message: `${r.label} CRÍTICO · ${r.value}${r.unit} (limite: ${r.threshold_critical}${r.unit})`,
              type: 'critical' as const,
            });
          } else if (r.status === 'warn' && Math.random() < 0.3) {
            newLog.unshift({
              ts: r.ts,
              message: `${r.label} alerta · ${r.value}${r.unit}`,
              type: 'warn' as const,
            });
          }
        }

        // Every 8 ticks log a stable sensor reading to keep the log alive
        if (nextTick % 8 === 0) {
          const stable: SensorReading[] = localReadings.filter(
            (r: SensorReading) => r.status === 'ok'
          );
          if (stable.length > 0) {
            const pick: SensorReading = stable[nextTick % stable.length];
            newLog.unshift({
              ts: pick.ts,
              message: `${pick.label} nominal · ${pick.value}${pick.unit}`,
              type: 'info' as const,
            });
          }
        }

        return {
          ...prev,
          readings: localReadings,
          history: newHistory,
          eventLog: newLog.slice(0, TELEMETRY_EVENT_LOG_MAX),
          tickCount: nextTick,
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return state;
};
