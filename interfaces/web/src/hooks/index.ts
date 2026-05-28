/**
 * Hooks module exports.
 */

// Types
export {
  TELEMETRY_EVENT_LOG_MAX,
  SensorStatus,
  TelemetryEventType,
  type SensorReading,
  type TelemetryEventLogEntry,
  type TelemetryState,
  type TelemetryTick,
} from '../types/telemetry';

// Component
export { useProjects, projectsQueryKey } from './useProjects';
export { useSkills, skillsQueryKey } from './useSkills';
export { useCertificates, certificatesQueryKey } from './useCertificates';
export { useLocationKey } from './useLocationKey';
export { useTelemetrySocket } from './useTelemetry';
export { useCountUp } from './useCountUp';
export { useScrollMotion } from './useScrollMotion';
export type { ScrollMotionContract } from './useScrollMotion';
export {
  ScrollMotionViewportProvider,
  useScrollMotionViewport,
} from './scrollMotionViewport';
export type { ScrollMotionViewportContextValue } from './scrollMotionViewport';
export { useTypewriterReveal } from './useTypewriterReveal';
