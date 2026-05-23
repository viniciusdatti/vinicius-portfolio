/**
 * useTelemetrySocket — single WebSocket client for /telemetry namespace.
 * Consumed only via TelemetryProvider + useTelemetry().
 */

// Core
import { useEffect, useRef, useState } from 'react';

// Libraries
import { io, Socket } from 'socket.io-client';

// Types
import {
  SensorStatus,
  TelemetryEventType,
  TELEMETRY_EVENT_LOG_MAX,
  type SensorReading,
  type TelemetryEventLogEntry,
  type TelemetryState,
  type TelemetryTick,
} from '@/types/telemetry';

// Components
import { env } from '@/config/env';
import { getApiRootUrl } from '@/utils/apiRootUrl';

/* ***********************************************************************************************
 **************************************** CONSTANTS **********************************************
 *********************************************************************************************** */

const MAX_HISTORY: number = 30;

const SOCKET_OPTIONS = {
  transports: ['websocket', 'polling'] as ('websocket' | 'polling')[],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
};

const getDevApiOrigin = (): string => {
  const configured: string | undefined = import.meta.env.VITE_API_PROXY_TARGET;
  if (configured) {
    return configured.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}:8000`;
  }
  return 'http://127.0.0.1:8000';
};

/**
 * Dev: direct API origin (CORS allows 5173). Prod same-origin: `/telemetry` via reverse proxy.
 */
const createTelemetrySocket = (): Socket => {
  if (env.apiUrl.startsWith('http')) {
    return io(`${getApiRootUrl()}/telemetry`, SOCKET_OPTIONS);
  }
  if (import.meta.env.DEV) {
    return io(`${getDevApiOrigin()}/telemetry`, SOCKET_OPTIONS);
  }
  return io('/telemetry', SOCKET_OPTIONS);
};

/** Boot messages shown before the socket connects (transport lifecycle only). */
const INITIAL_LOG: TelemetryEventLogEntry[] = [
  {
    ts: Date.now() - 1200,
    message: 'Inicializando cliente de telemetria…',
    type: TelemetryEventType.Info,
  },
  {
    ts: Date.now() - 600,
    message: 'Abrindo socket · namespace /telemetry',
    type: TelemetryEventType.Info,
  },
];

/* ***********************************************************************************************
 **************************************** HOOK ***************************************************
 *********************************************************************************************** */

export const useTelemetrySocket = (): TelemetryState => {
  const socketRef = useRef<Socket | null>(null);
  const [state, setState] = useState<TelemetryState>({
    connected: false,
    readings: [],
    history: {},
    eventLog: INITIAL_LOG,
    tickCount: 0,
  });

  useEffect(() => {
    const socket = createTelemetrySocket();
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
            type: TelemetryEventType.Info,
          },
          {
            ts: now - 80,
            message: 'Handshake concluído · aguardando telemetria',
            type: TelemetryEventType.Info,
          },
          {
            ts: now - 160,
            message: 'Scan de sensores iniciado · intervalo 2s',
            type: TelemetryEventType.Info,
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
            type: TelemetryEventType.Warn,
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
            type: TelemetryEventType.Warn,
          },
          ...prev.eventLog,
        ].slice(0, TELEMETRY_EVENT_LOG_MAX),
      }));
    });

    socket.on('telemetry_tick', (tick: TelemetryTick) => {
      setState((prev) => {
        const newHistory: Record<string, number[]> = { ...prev.history };
        const newLog: TelemetryEventLogEntry[] = [...prev.eventLog];
        const nextTick: number = prev.tickCount + 1;

        const localReadings: SensorReading[] = tick.readings;

        localReadings.forEach((r: SensorReading) => {
          const prevHistory: number[] = newHistory[r.id] ?? [];
          newHistory[r.id] = [...prevHistory, r.value].slice(-MAX_HISTORY);

          if (r.status === SensorStatus.Critical) {
            newLog.unshift({
              ts: r.ts,
              message: `${r.label} CRÍTICO · ${r.value}${r.unit} (limite: ${r.threshold_critical}${r.unit})`,
              type: TelemetryEventType.Critical,
            });
          } else if (r.status === SensorStatus.Warn && Math.random() < 0.3) {
            newLog.unshift({
              ts: r.ts,
              message: `${r.label} alerta · ${r.value}${r.unit}`,
              type: TelemetryEventType.Warn,
            });
          }
        });

        if (nextTick % 8 === 0) {
          const stable: SensorReading[] = localReadings.filter(
            (r: SensorReading) => r.status === SensorStatus.Ok,
          );
          if (stable.length > 0) {
            const pick: SensorReading = stable[nextTick % stable.length];
            newLog.unshift({
              ts: pick.ts,
              message: `${pick.label} nominal · ${pick.value}${pick.unit}`,
              type: TelemetryEventType.Info,
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
