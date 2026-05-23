/**
 * @fileoverview Types and enums for project showcase cards, grid, and terminal mock.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Types
import type { Variants } from 'framer-motion';

import type { Project } from '@/data/types';
import type { Language } from '@/types';

/* *************************************************************************************************
 ********************************************** ENUMS **********************************************
 ************************************************************************************************ */

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

/** Mock window chrome accent paired with repository-specific terminal lines. */
export enum MockWindowScene {
  Shell = 'shell',
  Table = 'table',
  Code = 'code',
}

/** Syntax highlighting role for animated terminal mock lines. */
export enum TerminalCodeTokenRole {
  Keyword = 'keyword',
  Accent = 'accent',
  Muted = 'muted',
  Plain = 'plain',
}

/** GitHub repository slugs aligned with backend portfolio_catalog.PORTFOLIO_PROJECTS. */
export enum PortfolioRepositorySlug {
  ViniciusPortfolio = 'vinicius-portfolio',
  ReactGram = 'ReactGram',
  TasksFlaskCrud = 'tasks-flask-crud',
  SampleFlaskAuth = 'sample-flask-auth',
}

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

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
