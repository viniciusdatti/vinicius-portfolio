/**
 * API module exports.
 */

export { apiClient, ApiError } from './client';
export { getProjects } from './projects';
export { getSkills } from './skills';
export { getCertificates } from './certificates';
export {
  submitContact,
  type ContactSubmitPayload,
  type ContactSubmitResponse,
} from './contact';
