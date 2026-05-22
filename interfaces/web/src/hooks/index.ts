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
// Note: useChat and useAdminChat are not exported here to avoid circular dependencies
// Import them directly when needed:
// - useChat: from '@/hooks/hooks/useChat' (LiveChannel workspace surface)
// - useAdminChat: from '@/hooks/hooks/useAdminChat' (for admin pages)
