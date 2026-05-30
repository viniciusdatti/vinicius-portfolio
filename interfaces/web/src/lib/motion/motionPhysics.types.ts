export interface PhysicalTiltResult {
  rotateX: number;
  rotateY: number;
}

export type ClampDevicePixelRatioFn = (
  devicePixelRatio: number,
  max?: number,
) => number;

export type ResolvePhysicalTiltFn = (
  x: number,
  y: number,
  maxTiltDeg?: number,
) => PhysicalTiltResult;

export interface PhysicalSpringStepResult {
  value: number;
  velocity: number;
}

export type StepPhysicalSpringFn = (
  current: number,
  velocity: number,
  target: number,
  delta: number,
  stiffness?: number,
  damping?: number,
  mass?: number,
) => PhysicalSpringStepResult;
