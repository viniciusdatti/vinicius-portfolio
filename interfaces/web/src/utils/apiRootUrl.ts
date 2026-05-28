// Config
import { env } from '../config/env';

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
