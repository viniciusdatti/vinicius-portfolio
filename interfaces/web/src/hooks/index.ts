/**
 * Hooks module exports.
 */

export { useProjects, projectsQueryKey } from './useProjects';
// Note: useChat and useAdminChat are not exported here to avoid circular dependencies
// Import them directly when needed:
// - useChat: from './hooks/useChat' (for LiveLab page)
// - useAdminChat: from './hooks/useAdminChat' (for admin pages)
