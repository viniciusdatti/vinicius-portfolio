// Components
import { publicAssetUrl } from '@/config/env';

const TECH_SLUG_ICON_MAP: Record<string, string> = {
  react: 'icons/react.svg',
  typescript: 'icons/typescript.svg',
  javascript: 'icons/javascript.svg',
  python: 'icons/python.svg',
  fastapi: 'icons/fastapi.svg',
  postgresql: 'icons/postgresql.svg',
  docker: 'icons/docker.svg',
  git: 'icons/git.svg',
  html5: 'icons/html5.svg',
  css3: 'icons/css3.svg',
  playwright: 'icons/playwright.svg',
  'styled-components': 'icons/styled-components.svg',
  socketio: 'icons/socketio.svg',
  websocket: 'icons/socketio.svg',
  jest: 'icons/jest.svg',
};

/**
 * Resolves a public icon URL for a technology slug, or null when unknown.
 */
export const getTechIconUrl = (slug: string): string | null => {
  const normalizedSlug: string = slug.toLowerCase().trim();
  const iconPath: string | undefined = TECH_SLUG_ICON_MAP[normalizedSlug];
  if (!iconPath) {
    return null;
  }
  return publicAssetUrl(iconPath);
};
