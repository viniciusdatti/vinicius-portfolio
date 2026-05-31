// Core
import { useEffect, useState } from 'react';

// Libraries
import i18n from 'i18next';
import { io, Socket } from 'socket.io-client';

// Types
import {
  TelemetryEventLogEntry,
  TelemetryState,
  TelemetryTick,
} from '../types/telemetry';

// Lib
import {
  buildConnectErrorEventLogEntry,
  buildConnectEventLogEntries,
  buildDisconnectEventLogEntry,
  buildReconnectAttemptEventLogEntry,
  createInitialTelemetryEventLog,
  prependTelemetryEventLog,
} from '../lib/telemetry/telemetryEventLog';
import { processTelemetryTick } from '../lib/telemetry/telemetryTickReducer';

// Utils
import { getApiRootUrl } from '../utils/apiRootUrl';

const SOCKET_OPTIONS = {
  path: '/socket.io',
  transports: ['polling', 'websocket'] as ('websocket' | 'polling')[],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
};

const DEV_SOCKET_OPTIONS = {
  ...SOCKET_OPTIONS,
  transports: ['polling'] as ('websocket' | 'polling')[],
};

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

const INITIAL_LOG: TelemetryEventLogEntry[] = createInitialTelemetryEventLog();

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
        eventLog: prependTelemetryEventLog(prev.eventLog, buildConnectEventLogEntries(now)),
      }));
    };

    const onDisconnect = (): void => {
      setState((prev) => ({
        ...prev,
        connected: false,
        eventLog: prependTelemetryEventLog(
          prev.eventLog,
          [buildDisconnectEventLogEntry(Date.now())],
        ),
      }));
    };

    const onReconnectAttempt = (attempt: number): void => {
      setState((prev) => ({
        ...prev,
        eventLog: prependTelemetryEventLog(
          prev.eventLog,
          [buildReconnectAttemptEventLogEntry(Date.now(), attempt)],
        ),
      }));
    };

    const onTelemetryTick = (tick: TelemetryTick): void => {
      setState((prev) => {
        const translate = (key: string): string => i18n.t(key);

        return {
          ...prev,
          ...processTelemetryTick(prev, tick, {
            translate,
            shouldAppendWarnLog: (): boolean => Math.random() < 0.3,
          }),
        };
      });
    };

    const onConnectError = (error: Error): void => {
      setState((prev) => ({
        ...prev,
        connected: false,
        eventLog: prependTelemetryEventLog(
          prev.eventLog,
          [buildConnectErrorEventLogEntry(Date.now(), error.message)],
        ),
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
