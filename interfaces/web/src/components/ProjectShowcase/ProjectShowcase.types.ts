// Types
import type { Project } from '../../data/types';
import { Language } from '../../types';

export enum ProjectShowcaseVariant {
  Featured = 'featured',
  Standard = 'standard',
  Compact = 'compact',
}

export enum ProjectCanvasTone {
  A = 0,
  B = 1,
  C = 2,
}

export enum ProjectShowcaseDetailMode {
  Inline = 'inline',
  Callback = 'callback',
}

export interface ProjectShowcaseCardProps {
  project: Project;
  language: Language;
  variant: ProjectShowcaseVariant;
  canvasTone: ProjectCanvasTone;
  indexLabel: string;
  isSelected: boolean;
  onSelect: (project: Project) => void;
}

export interface ProjectShowcaseGridProps {
  projects: Project[];
  language: Language;
  compact?: boolean;
  detailMode?: ProjectShowcaseDetailMode;
  onSelectProject?: (project: Project) => void;
}
