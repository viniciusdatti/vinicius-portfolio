// Components
import { env } from '@/config/env';

/**
 * API origin for sockets and /health (strips /api/v1 suffix from env.apiUrl).
 * Relative apiUrl (e.g. /api/v1) resolves to the current browser origin in dev.
 */
export const getApiRootUrl = (): string => {
  const stripped: string = env.apiUrl.replace(/\/api\/v1\/?$/i, '');
  if (stripped.startsWith('http')) {
    return stripped;
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:8000';
};
