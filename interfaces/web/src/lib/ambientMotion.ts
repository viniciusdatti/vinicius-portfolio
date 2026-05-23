/**
 * Ambient canvas motion policy — portfolio brand backdrop runs regardless of OS motion prefs.
 */

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

/**
 * When true, layout/page Canvas2D fields always mount on public routes (brand backdrop).
 * Animation still respects prefers-reduced-motion via useCanvasTelemetryField (static frame).
 */
export const FORCE_AMBIENT_MOTION: boolean = true;
