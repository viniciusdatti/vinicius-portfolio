// Components
import { env } from '../config/env';
import { getApiRootUrl } from './apiRootUrl';

/**
 * Root health endpoint (outside /api/v1).
 */
export const getSystemHealthUrl = (): string => {
  if (env.apiUrl.startsWith('http')) {
    return `${getApiRootUrl()}/health`;
  }
  return '/health';
};
