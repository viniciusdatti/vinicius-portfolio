// Types
import { Project, Technology } from '../data/types';
import {
  SkillCategory, Certificate, Skill,
} from '../types';

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
  title: 'vinicius-portfolio',
  title_pt: 'vinicius-portfolio',
  description: 'Full-stack portfolio monorepo for this site (FastAPI + React/Vite).',
  description_pt: 'Monorepo full-stack deste portfólio (FastAPI + React/Vite).',
  repository_url: 'https://github.com/viniciusdatti/vinicius-portfolio',
  demo_url: null,
  is_featured: false,
  technologies: [
    buildFakeTechnology({ id: 1, name: 'React', slug: 'react' }),
    buildFakeTechnology({ id: 2, name: 'TypeScript', slug: 'typescript' }),
    buildFakeTechnology({ id: 3, name: 'Python', slug: 'python' }),
  ],
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-06-01T00:00:00Z',
  ...overrides,
});

export const MOCKED_PROJECT_LIST: Project[] = [
  buildFakeProject({
    id: 1,
    title: 'vinicius-portfolio',
    title_pt: 'vinicius-portfolio',
    is_featured: true,
    repository_url: 'https://github.com/viniciusdatti/vinicius-portfolio',
    technologies: [
      buildFakeTechnology({ id: 1, name: 'React', slug: 'react' }),
      buildFakeTechnology({ id: 2, name: 'TypeScript', slug: 'typescript' }),
      buildFakeTechnology({ id: 3, name: 'Python', slug: 'python' }),
    ],
  }),
  buildFakeProject({
    id: 2,
    title: 'ReactGram',
    title_pt: 'ReactGram',
    description: 'CRA feed with Redux Toolkit and json-server mock API (reactgram/).',
    description_pt: 'Feed CRA com Redux Toolkit e API mock json-server (reactgram/).',
    repository_url: 'https://github.com/viniciusdatti/ReactGram',
    technologies: [
      buildFakeTechnology({ id: 4, name: 'JavaScript', slug: 'javascript' }),
      buildFakeTechnology({ id: 5, name: 'React', slug: 'react' }),
    ],
  }),
  buildFakeProject({
    id: 3,
    title: 'tasks-flask-crud',
    title_pt: 'tasks-flask-crud',
    description: 'Flask in-memory task CRUD on /tasks with pytest.',
    description_pt: 'CRUD Flask de tarefas em memória em /tasks com pytest.',
    repository_url: 'https://github.com/viniciusdatti/tasks-flask-crud',
    technologies: [
      buildFakeTechnology({ id: 6, name: 'Python', slug: 'python' }),
      buildFakeTechnology({ id: 7, name: 'Flask', slug: 'flask' }),
    ],
  }),
];

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
  certificate_url: 'https://example.com/cert/react-explorer',
  image_url: null,
  year: 2024,
  display_order: 1,
  is_active: true,
  ...overrides,
});

export const MOCKED_CERTIFICATE_LIST: Certificate[] = [
  buildFakeCertificate(),
];
