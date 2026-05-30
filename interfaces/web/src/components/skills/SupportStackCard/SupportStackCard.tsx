// Core
import React, { memo } from 'react';

// Hooks
import { UsePhysicalInteractionResult } from '../../../hooks/usePhysicalInteraction.types';
import { usePhysicalInteraction } from '../../../hooks/usePhysicalInteraction';

// Styles
import {
  SupportStackCardInner,
  SupportStackCardRoot,
  SupportStackCardRow,
  SupportStackDescription,
  SupportStackIconWell,
  SupportStackLabel,
  SupportStackTextColumn,
} from './SupportStackCard.style';

// Types
import { SupportStackCardProps } from './SupportStackCard.types';

export const SupportStackCard = memo(({
  skill,
  displayName,
  description,
  iconUrl,
  tier,
}: SupportStackCardProps): React.ReactElement => {
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
            <img
              src={iconUrl}
              alt=""
              aria-hidden
            />
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
});

SupportStackCard.displayName = 'SupportStackCard';
