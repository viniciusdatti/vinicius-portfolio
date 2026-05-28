// Core
import React from 'react';

// Component
import {
  HeroHeadline,
  HeroHeadlineBlock,
  HeroHeadlineLine,
  HeroHeadlineBlockLabel,
} from './Hero.style';

export interface HeroHeadlineBlockConfig {
  label: string;
  line: string;
  accentLine?: boolean;
}

interface HeroHeadlineChoreographyProps {
  blocks: HeroHeadlineBlockConfig[];
}

/* *************************************************************************************************
 ******************************************** COMPONENT ********************************************
 ************************************************************************************************ */

/**
 * Narrative headline stack — microscopic mono labels over high-contrast display lines.
 */
export const HeroHeadlineChoreography: React.FC<HeroHeadlineChoreographyProps> = ({
  blocks,
}): React.ReactElement => (
  <HeroHeadline>
    {blocks.map((block: HeroHeadlineBlockConfig) => {
      const isAccentLine: boolean = block.accentLine === true;

      return (
        <HeroHeadlineBlock key={block.label}>
          <HeroHeadlineBlockLabel>{block.label}</HeroHeadlineBlockLabel>
          <HeroHeadlineLine $accent={isAccentLine}>{block.line}</HeroHeadlineLine>
        </HeroHeadlineBlock>
      );
    })}
  </HeroHeadline>
);
