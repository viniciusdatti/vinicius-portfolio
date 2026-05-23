// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export enum TelemetryEventLogPlacement {
  Embedded = 'embedded',
  Flow = 'flow',
  None = 'none',
}

export interface TelemetryMonitorProps {
  eventLogPlacement?: TelemetryEventLogPlacement;
}
