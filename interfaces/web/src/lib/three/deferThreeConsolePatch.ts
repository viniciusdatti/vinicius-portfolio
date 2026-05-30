const THREE_PATCH_FALLBACK_DELAY_MS = 200;

const loadThreeConsolePatch = (): void => {
  import('./suppressThreeClockDeprecation')
    .then((): undefined => undefined)
    .catch((): undefined => undefined);
};

/** Defers Three.js console patching until after first paint. */
export const deferThreeConsolePatch = (): void => {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(loadThreeConsolePatch);
    return;
  }

  window.setTimeout(loadThreeConsolePatch, THREE_PATCH_FALLBACK_DELAY_MS);
};
