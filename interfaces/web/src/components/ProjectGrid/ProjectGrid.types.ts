// Types
import type { Project } from '../../data/types';
import type { Language } from '../../types';

export interface ProjectGridProps {
  projects: Project[];
  language?: Language;
}
