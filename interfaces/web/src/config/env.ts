const DEFAULT_API_URL: string = '/api/v1';

export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? DEFAULT_API_URL,
  appEnv: import.meta.env.VITE_APP_ENV ?? 'development',
  baseUrl: import.meta.env.BASE_URL,
} as const;

export const publicAssetUrl = (path: string): string => {
  const base: string = env.baseUrl.endsWith('/') ? env.baseUrl : `${env.baseUrl}/`;
  const normalized: string = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
};
