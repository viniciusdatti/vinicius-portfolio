/**
 * useTelemetrySocket — single WebSocket client for /telemetry namespace.
 * Consumed only via TelemetryProvider + useTelemetry().
 */

// Core
import { useEffect, useState } from 'react';

// Libraries
import i18n from 'i18next';
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
import { resolveTelemetrySensorLabel } from '@/lib/telemetrySensorDisplay';
import { getApiRootUrl } from '@/utils/apiRootUrl';

/* ***********************************************************************************************
 **************************************** CONSTANTS **********************************************
 *********************************************************************************************** */

const MAX_HISTORY: number = 30;

const SOCKET_OPTIONS = {
  path: '/socket.io',
  /**
   * Polling first: works through Vite proxy immediately. WS upgrade often 403 until
   * `rewriteWsOrigin` is active (restart dev server after vite.config change).
   */
  transports: ['polling', 'websocket'] as ('websocket' | 'polling')[],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
};

/** Dev-only: polling transport avoids Vite WS 403 until proxy rewriteWsOrigin is active. */
const DEV_SOCKET_OPTIONS = {
  ...SOCKET_OPTIONS,
  transports: ['polling'] as ('websocket' | 'polling')[],
};

/**
 * Same origin as REST (`getApiRootUrl`): dev uses Vite `/socket.io` proxy; prod uses reverse proxy.
 * Avoids cross-origin WebSocket to :8000 (handshake 403 when page is localhost:5173).
 */
const createTelemetrySocket = (): Socket => {
  const root: string = getApiRootUrl();
  const options = import.meta.env.DEV ? DEV_SOCKET_OPTIONS : SOCKET_OPTIONS;
  return io(`${root}/telemetry`, options);
};

let sharedTelemetrySocket: Socket | null = null;
let telemetrySubscriberCount: number = 0;
let telemetryReleaseTimer: ReturnType<typeof setTimeout> | null = null;

const TELEMETRY_RELEASE_DELAY_MS: number = 120;

const acquireTelemetrySocket = (): Socket => {
  if (telemetryReleaseTimer !== null) {
    clearTimeout(telemetryReleaseTimer);
    telemetryReleaseTimer = null;
  }
  if (!sharedTelemetrySocket) {
    sharedTelemetrySocket = createTelemetrySocket();
  }
  telemetrySubscriberCount += 1;
  return sharedTelemetrySocket;
};

const releaseTelemetrySocket = (): void => {
  telemetrySubscriberCount = Math.max(0, telemetrySubscriberCount - 1);
  if (telemetrySubscriberCount === 0 && sharedTelemetrySocket) {
    if (telemetryReleaseTimer !== null) {
      clearTimeout(telemetryReleaseTimer);
    }
    telemetryReleaseTimer = setTimeout(() => {
      telemetryReleaseTimer = null;
      if (telemetrySubscriberCount === 0 && sharedTelemetrySocket) {
        sharedTelemetrySocket.disconnect();
        sharedTelemetrySocket = null;
      }
    }, TELEMETRY_RELEASE_DELAY_MS);
  }
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
  const [state, setState] = useState<TelemetryState>({
    connected: false,
    readings: [],
    history: {},
    eventLog: INITIAL_LOG,
    tickCount: 0,
  });

  useEffect(() => {
    const socket = acquireTelemetrySocket();

    const onConnect = (): void => {
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
    };

    const onDisconnect = (): void => {
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
    };

    const onReconnectAttempt = (attempt: number): void => {
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
    };

    const onTelemetryTick = (tick: TelemetryTick): void => {
      setState((prev) => {
        const newHistory: Record<string, number[]> = { ...prev.history };
        const newLog: TelemetryEventLogEntry[] = [...prev.eventLog];
        const nextTick: number = prev.tickCount + 1;

        const localReadings: SensorReading[] = tick.readings;

        const translate = (key: string): string => i18n.t(key);

        localReadings.forEach((r: SensorReading) => {
          const prevHistory: number[] = newHistory[r.id] ?? [];
          newHistory[r.id] = [...prevHistory, r.value].slice(-MAX_HISTORY);
          const channelLabel: string = resolveTelemetrySensorLabel(r, translate);

          if (r.status === SensorStatus.Critical) {
            newLog.unshift({
              ts: r.ts,
              message: `${channelLabel} CRÍTICO · ${r.value}${r.unit} (limite: ${r.threshold_critical}${r.unit})`,
              type: TelemetryEventType.Critical,
            });
          } else if (r.status === SensorStatus.Warn && Math.random() < 0.3) {
            newLog.unshift({
              ts: r.ts,
              message: `${channelLabel} alerta · ${r.value}${r.unit}`,
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
            const channelLabel: string = resolveTelemetrySensorLabel(pick, translate);
            newLog.unshift({
              ts: pick.ts,
              message: `${channelLabel} nominal · ${pick.value}${pick.unit}`,
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
    };

    const onConnectError = (error: Error): void => {
      setState((prev) => ({
        ...prev,
        connected: false,
        eventLog: [
          {
            ts: Date.now(),
            message: `Falha no transporte · ${error.message}`,
            type: TelemetryEventType.Warn,
          },
          ...prev.eventLog,
        ].slice(0, TELEMETRY_EVENT_LOG_MAX),
      }));
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.io.on('reconnect_attempt', onReconnectAttempt);
    socket.on('telemetry_tick', onTelemetryTick);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.io.off('reconnect_attempt', onReconnectAttempt);
      socket.off('telemetry_tick', onTelemetryTick);
      releaseTelemetrySocket();
    };
  }, []);

  return state;
};
