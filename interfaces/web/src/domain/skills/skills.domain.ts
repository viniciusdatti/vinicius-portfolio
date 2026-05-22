/**
 * Domain helpers for skills and certificates showcase.
 */

// Types
import type { Certificate, Skill } from '@/types';

// Config
import { publicAssetUrl } from '@/config/env';

/** Platform badge styling and logo assets. */
export interface PlatformConfig {
  logo: string;
  color: string;
  bgColor: string;
}

const SKILL_ICON_FILES: Record<string, string> = {
  React: 'icons/react.svg',
  TypeScript: 'icons/typescript.svg',
  JavaScript: 'icons/javascript.svg',
  HTML5: 'icons/html5.svg',
  CSS3: 'icons/css3.svg',
  'Styled Components': 'icons/styled-components.svg',
  Python: 'icons/python.svg',
  FastAPI: 'icons/fastapi.svg',
  PostgreSQL: 'icons/postgresql.svg',
  Jest: 'icons/jest.svg',
  Playwright: 'icons/playwright.svg',
  Git: 'icons/git.svg',
  Docker: 'icons/docker.svg',
  'VS Code': 'icons/vscode.svg',
  Cursor: 'cursor-icon.png',
  'AI tools': 'ai-tools-icon.png',
  WebSocket: 'icons/socketio.svg',
};

const PLATFORM_ORDER: Record<string, number> = {
  Rocketseat: 0,
  Alura: 1,
  Udemy: 2,
};

const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  logo: publicAssetUrl('icons/platforms/alura.svg'),
  color: '#64748b',
  bgColor: 'rgba(100, 116, 139, 0.1)',
};

const platformConfigMap: Record<string, PlatformConfig> = {
  Rocketseat: {
    logo: `data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">'
      + '<rect width="48" height="48" rx="8" fill="#8257E5"/>'
      + '<path fill="white" d="M24 8 L28 14 L28 26 L32 36 L24 30 L16 36 L20 26 L20 14 Z"/>'
      + '<circle cx="24" cy="20" r="3" fill="#8257E5"/>'
      + '</svg>',
    )}`,
    color: '#8257e5',
    bgColor: 'rgba(130, 87, 229, 0.1)',
  },
  Alura: {
    logo: publicAssetUrl('icons/platforms/alura.svg'),
    color: '#0066cc',
    bgColor: 'rgba(0, 102, 204, 0.1)',
  },
  Udemy: {
    logo: publicAssetUrl('icons/platforms/udemy.svg'),
    color: '#a435f0',
    bgColor: 'rgba(164, 53, 240, 0.1)',
  },
};

export function resolveSkillIconUrl(skill: Skill): string {
  if (skill.icon_url) {
    if (
      skill.icon_url.startsWith('http')
      || skill.icon_url.startsWith('data:')
      || skill.icon_url.startsWith('/')
    ) {
      return skill.icon_url;
    }
    return publicAssetUrl(skill.icon_url);
  }

  const fallbackPath: string = SKILL_ICON_FILES[skill.name]
    ?? `icons/${skill.name.toLowerCase().replace(/\s+/g, '-')}.svg`;
  return publicAssetUrl(fallbackPath);
}

export function resolveSkillDisplayName(skill: Skill, isPt: boolean): string {
  if (isPt && skill.name_pt) {
    return skill.name_pt;
  }
  return skill.name;
}

export function resolveCertificateDisplayName(cert: Certificate, isPt: boolean): string {
  if (isPt && cert.name_pt) {
    return cert.name_pt;
  }
  return cert.name;
}

export function getPlatformConfig(platform: string): PlatformConfig {
  return platformConfigMap[platform] ?? DEFAULT_PLATFORM_CONFIG;
}

export function sortCertificates(certs: Certificate[]): Certificate[] {
  return [...certs].sort((a: Certificate, b: Certificate): number => {
    const platformDiff: number = (PLATFORM_ORDER[a.platform] ?? 99)
      - (PLATFORM_ORDER[b.platform] ?? 99);
    if (platformDiff !== 0) {
      return platformDiff;
    }

    const orderDiff: number = a.display_order - b.display_order;
    if (orderDiff !== 0) {
      return orderDiff;
    }

    return (b.year ?? 0) - (a.year ?? 0);
  });
}
