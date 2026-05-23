/**
 * Hooks module exports.
 */

export { useProjects, projectsQueryKey } from '@/hooks/useProjects';
export { useSkills, skillsQueryKey } from '@/hooks/useSkills';
export { useCertificates, certificatesQueryKey } from '@/hooks/useCertificates';
export { useLocationKey } from '@/hooks/useLocationKey';
export { useTelemetrySocket } from '@/hooks/useTelemetry';
export {
  TELEMETRY_EVENT_LOG_MAX,
  SensorStatus,
  TelemetryEventType,
  type SensorReading,
  type TelemetryEventLogEntry,
  type TelemetryState,
  type TelemetryTick,
} from '@/types/telemetry';
export { useCountUp } from '@/hooks/useCountUp';
export { useScrollMotion } from '@/hooks/useScrollMotion';
export type { ScrollMotionContract } from '@/hooks/useScrollMotion';
export {
  ScrollMotionViewportProvider,
  useScrollMotionViewport,
} from '@/hooks/scrollMotionViewport';
export type { ScrollMotionViewportContextValue } from '@/hooks/scrollMotionViewport';
export { useTypewriterReveal } from '@/hooks/useTypewriterReveal';
