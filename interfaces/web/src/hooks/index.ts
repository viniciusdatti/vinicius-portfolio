/**
 * Hooks module exports.
 */

export { useProjects, projectsQueryKey } from './useProjects';
export { useSkills, skillsQueryKey } from './useSkills';
export { useCertificates, certificatesQueryKey } from './useCertificates';
// Note: useChat and useAdminChat are not exported here to avoid circular dependencies
// Import them directly when needed:
// - useChat: from './hooks/useChat' (for LiveLab page)
// - useAdminChat: from './hooks/useAdminChat' (for admin pages)
