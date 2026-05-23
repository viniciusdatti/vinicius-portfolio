/**
 * @fileoverview Animated monospace terminal mock inside project showcase preview panels.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React from 'react';

// Types
import type {
  ProjectTerminalMockProps,
  TerminalCodeLine,
} from '@/components/ProjectShowcase/ProjectShowcase.types';

// Components
import { MockWindowScene } from '@/components/ProjectShowcase/ProjectShowcase.types';
import {
  getMockWindowSceneForRepository,
  getTerminalSnippetLinesForRepository,
} from '@/components/ProjectShowcase/projectTerminalSnippets';
import {
  MockWindow,
  MockWindowBar,
  MockDot,
  MockTerminalBody,
  TerminalShimmerWash,
  TerminalCodeLine as TerminalCodeLineStyled,
  TerminalCursor,
} from '@/components/ProjectShowcase/ProjectShowcase.style';

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

export const ProjectTerminalMock: React.FC<ProjectTerminalMockProps> = ({
  repositorySlug,
}): React.ReactElement => {
  const lines: TerminalCodeLine[] = getTerminalSnippetLinesForRepository(repositorySlug);
  const scene: MockWindowScene = getMockWindowSceneForRepository(repositorySlug);

  return (
    <MockWindow data-scene={scene}>
      <MockWindowBar>
        <MockDot />
        <MockDot />
        <MockDot />
      </MockWindowBar>
      <MockTerminalBody>
        <TerminalShimmerWash aria-hidden />
        {lines.map((line: TerminalCodeLine) => (
          <TerminalCodeLineStyled
            key={`${repositorySlug}-${line.delay}-${line.text}`}
            $role={line.role}
            $delay={line.delay}
          >
            {line.text}
          </TerminalCodeLineStyled>
        ))}
        <TerminalCursor aria-hidden />
      </MockTerminalBody>
    </MockWindow>
  );
};
