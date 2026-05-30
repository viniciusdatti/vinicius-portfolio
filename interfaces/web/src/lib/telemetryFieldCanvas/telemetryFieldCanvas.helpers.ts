// Types
import {
  ConstellationNodeState,
  TelemetryFieldPointer,
  TelemetryFieldVariant,
} from './telemetryFieldCanvas.types';

// TelemetryFieldCanvas
import {
  OBS_COLS,
  OBS_ROWS,
  PARTICLE_COUNT_OBS,
  PARTICLE_COUNT_VOID,
  VOID_COLS,
  VOID_ROWS,
} from './telemetryFieldCanvas.constants';

export const resolveGridDensity = (
  variant: TelemetryFieldVariant,
): {
  cols: number;
  rows: number;
} => {
  if (variant === TelemetryFieldVariant.Observatory) {
    return { cols: OBS_COLS, rows: OBS_ROWS };
  }
  if (variant === TelemetryFieldVariant.Monitor) {
    return { cols: 18, rows: 12 };
  }
  if (
    variant === TelemetryFieldVariant.WorkB
    || variant === TelemetryFieldVariant.WorkC
  ) {
    return { cols: 16, rows: 10 };
  }
  return { cols: VOID_COLS, rows: VOID_ROWS };
};

export const resolveParticleCount = (variant: TelemetryFieldVariant): number => {
  if (variant === TelemetryFieldVariant.Observatory) {
    return PARTICLE_COUNT_OBS;
  }
  if (variant === TelemetryFieldVariant.Monitor) {
    return 48;
  }
  if (variant === TelemetryFieldVariant.WorkA) {
    return 28;
  }
  return PARTICLE_COUNT_VOID;
};

export const isWorkVariant = (variant: TelemetryFieldVariant): boolean => (
  variant === TelemetryFieldVariant.WorkA
  || variant === TelemetryFieldVariant.WorkB
  || variant === TelemetryFieldVariant.WorkC
);

export const createConstellationNodes = (count: number): ConstellationNodeState[] => {
  const nodes: ConstellationNodeState[] = [];
  for (let i = 0; i < count; i += 1) {
    const seed: number = i * 1.618;
    nodes.push({
      x: (Math.sin(seed * 2.1) * 0.5 + 0.5),
      y: (Math.cos(seed * 1.7) * 0.5 + 0.5),
      vx: (Math.sin(seed) * 0.5 + 0.5) * 0.00035 - 0.00017,
      vy: (Math.cos(seed * 1.3) * 0.5 + 0.5) * 0.00035 - 0.00017,
    });
  }
  return nodes;
};

export const stepConstellationNodes = (
  nodes: ConstellationNodeState[],
  deltaMs: number,
  pointer: TelemetryFieldPointer,
): ConstellationNodeState[] => {
  const scale: number = Math.min(2.5, deltaMs / 16.67);
  const pullStrength: number = pointer.active ? 0.00055 * scale : 0;

  return nodes.map((current: ConstellationNodeState): ConstellationNodeState => {
    let nextX: number = current.x + current.vx * scale;
    let nextY: number = current.y + current.vy * scale;
    let nextVx: number = current.vx;
    let nextVy: number = current.vy;

    if (pointer.active) {
      nextX += (pointer.x - nextX) * pullStrength;
      nextY += (pointer.y - nextY) * pullStrength;
    }

    if (nextX < 0 || nextX > 1) {
      nextVx *= -1;
      nextX = Math.min(1, Math.max(0, nextX));
    }
    if (nextY < 0 || nextY > 1) {
      nextVy *= -1;
      nextY = Math.min(1, Math.max(0, nextY));
    }
    return {
      x: nextX,
      y: nextY,
      vx: nextVx,
      vy: nextVy,
    };
  });
};
