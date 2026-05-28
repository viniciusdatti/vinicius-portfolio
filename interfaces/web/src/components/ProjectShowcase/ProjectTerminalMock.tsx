/**
 * @fileoverview Animated monospace terminal mock inside project showcase preview panels.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React from 'react';

// Component
import type {
  ProjectTerminalMockProps,
  TerminalCodeLine,
} from './ProjectShowcase.types';
import { MockWindowScene } from './ProjectShowcase.types';
import {
  getMockWindowSceneForRepository,
  getTerminalSnippetLinesForRepository,
} from './projectTerminalSnippets';
import {
  MockWindow,
  MockWindowBar,
  MockDot,
  MockTerminalBody,
  TerminalShimmerWash,
  TerminalCodeLine as TerminalCodeLineStyled,
  TerminalCursor,
} from './ProjectShowcase.style';

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
