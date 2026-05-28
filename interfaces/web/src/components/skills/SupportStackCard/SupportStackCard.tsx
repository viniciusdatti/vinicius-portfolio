/**
 * @fileoverview Canonical support-stack technology card — single horizontal archetype.
 */

// Core
import React from 'react';

// Hooks
import type { UsePhysicalInteractionResult } from '../../../hooks/usePhysicalInteraction.types';
import { usePhysicalInteraction } from '../../../hooks/usePhysicalInteraction';

// Component
import type { SupportStackCardProps } from './SupportStackCard.types';
import {
  SupportStackCardInner,
  SupportStackCardRoot,
  SupportStackCardRow,
  SupportStackDescription,
  SupportStackIconWell,
  SupportStackLabel,
  SupportStackTextColumn,
} from './SupportStackCard.style';

export const SupportStackCard: React.FC<SupportStackCardProps> = ({
  skill,
  displayName,
  description,
  iconUrl,
  tier,
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
      $tier={tier}
      style={motionProps.style}
      whileTap={motionProps.whileTap}
      data-skill-id={skill.id}
    >
      <SupportStackCardInner>
        <SupportStackCardRow>
          <SupportStackIconWell $tier={tier}>
            <img src={iconUrl} alt="" aria-hidden />
          </SupportStackIconWell>
          <SupportStackTextColumn>
            <SupportStackLabel $tier={tier}>{displayName}</SupportStackLabel>
            {description ? (
              <SupportStackDescription $tier={tier}>{description}</SupportStackDescription>
            ) : null}
          </SupportStackTextColumn>
        </SupportStackCardRow>
      </SupportStackCardInner>
    </SupportStackCardRoot>
  );
};
