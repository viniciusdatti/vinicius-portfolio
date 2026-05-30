// Core
import { FC, ReactElement } from 'react';

// Types
import { Project } from '../../../data/types';
import { Language } from '../../../types';

export interface ProjectCasePanelProps {
  project: Project | null;
  language: Language;
  indexLabel: string;
  onClose: () => void;
}

export type ProjectCasePanelComponent = FC<ProjectCasePanelProps>;

export type ProjectCasePanelRenderFn = (props: ProjectCasePanelProps) => ReactElement;

export type ProjectCasePanelCloseHandler = () => void;
