import type { Project, Technology } from '../../data/types';
import type { ChatMessage } from '../../types';
import { ChatMessageSenderType } from '../../types';

export const mockTechnology = (
  overrides: Partial<Technology> = {}
): Technology => ({
  id: 1,
  name: 'React',
  slug: 'react',
  ...overrides,
});

export const mockProject = (overrides: Partial<Project> = {}): Project => ({
  id: 1,
  title: 'PatriotDashboard',
  title_pt: 'PatriotDashboard',
  description: 'Industrial telemetry dashboard with real-time WebSocket monitoring.',
  description_pt: 'Dashboard de telemetria industrial com monitoramento WebSocket em tempo real.',
  repository_url: 'https://github.com/viniciusdati/patriotdashboard',
  demo_url: null,
  technologies: [
    mockTechnology({ id: 1, name: 'React', slug: 'react' }),
    mockTechnology({ id: 2, name: 'TypeScript', slug: 'typescript' }),
    mockTechnology({ id: 3, name: 'FastAPI', slug: 'fastapi' }),
  ],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
  ...overrides,
});

export const mockProjectList = (): Project[] => [
  mockProject({ id: 1, title: 'PatriotDashboard' }),
  mockProject({
    id: 2,
    title: 'PortfolioV2',
    title_pt: 'PortfolioV2',
    repository_url: 'https://github.com/viniciusdati/portfolio',
    technologies: [
      mockTechnology({ id: 1, name: 'React', slug: 'react' }),
      mockTechnology({ id: 4, name: 'Socket.io', slug: 'socketio' }),
    ],
  }),
  mockProject({
    id: 3,
    title: 'OtherProject',
    title_pt: null,
    repository_url: 'https://github.com/viniciusdati/other',
    technologies: [
      mockTechnology({ id: 2, name: 'TypeScript', slug: 'typescript' }),
    ],
  }),
];

export const mockChatMessage = (
  overrides: Partial<ChatMessage> = {}
): ChatMessage => ({
  id: 1,
  content: 'Hello, I saw your portfolio!',
  sender_type: ChatMessageSenderType.Visitor,
  is_read: false,
  created_at: '2024-01-01T12:00:00Z',
  ...overrides,
});

export const mockAdminMessage = (
  overrides: Partial<ChatMessage> = {}
): ChatMessage =>
  mockChatMessage({
    id: 2,
    content: 'Thanks for reaching out!',
    sender_type: ChatMessageSenderType.Admin,
    is_read: true,
    ...overrides,
  });
