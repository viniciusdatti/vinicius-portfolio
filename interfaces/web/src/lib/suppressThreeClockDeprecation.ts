// Libraries
import { setConsoleFunction } from 'three';

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

/** Emitted by THREE.Clock constructor since r183 (used internally by @react-three/fiber 9.x). */
const THREE_CLOCK_DEPRECATION: string = 'Clock: This module has been deprecated';

type BrowserConsoleMethod = (message?: unknown, ...params: unknown[]) => void;

/* *************************************************************************************************
 ********************************************** STATE **********************************************
 ************************************************************************************************ */

let isThreeConsoleConfigured: boolean = false;

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

const getBrowserConsole = (): Console => globalThis.console;

const bindBrowserConsoleMethod = (
  method: 'warn' | 'error' | 'log',
): BrowserConsoleMethod => {
  const sink: Console = getBrowserConsole();
  const bound: BrowserConsoleMethod = sink[method].bind(sink) as BrowserConsoleMethod;
  return bound;
};

/**
 * Suppresses the r183 Clock deprecation warning from dependency code until @react-three/fiber v10.
 * Remove this module after upgrading R3F (Timer-based frameloop: pmndrs/react-three-fiber#2688).
 */
export const suppressThreeClockDeprecation = (): void => {
  if (isThreeConsoleConfigured) {
    return;
  }

  isThreeConsoleConfigured = true;

  const nativeWarn: BrowserConsoleMethod = bindBrowserConsoleMethod('warn');
  const nativeError: BrowserConsoleMethod = bindBrowserConsoleMethod('error');
  const nativeLog: BrowserConsoleMethod = bindBrowserConsoleMethod('log');

  setConsoleFunction(
    (type: 'log' | 'warn' | 'error', message: string, ...params: unknown[]): void => {
      if (type === 'warn' && message.includes(THREE_CLOCK_DEPRECATION)) {
        return;
      }

      if (type === 'warn') {
        nativeWarn(message, ...params);
        return;
      }

      if (type === 'error') {
        nativeError(message, ...params);
        return;
      }

      nativeLog(message, ...params);
    },
  );
};

suppressThreeClockDeprecation();
