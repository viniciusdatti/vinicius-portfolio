// Core
import React from 'react';

// Libraries
import { Variants } from 'framer-motion';

// Styles
import { motionEase } from '../../../../styles/animations';
import { motionPresets } from '../../../../styles/motionPresets';
import {
  SkillCategoryLabel,
  SkillEditorialDomain,
  SkillEditorialIcon,
  SkillEditorialInfo,
  SkillEditorialName,
} from '../SkillsEditorialSection.style';

// Types
import {
  resolveSkillDisplayName,
  resolveSkillIconUrl,
  SkillLayoutTier,
} from '../../../../domain/skills';
import { SkillsEditorialSkillCardProps } from './SkillsEditorialCoreChapter.types';

// SkillsEditorialSection
import { SkillEditorialCardShell } from '../SkillEditorialCardShell';
import { resolveCoreDomainLabel } from '../SkillsEditorialSection.helpers';

const skillCategoryLabelVariants: Variants = {
  hidden: { y: 6, opacity: 0 },
  visible: { y: 6, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: {
      duration: motionPresets.duration.fast,
      ease: motionEase,
    },
  },
};

export const SkillsEditorialSkillCard: React.FC<SkillsEditorialSkillCardProps> = ({
  placement,
  isPt,
  itemVariants,
  translate,
}): React.ReactElement => {
  const {
    skill,
    tier,
    gridSpan,
  } = placement;
  const displayName: string = resolveSkillDisplayName(skill, isPt);
  const coreDomain: string | null = resolveCoreDomainLabel(skill.name, translate);
  const showCategoryOnHover: boolean = tier !== SkillLayoutTier.PeripheralMinimal;

  return (
    <SkillEditorialCardShell
      tier={tier}
      gridSpan={gridSpan}
      itemVariants={itemVariants}
    >
      <SkillEditorialIcon $tier={tier}>
        <img
          src={resolveSkillIconUrl(skill)}
          alt=""
          aria-hidden
        />
      </SkillEditorialIcon>
      <SkillEditorialInfo>
        <SkillEditorialName $tier={tier}>{displayName}</SkillEditorialName>
        {coreDomain ? (
          <SkillEditorialDomain>{coreDomain}</SkillEditorialDomain>
        ) : null}
        {showCategoryOnHover ? (
          <SkillCategoryLabel variants={skillCategoryLabelVariants}>
            {translate(`skills.categories.${skill.category}`)}
          </SkillCategoryLabel>
        ) : null}
      </SkillEditorialInfo>
    </SkillEditorialCardShell>
  );
};
