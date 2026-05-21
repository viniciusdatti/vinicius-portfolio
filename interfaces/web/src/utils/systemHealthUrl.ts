// Components
import { env } from '../config/env';

/**
 * Root health endpoint (outside /api/v1).
 */
export const getSystemHealthUrl = (): string => {
  const base: string = env.apiUrl.replace(/\/api\/v1\/?$/i, '');
  return `${base}/health`;
};
