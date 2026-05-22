/**
 * Shared test builders (portfolio). Reuse in unit tests instead of hand-building objects.
 */

import type { Project, Technology } from '@/data/types';
import {
  ChatMessageSenderType,
  SkillCategory,
  type Certificate,
  type ChatMessage,
  type Skill,
} from '@/types';

export const buildFakeTechnology = (
  overrides: Partial<Technology> = {},
): Technology => ({
  id: 1,
  name: 'React',
  slug: 'react',
  ...overrides,
});

export const buildFakeProject = (overrides: Partial<Project> = {}): Project => ({
  id: 1,
  title: 'PatriotDashboard',
  title_pt: 'PatriotDashboard',
  description: 'Industrial telemetry dashboard with real-time WebSocket monitoring.',
  description_pt: 'Dashboard de telemetria industrial com monitoramento WebSocket em tempo real.',
  repository_url: 'https://github.com/viniciusdati/patriotdashboard',
  demo_url: null,
  technologies: [
    buildFakeTechnology({ id: 1, name: 'React', slug: 'react' }),
    buildFakeTechnology({ id: 2, name: 'TypeScript', slug: 'typescript' }),
    buildFakeTechnology({ id: 3, name: 'FastAPI', slug: 'fastapi' }),
  ],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
  ...overrides,
});

export const MOCKED_PROJECT_LIST: Project[] = [
  buildFakeProject({ id: 1, title: 'PatriotDashboard' }),
  buildFakeProject({
    id: 2,
    title: 'PortfolioV2',
    title_pt: 'PortfolioV2',
    repository_url: 'https://github.com/viniciusdati/portfolio',
    technologies: [
      buildFakeTechnology({ id: 1, name: 'React', slug: 'react' }),
      buildFakeTechnology({ id: 4, name: 'Socket.io', slug: 'socketio' }),
    ],
  }),
  buildFakeProject({
    id: 3,
    title: 'OtherProject',
    title_pt: null,
    repository_url: 'https://github.com/viniciusdati/other',
    technologies: [
      buildFakeTechnology({ id: 2, name: 'TypeScript', slug: 'typescript' }),
    ],
  }),
];

export const buildFakeChatMessage = (
  overrides: Partial<ChatMessage> = {},
): ChatMessage => ({
  id: 1,
  content: 'Hello, I saw your portfolio!',
  sender_type: ChatMessageSenderType.Visitor,
  is_read: false,
  created_at: '2024-01-01T12:00:00Z',
  ...overrides,
});

export const buildFakeAdminChatMessage = (
  overrides: Partial<ChatMessage> = {},
): ChatMessage => buildFakeChatMessage({
  id: 2,
  content: 'Thanks for reaching out!',
  sender_type: ChatMessageSenderType.Admin,
  is_read: true,
  ...overrides,
});

export const buildFakeSkill = (overrides: Partial<Skill> = {}): Skill => ({
  id: 1,
  name: 'React',
  name_pt: 'React',
  category: SkillCategory.Frontend,
  proficiency: 90,
  icon_url: '/icons/react.svg',
  display_order: 1,
  is_active: true,
  ...overrides,
});

export const MOCKED_SKILL_LIST: Skill[] = [
  buildFakeSkill({ id: 1, name: 'React', category: SkillCategory.Frontend }),
  buildFakeSkill({
    id: 2,
    name: 'Python',
    category: SkillCategory.Backend,
    icon_url: '/icons/python.svg',
  }),
];

export const buildFakeCertificate = (overrides: Partial<Certificate> = {}): Certificate => ({
  id: 1,
  name: 'React Explorer',
  name_pt: 'React Explorer',
  platform: 'Alura',
  platform_logo_url: null,
  certificate_url: 'https://example.com/cert',
  image_url: null,
  year: 2023,
  display_order: 1,
  is_active: true,
  ...overrides,
});

export const MOCKED_CERTIFICATE_LIST: Certificate[] = [
  buildFakeCertificate({ id: 1 }),
  buildFakeCertificate({ id: 2, platform: 'Rocketseat', name: 'Python Fundamentals' }),
];
