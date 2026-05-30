export enum TelemetryFieldVariant {
  Void = 'void',
  Observatory = 'observatory',
  Monitor = 'monitor',
  WorkA = 'work_a',
  WorkB = 'work_b',
  WorkC = 'work_c',
  Timeline = 'timeline',
  TopologicalMesh = 'topological_mesh',
  Constellation = 'constellation',
  ProjectsWireframe = 'projects_wireframe',
  LiveLabStream = 'live_lab_stream',
}

export interface TelemetryFieldColors {
  grid: string;
  accent: string;
  node: string;
  background: string;
}

export interface TelemetryFieldPointer {
  x: number;
  y: number;
  active: boolean;
}

export interface ConstellationNodeState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface TelemetryFieldDrawOptions {
  variant: TelemetryFieldVariant;
  time: number;
  pointer: TelemetryFieldPointer;
  colors: TelemetryFieldColors;
  pulse?: number;
  scrollOffset?: number;
  constellationNodes?: ConstellationNodeState[];
}
