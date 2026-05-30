// Core
import React from 'react';

// Hooks
import { UsePhysicalInteractionResult } from '../../../../hooks/usePhysicalInteraction.types';
import { usePhysicalInteraction } from '../../../../hooks/usePhysicalInteraction';

// Styles
import { SkillsStaggerSlot } from '../../Skills.style';
import { SkillEditorialCard } from '../SkillsEditorialSection.style';

// Types
import { SkillLayoutTier } from '../../../../domain/skills';
import { SkillEditorialCardShellProps } from './SkillEditorialCardShell.types';

// SkillsEditorialSection
import { MARKETING_SPOTLIGHT_TIERS } from '../SkillsEditorialSection.helpers';

export const SkillEditorialCardShell: React.FC<SkillEditorialCardShellProps> = ({
  tier,
  gridSpan,
  itemVariants,
  children,
}): React.ReactElement => {
  const enableSpotlight: boolean = MARKETING_SPOTLIGHT_TIERS.has(tier);
  const isMinimalTier: boolean = tier === SkillLayoutTier.PeripheralMinimal;

  const {
    ref,
    motionProps,
  }: UsePhysicalInteractionResult<HTMLDivElement> = usePhysicalInteraction({
    disabled: isMinimalTier,
    enableSpotlight,
    enableTilt: false,
    enableLift: false,
  });

  return (
    <SkillsStaggerSlot variants={itemVariants}>
      <SkillEditorialCard
        ref={ref}
        layout
        $tier={tier}
        $gridSpan={gridSpan}
        style={motionProps.style}
        whileTap={isMinimalTier ? undefined : motionProps.whileTap}
      >
        {children}
      </SkillEditorialCard>
    </SkillsStaggerSlot>
  );
};
