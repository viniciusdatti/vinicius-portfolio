/**
 * Hooks module exports.
 */

export { useProjects, projectsQueryKey } from './useProjects';
export { useSkills, skillsQueryKey } from './useSkills';
export { useCertificates, certificatesQueryKey } from './useCertificates';
export { useLocationKey } from './useLocationKey';
export { useTelemetry } from './useTelemetry';
export { useCountUp } from './useCountUp';
// Note: useChat and useAdminChat are not exported here to avoid circular dependencies
// Import them directly when needed:
// - useChat: from './hooks/useChat' (LiveChannel workspace surface)
// - useAdminChat: from './hooks/useAdminChat' (for admin pages)
