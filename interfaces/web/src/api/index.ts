/**
 * API module exports.
 */

export { apiClient, ApiError } from '@/api/client';
export {
  isApiError,
  isHttpStatus,
  isNotFoundError,
  isUnauthorizedError,
} from '@/api/guards';
export { getProjects } from '@/api/projects';
export { getSkills } from '@/api/skills';
export { getCertificates } from '@/api/certificates';
export {
  submitContact,
  type ContactSubmitPayload,
  type ContactSubmitResponse,
} from '@/api/contact';
