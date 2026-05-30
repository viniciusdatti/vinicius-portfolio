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

// Hooks
import { SystemHealthStatus, useSystemHealth } from './useSystemHealth';

const HEALTH_URL: string = 'http://localhost:8000/health';

describe('useSystemHealth', (): void => {
  // METHOD: initial state *******************************

  it('should start with checking status', (): void => {
    globalThis.fetch = vi.fn().mockImplementation(
      (): Promise<Response> => new Promise(() => {}),
    );

    const { result } = renderHook((): ReturnType<typeof useSystemHealth> => useSystemHealth());

    expect(result.current.status).toBe(SystemHealthStatus.Checking);
    expect(result.current.version).toBe(null);
  });

  // METHOD: healthy response *******************************

  it('should set online status when health returns healthy', async (): Promise<void> => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<{ status: string; version: string }> => ({
        status: 'healthy',
        version: '1.2.3',
      }),
    } as Response);

    const { result } = renderHook((): ReturnType<typeof useSystemHealth> => useSystemHealth());

    await waitFor((): void => {
      expect(result.current.status).toBe(SystemHealthStatus.Online);
    });

    expect(result.current.version).toBe('1.2.3');
    expect(globalThis.fetch).toHaveBeenCalledWith(HEALTH_URL);
  });

  // METHOD: unhealthy response *******************************

  it('should set offline status when health payload is not healthy', async (): Promise<void> => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async (): Promise<{ status: string }> => ({ status: 'degraded' }),
    } as Response);

    const { result } = renderHook((): ReturnType<typeof useSystemHealth> => useSystemHealth());

    await waitFor((): void => {
      expect(result.current.status).toBe(SystemHealthStatus.Offline);
    });

    expect(result.current.version).toBe(null);
  });

  // METHOD: fetch failure *******************************

  it('should set offline status when fetch fails', async (): Promise<void> => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error('network error'));

    const { result } = renderHook((): ReturnType<typeof useSystemHealth> => useSystemHealth());

    await waitFor((): void => {
      expect(result.current.status).toBe(SystemHealthStatus.Offline);
    });

    expect(result.current.version).toBe(null);
  });

  // METHOD: polling interval *******************************

  describe('polling interval', (): void => {
    beforeEach((): void => {
      vi.useFakeTimers();
    });

    afterEach((): void => {
      vi.useRealTimers();
    });

    it('should re-fetch health every 30 seconds', async (): Promise<void> => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async (): Promise<{ status: string; version: string }> => ({
          status: 'healthy',
          version: '2.0.0',
        }),
      } as Response);

      renderHook((): ReturnType<typeof useSystemHealth> => useSystemHealth());

      await act(async (): Promise<void> => {
        await Promise.resolve();
      });

      expect(globalThis.fetch).toHaveBeenCalledTimes(1);

      await act(async (): Promise<void> => {
        vi.advanceTimersByTime(30000);
        await Promise.resolve();
      });

      expect(globalThis.fetch).toHaveBeenCalledTimes(2);
    });
  });
});
