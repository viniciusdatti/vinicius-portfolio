export interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  repositoryUrl: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'designSystem',
    titleKey: 'projects.items.designSystem.title',
    descriptionKey: 'projects.items.designSystem.description',
    tags: ['React', 'TypeScript', 'Storybook', 'Styled Components'],
    repositoryUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
  {
    id: 'dashboard',
    titleKey: 'projects.items.dashboard.title',
    descriptionKey: 'projects.items.dashboard.description',
    tags: ['React', 'TypeScript', 'Chart.js', 'REST API'],
    repositoryUrl: 'https://github.com',
  },
  {
    id: 'platform',
    titleKey: 'projects.items.platform.title',
    descriptionKey: 'projects.items.platform.description',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    repositoryUrl: 'https://github.com',
    demoUrl: 'https://example.com',
  },
];
