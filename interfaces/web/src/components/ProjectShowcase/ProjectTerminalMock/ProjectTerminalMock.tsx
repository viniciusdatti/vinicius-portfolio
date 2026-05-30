// Core
import React from 'react';

// Styles
import {
  MockWindow,
  MockWindowBar,
  MockDot,
  MockTerminalBody,
  TerminalShimmerWash,
  TerminalCodeLine as TerminalCodeLineStyled,
  TerminalCursor,
} from '../ProjectShowcase.style';

// Types
import {
  ProjectTerminalMockProps,
  TerminalCodeLine,
  MockWindowScene,
} from '../ProjectShowcase.types';

// ProjectTerminalMock
import {
  getMockWindowSceneForRepository,
  getTerminalSnippetLinesForRepository,
} from './ProjectTerminalMock.helpers';

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
