/**
 * @fileoverview Canonical support-stack technology card — single horizontal archetype.
 */

// Core
import React from 'react';

// Types
import type { SupportStackCardProps } from '@/components/Skills/SupportStackCard/SupportStackCard.types';
import type { UsePhysicalInteractionResult } from '@/hooks/usePhysicalInteraction.types';

// Hooks
import { usePhysicalInteraction } from '@/hooks/usePhysicalInteraction';

// Components
import {
  SupportStackCardInner,
  SupportStackCardRoot,
  SupportStackCardRow,
  SupportStackDescription,
  SupportStackIcon,
  SupportStackLabel,
  SupportStackTextColumn,
} from '@/components/Skills/SupportStackCard/SupportStackCard.style';

// =================================================================================================
// ============================================= COMPONENT =========================================
// =================================================================================================

/**
 * Stack de suporte cell — operational glass, amber pointer torch, CSS liftMd, tap scale.
 */
export const SupportStackCard: React.FC<SupportStackCardProps> = ({
  skill,
  displayName,
  description,
  iconUrl,
  gridSpan,
}): React.ReactElement => {
  const {
    ref,
    motionProps,
  }: UsePhysicalInteractionResult<HTMLDivElement> = usePhysicalInteraction({
    enableSpotlight: true,
    enableTilt: false,
    enableLift: false,
  });

  return (
    <SupportStackCardRoot
      ref={ref}
      layout
      $gridSpan={gridSpan}
      style={motionProps.style}
      whileTap={motionProps.whileTap}
      data-skill-id={skill.id}
    >
      <SupportStackCardInner>
        <SupportStackCardRow>
          <SupportStackIcon>
            <img src={iconUrl} alt="" aria-hidden />
          </SupportStackIcon>
          <SupportStackTextColumn>
            <SupportStackLabel>{displayName}</SupportStackLabel>
            {description ? (
              <SupportStackDescription>{description}</SupportStackDescription>
            ) : null}
          </SupportStackTextColumn>
        </SupportStackCardRow>
      </SupportStackCardInner>
    </SupportStackCardRoot>
  );
};
