// Config
import { env } from '../config/env';

// Utils
import { getApiRootUrl } from './apiRootUrl';

export const getSystemHealthUrl = (): string => {
  if (env.apiUrl.startsWith('http')) {
    return `${getApiRootUrl()}/health`;
  }
  return '/health';
};
