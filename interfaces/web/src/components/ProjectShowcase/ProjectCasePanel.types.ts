// Core
import type { FC, ReactElement } from 'react';

// Types
import type { Project } from '@/data/types';
import { Language } from '@/types';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface ProjectCasePanelProps {
  project: Project | null;
  language: Language;
  indexLabel: string;
  onClose: () => void;
}

export type ProjectCasePanelComponent = FC<ProjectCasePanelProps>;

export type ProjectCasePanelRenderFn = (props: ProjectCasePanelProps) => ReactElement;

export type ProjectCasePanelCloseHandler = () => void;
