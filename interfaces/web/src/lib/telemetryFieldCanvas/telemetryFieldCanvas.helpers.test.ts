// Libraries
import {
  describe,
  expect,
  it,
} from 'vitest';

// Types
import {
  ConstellationNodeState,
  TelemetryFieldPointer,
  TelemetryFieldVariant,
} from './telemetryFieldCanvas.types';

// TelemetryFieldCanvas
import {
  createConstellationNodes,
  resolveGridDensity,
  resolveParticleCount,
  stepConstellationNodes,
} from './telemetryFieldCanvas.helpers';

describe('lib/telemetryFieldCanvas.helpers', (): void => {
  // METHOD: resolveGridDensity *******************************

  it('should resolve observatory grid density', (): void => {
    const density = resolveGridDensity(TelemetryFieldVariant.Observatory);
    expect(density).toEqual({ cols: 15, rows: 9 });
  });

  it('should resolve void grid density as default', (): void => {
    const density = resolveGridDensity(TelemetryFieldVariant.Void);
    expect(density).toEqual({ cols: 14, rows: 10 });
  });

  // METHOD: resolveParticleCount *******************************

  it('should resolve monitor particle count', (): void => {
    expect(resolveParticleCount(TelemetryFieldVariant.Monitor)).toBe(48);
  });

  // METHOD: createConstellationNodes *******************************

  it('should create normalized constellation nodes', (): void => {
    const nodes: ConstellationNodeState[] = createConstellationNodes(3);
    expect(nodes).toHaveLength(3);
    nodes.forEach((node: ConstellationNodeState): void => {
      expect(node.x).toBeGreaterThanOrEqual(0);
      expect(node.x).toBeLessThanOrEqual(1);
      expect(node.y).toBeGreaterThanOrEqual(0);
      expect(node.y).toBeLessThanOrEqual(1);
    });
  });

  // METHOD: stepConstellationNodes *******************************

  it('should clamp constellation nodes inside normalized bounds', (): void => {
    const pointer: TelemetryFieldPointer = { x: 0.5, y: 0.5, active: false };
    const nodes: ConstellationNodeState[] = createConstellationNodes(2);
    const next: ConstellationNodeState[] = stepConstellationNodes(nodes, 16.67, pointer);

    next.forEach((node: ConstellationNodeState): void => {
      expect(node.x).toBeGreaterThanOrEqual(0);
      expect(node.x).toBeLessThanOrEqual(1);
      expect(node.y).toBeGreaterThanOrEqual(0);
      expect(node.y).toBeLessThanOrEqual(1);
    });
  });

  it('should pull nodes toward active pointer coordinates', (): void => {
    const pointer: TelemetryFieldPointer = { x: 0.9, y: 0.1, active: true };
    const nodes: ConstellationNodeState[] = createConstellationNodes(1);
    const next: ConstellationNodeState[] = stepConstellationNodes(nodes, 16.67, pointer);

    expect(next[0].x).toBeGreaterThan(nodes[0].x);
    expect(next[0].y).toBeLessThan(nodes[0].y);
  });
});
