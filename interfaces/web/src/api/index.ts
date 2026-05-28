/**
 * API module exports.
 */

// Component
export { apiClient, ApiError } from './client';
export {
  isApiError,
  isHttpStatus,
  isNotFoundError,
  isUnauthorizedError,
} from './guards';
export { getProjects } from './projects';
export { getSkills } from './skills';
export { getCertificates } from './certificates';
export {
  submitContact,
  type ContactSubmitPayload,
  type ContactSubmitResponse,
} from './contact';
