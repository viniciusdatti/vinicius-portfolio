// Core
import { act } from 'react';

// Libraries
import { renderHook, waitFor } from '@testing-library/react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

// Types
import {
  SensorStatus,
  TelemetryEventType,
  TelemetryState,
  TelemetryTick,
} from '../types/telemetry';

type SocketEventHandler = (...args: unknown[]) => void;

interface MockTelemetrySocket {
  connected: boolean;
  on: ReturnType<typeof vi.fn>;
  off: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  io: {
    on: ReturnType<typeof vi.fn>;
    off: ReturnType<typeof vi.fn>;
  };
  trigger: (event: string, ...args: unknown[]) => void;
  triggerIo: (event: string, ...args: unknown[]) => void;
}

const buildMockSocket = (): MockTelemetrySocket => {
  const handlers: Record<string, SocketEventHandler[]> = {};
  const ioHandlers: Record<string, SocketEventHandler[]> = {};

  const socket: MockTelemetrySocket = {
    connected: false,
    on: vi.fn((event: string, handler: SocketEventHandler): void => {
      const current: SocketEventHandler[] = handlers[event] ?? [];
      handlers[event] = [...current, handler];
    }),
    off: vi.fn((event: string, handler: SocketEventHandler): void => {
      handlers[event] = (handlers[event] ?? []).filter(
        (registered: SocketEventHandler): boolean => registered !== handler,
      );
    }),
    disconnect: vi.fn((): void => {
      socket.connected = false;
    }),
    io: {
      on: vi.fn((event: string, handler: SocketEventHandler): void => {
        const current: SocketEventHandler[] = ioHandlers[event] ?? [];
        ioHandlers[event] = [...current, handler];
      }),
      off: vi.fn((event: string, handler: SocketEventHandler): void => {
        ioHandlers[event] = (ioHandlers[event] ?? []).filter(
          (registered: SocketEventHandler): boolean => registered !== handler,
        );
      }),
    },
    trigger: (event: string, ...args: unknown[]): void => {
      (handlers[event] ?? []).forEach((handler: SocketEventHandler): void => {
        handler(...args);
      });
    },
    triggerIo: (event: string, ...args: unknown[]): void => {
      (ioHandlers[event] ?? []).forEach((handler: SocketEventHandler): void => {
        handler(...args);
      });
    },
  };

  return socket;
};

let mockSocket: MockTelemetrySocket = buildMockSocket();
let socketStartsConnected: boolean = false;

vi.mock('socket.io-client', (): { io: ReturnType<typeof vi.fn> } => ({
  io: vi.fn((): MockTelemetrySocket => {
    mockSocket = buildMockSocket();
    mockSocket.connected = socketStartsConnected;
    return mockSocket;
  }),
}));

vi.mock('../utils/apiRootUrl', (): { getApiRootUrl: () => string } => ({
  getApiRootUrl: (): string => 'http://localhost:8000',
}));

vi.mock('i18next', (): { default: { t: (key: string) => string } } => ({
  default: {
    t: (key: string): string => key,
  },
}));

const loadUseTelemetrySocket = async (): Promise<() => TelemetryState> => {
  vi.resetModules();
  const module = await import('./useTelemetry');
  return module.useTelemetrySocket;
};

const buildTelemetryTick = (
  status: SensorStatus = SensorStatus.Ok,
): TelemetryTick => ({
  ts: Date.now(),
  readings: [
    {
      id: 'temp-01',
      label: 'temperature',
      unit: '°C',
      value: 42,
      threshold_warn: 50,
      threshold_critical: 60,
      status,
      ts: Date.now(),
    },
  ],
});

describe('hooks/useTelemetrySocket', (): void => {
  beforeEach((): void => {
    socketStartsConnected = false;
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach((): void => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // METHOD: initial state *******************************

  it('should start disconnected with bootstrap event log entries', async (): Promise<void> => {
    const useTelemetrySocket = await loadUseTelemetrySocket();
    const { result } = renderHook((): TelemetryState => useTelemetrySocket());

    expect(result.current.connected).toBe(false);
    expect(result.current.readings).toEqual([]);
    expect(result.current.tickCount).toBe(0);
    expect(result.current.eventLog.length).toBeGreaterThan(0);
    expect(result.current.eventLog[0].type).toBe(TelemetryEventType.Info);
  });

  // METHOD: connect *******************************

  it('should mark connected and append connect log on socket connect', async (): Promise<void> => {
    const useTelemetrySocket = await loadUseTelemetrySocket();
    const { result } = renderHook((): TelemetryState => useTelemetrySocket());

    act((): void => {
      mockSocket.trigger('connect');
    });

    await waitFor((): void => {
      expect(result.current.connected).toBe(true);
    });

    expect(result.current.eventLog[0].message).toContain('WebSocket connected');
  });

  it('should invoke connect handler immediately when socket is already connected', async (): Promise<void> => {
    socketStartsConnected = true;
    const useTelemetrySocket = await loadUseTelemetrySocket();
    const { result } = renderHook((): TelemetryState => useTelemetrySocket());

    await waitFor((): void => {
      expect(result.current.connected).toBe(true);
    });
  });

  // METHOD: disconnect *******************************

  it('should mark disconnected and append warn log on socket disconnect', async (): Promise<void> => {
    const useTelemetrySocket = await loadUseTelemetrySocket();
    const { result } = renderHook((): TelemetryState => useTelemetrySocket());

    act((): void => {
      mockSocket.trigger('connect');
      mockSocket.trigger('disconnect');
    });

    await waitFor((): void => {
      expect(result.current.connected).toBe(false);
    });

    expect(result.current.eventLog[0].type).toBe(TelemetryEventType.Warn);
  });

  // METHOD: telemetry tick *******************************

  it('should update readings, history, and tick count on telemetry_tick', async (): Promise<void> => {
    const useTelemetrySocket = await loadUseTelemetrySocket();
    const { result } = renderHook((): TelemetryState => useTelemetrySocket());
    const tick: TelemetryTick = buildTelemetryTick(SensorStatus.Ok);

    act((): void => {
      mockSocket.trigger('telemetry_tick', tick);
    });

    await waitFor((): void => {
      expect(result.current.tickCount).toBe(1);
    });

    expect(result.current.readings).toEqual(tick.readings);
    expect(result.current.history['temp-01']).toEqual([42]);
  });

  it('should append critical threshold log when reading status is critical', async (): Promise<void> => {
    const useTelemetrySocket = await loadUseTelemetrySocket();
    const { result } = renderHook((): TelemetryState => useTelemetrySocket());

    act((): void => {
      mockSocket.trigger('telemetry_tick', buildTelemetryTick(SensorStatus.Critical));
    });

    await waitFor((): void => {
      expect(result.current.eventLog[0].type).toBe(TelemetryEventType.Critical);
    });
  });

  // METHOD: reconnect / errors *******************************

  it('should append reconnect attempt log from socket.io manager', async (): Promise<void> => {
    const useTelemetrySocket = await loadUseTelemetrySocket();
    const { result } = renderHook((): TelemetryState => useTelemetrySocket());

    act((): void => {
      mockSocket.triggerIo('reconnect_attempt', 2);
    });

    await waitFor((): void => {
      expect(result.current.eventLog[0].message).toContain('#2');
    });
  });

  it('should append transport error log on connect_error', async (): Promise<void> => {
    const useTelemetrySocket = await loadUseTelemetrySocket();
    const { result } = renderHook((): TelemetryState => useTelemetrySocket());

    act((): void => {
      mockSocket.trigger('connect_error', new Error('refused'));
    });

    await waitFor((): void => {
      expect(result.current.connected).toBe(false);
    });

    expect(result.current.eventLog[0].message).toContain('refused');
  });

  // METHOD: cleanup *******************************

  it('should unregister listeners and disconnect shared socket after unmount delay', async (): Promise<void> => {
    vi.useFakeTimers();
    const useTelemetrySocket = await loadUseTelemetrySocket();
    const { unmount } = renderHook((): TelemetryState => useTelemetrySocket());

    unmount();

    expect(mockSocket.off).toHaveBeenCalled();
    expect(mockSocket.io.off).toHaveBeenCalled();
    expect(mockSocket.disconnect).not.toHaveBeenCalled();

    await act(async (): Promise<void> => {
      vi.advanceTimersByTime(120);
      await Promise.resolve();
    });

    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
});
