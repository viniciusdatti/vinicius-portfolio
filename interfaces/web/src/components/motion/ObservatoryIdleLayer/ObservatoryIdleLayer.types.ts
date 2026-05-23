// Core
import type React from 'react';

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

/** Global ambient idle layer — no configurable props. */
export type ObservatoryIdleLayerProps = Record<string, never>;

/** Global ambient idle layer component contract. */
export type ObservatoryIdleLayerComponent = React.FC<ObservatoryIdleLayerProps>;

export type IdleImplFn = () => React.ReactElement | null;

/** @deprecated Use IdleLayerRenderFn — kept for barrel compatibility. */
export type IdleLayerRenderFn = IdleImplFn;

/** @deprecated Use IdleImplFn — kept for barrel compatibility. */
export type ObservatoryIdleLayerImplFn = IdleImplFn;

export type MotionPausedEffectCleanup = () => void;
