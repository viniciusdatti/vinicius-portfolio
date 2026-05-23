/**
 * Global Vitest setup (portfolio equivalent of Vantage setupTests.ts).
 */

import '@testing-library/jest-dom';
import {
  afterAll, afterEach, beforeAll, beforeEach, vi,
} from 'vitest';
import { server } from '@/test/mocks/server';

/* *************************************************************************************************
 ****************************************** GLOBAL MOCKS *******************************************
 ************************************************************************************************ */

beforeEach((): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string): MediaQueryList => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: (): void => {},
      removeListener: (): void => {},
      addEventListener: (): void => {},
      removeEventListener: (): void => {},
      dispatchEvent: (): boolean => false,
    }),
  });

  globalThis.IntersectionObserver = vi.fn().mockImplementation(() => ({
    root: null,
    rootMargin: '',
    thresholds: [],
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn().mockReturnValue([]),
  })) as unknown as typeof IntersectionObserver;

  globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })) as unknown as typeof ResizeObserver;
});

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
