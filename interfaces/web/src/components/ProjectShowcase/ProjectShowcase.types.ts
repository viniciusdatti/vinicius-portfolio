// Libraries
import { Variants } from 'framer-motion';

// Types
import { Project } from '../../data/types';
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

export enum MockWindowScene {
  Shell = 'shell',
  Table = 'table',
  Code = 'code',
}

export enum TerminalCodeTokenRole {
  Keyword = 'keyword',
  Accent = 'accent',
  Muted = 'muted',
  Plain = 'plain',
}

export enum PortfolioRepositorySlug {
  ViniciusPortfolio = 'vinicius-portfolio',
  ReactGram = 'ReactGram',
  TasksFlaskCrud = 'tasks-flask-crud',
  SampleFlaskAuth = 'sample-flask-auth',
}

export interface TerminalCodeLine {
  text: string;
  role: TerminalCodeTokenRole;
  delay: string;
}

export interface ProjectShowcaseCardProps {
  project: Project;
  language: Language;
  variant: ProjectShowcaseVariant;
  canvasTone: ProjectCanvasTone;
  indexLabel: string;
  isSelected: boolean;
  onSelect: (project: Project) => void;
  itemVariants: Variants;
}

export interface ProjectShowcaseGridProps {
  projects: Project[];
  language: Language;
  compact?: boolean;
  detailMode?: ProjectShowcaseDetailMode;
  onSelectProject?: (project: Project) => void;
}

export interface ProjectTerminalMockProps {
  repositorySlug: string;
}
