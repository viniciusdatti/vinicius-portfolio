// Types
import type {
  ClampDevicePixelRatioFn,
  PhysicalSpringStepResult,
  PhysicalTiltResult,
  ResolvePhysicalTiltFn,
  StepPhysicalSpringFn,
} from '@/lib/motionPhysics.types';

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

/** Maximum canvas DPR — keeps telemetry fields within GPU budget. */
export const MAX_DEVICE_PIXEL_RATIO: number = 1.5;

/** Rauno/Stripe-style physical spring for hover, tilt, and layout morph. */
export const PHYSICAL_SPRING_STIFFNESS: number = 150;

export const PHYSICAL_SPRING_DAMPING: number = 20;

export const PHYSICAL_SPRING_MASS: number = 0.8;

export const PHYSICAL_PERSPECTIVE_PX: number = 900;

export const PHYSICAL_MAX_TILT_DEG: number = 6;

export const PHYSICAL_LIFT_PX: number = 3;

export const PHYSICAL_TAP_SCALE: number = 0.98;

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

/**
 * Clamps devicePixelRatio for canvas and WebGL surfaces.
 */
export const clampDevicePixelRatio: ClampDevicePixelRatioFn = (
  devicePixelRatio: number,
  max: number = MAX_DEVICE_PIXEL_RATIO,
): number => Math.min(Math.max(devicePixelRatio, 1), max);

/**
 * Maps normalized pointer position (0–1) to perspective tilt degrees.
 */
export const resolvePhysicalTilt: ResolvePhysicalTiltFn = (
  x: number,
  y: number,
  maxTiltDeg: number = PHYSICAL_MAX_TILT_DEG,
): PhysicalTiltResult => {
  const rotateX: number = (y - 0.5) * -maxTiltDeg * 2;
  const rotateY: number = (x - 0.5) * maxTiltDeg * 2;
  return { rotateX, rotateY };
};

/**
 * Integrates one frame of a damped spring toward a target (matches Framer physical spring).
 */
export const stepPhysicalSpring: StepPhysicalSpringFn = (
  current: number,
  velocity: number,
  target: number,
  delta: number,
  stiffness: number = PHYSICAL_SPRING_STIFFNESS,
  damping: number = PHYSICAL_SPRING_DAMPING,
  mass: number = PHYSICAL_SPRING_MASS,
): PhysicalSpringStepResult => {
  const springForce: number = (target - current) * stiffness;
  const dampingForce: number = velocity * damping;
  const acceleration: number = (springForce - dampingForce) / mass;
  const nextVelocity: number = velocity + acceleration * delta;
  const nextValue: number = current + nextVelocity * delta;
  return { value: nextValue, velocity: nextVelocity };
};
