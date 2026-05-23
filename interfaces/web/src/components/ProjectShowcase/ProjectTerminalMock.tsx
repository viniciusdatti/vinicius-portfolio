// Core
import React from 'react';

// Types
import type { MockWindowScene } from '@/components/ProjectShowcase/ProjectShowcase.types';
import { getTerminalSnippetLines } from '@/components/ProjectShowcase/projectTerminalSnippets';
import type { TerminalCodeLine } from '@/components/ProjectShowcase/projectTerminalSnippets';

// Components
import {
  MockWindow,
  MockWindowBar,
  MockDot,
  MockTerminalBody,
  TerminalShimmerWash,
  TerminalCodeLine as TerminalCodeLineStyled,
  TerminalCursor,
} from '@/components/ProjectShowcase/ProjectShowcase.style';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface ProjectTerminalMockProps {
  scene: MockWindowScene;
}

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

export const ProjectTerminalMock: React.FC<ProjectTerminalMockProps> = ({
  scene,
}): React.ReactElement => {
  const lines: TerminalCodeLine[] = getTerminalSnippetLines(scene);

  return (
    <MockWindow>
      <MockWindowBar>
        <MockDot />
        <MockDot />
        <MockDot />
      </MockWindowBar>
      <MockTerminalBody>
        <TerminalShimmerWash aria-hidden />
        {lines.map((line: TerminalCodeLine) => (
          <TerminalCodeLineStyled
            key={line.text}
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
