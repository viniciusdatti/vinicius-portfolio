// Core
import React from 'react';

export type ObservatoryIdleLayerProps = Record<string, never>;

export type ObservatoryIdleLayerComponent = React.FC<ObservatoryIdleLayerProps>;

export type IdleImplFn = () => React.ReactElement | null;

export type MotionPausedEffectCleanup = () => void;
