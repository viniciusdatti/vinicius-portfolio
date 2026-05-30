// HeroVisual3D
import {
  BURST_CYCLE_S,
  BURST_MAX_SCALE,
  BURST_MIN_SCALE,
  IDLE_DRIFT_X,
  IDLE_DRIFT_Z,
  POINTER_SPREAD,
  SPHERE_HEIGHT_STRETCH,
  SPHERE_WIDTH_STRETCH,
  TAU,
} from './HeroVisual3D.constants';

export const resolveIdleOffset = (elapsedS: number): { x: number; z: number } => ({
  x: IDLE_DRIFT_X * Math.sin(elapsedS * 0.42),
  z: IDLE_DRIFT_Z * Math.cos(elapsedS * 0.36),
});

export const mapHeroPointerToOffset = (
  normX: number,
  normY: number,
): { x: number; z: number } => ({
  x: (normX - 0.5) * 2 * POINTER_SPREAD,
  z: (normY - 0.5) * 2 * POINTER_SPREAD,
});

export const isPointerInsideHero = (
  clientX: number,
  clientY: number,
  rect: DOMRect,
): boolean => (
  clientX >= rect.left
  && clientX <= rect.right
  && clientY >= rect.top
  && clientY <= rect.bottom
);

export const resolveBurstScale = (elapsedS: number): number => {
  const wave: number = 0.5 + 0.5 * Math.sin((elapsedS / BURST_CYCLE_S) * TAU);
  return BURST_MIN_SCALE + (BURST_MAX_SCALE - BURST_MIN_SCALE) * wave;
};

export const buildParticlePositions = (count: number, radius: number): Float32Array => {
  const positions: Float32Array = new Float32Array(count * 3);
  const goldenAngle: number = Math.PI * (3 - Math.sqrt(5));

  for (let i: number = 0; i < count; i += 1) {
    const t: number = (i + 0.5) / count;
    const y: number = 1 - t * 2;
    const ring: number = Math.sqrt(Math.max(0, 1 - y * y));
    const theta: number = goldenAngle * i;
    const shell: number = Math.cbrt(t);
    const dist: number = radius * shell;

    positions[i * 3] = Math.cos(theta) * ring * dist * SPHERE_WIDTH_STRETCH;
    positions[i * 3 + 1] = y * dist * SPHERE_HEIGHT_STRETCH;
    positions[i * 3 + 2] = Math.sin(theta) * ring * dist;
  }

  return positions;
};
