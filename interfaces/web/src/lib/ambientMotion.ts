/**
 * Ambient canvas motion policy — portfolio brand backdrop runs regardless of OS motion prefs.
 */

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

/**
 * When true, layout/page Canvas2D fields always mount and animate (ignores prefers-reduced-motion).
 * Public surfaces keep telemetry ambience in every browser.
 */
export const FORCE_AMBIENT_MOTION: boolean = true;
