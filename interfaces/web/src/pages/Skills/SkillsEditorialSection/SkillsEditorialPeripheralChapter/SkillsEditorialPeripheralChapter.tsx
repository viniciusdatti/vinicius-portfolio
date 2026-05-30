// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Layout
import { SectionEyebrow } from '../../../../styles/pageLayout.style';

// Components
import { SupportStackCard } from '../../../../components/skills/SupportStackCard';

// Styles
import { SkillsStaggerSlot } from '../../Skills.style';
import {
  SkillsPeripheralChapter,
  SupportStackFeaturedRow,
  SupportStackGrid,
  SupportStackMatrix,
} from '../SkillsEditorialSection.style';

// Types
import {
  resolveSkillDisplayName,
  resolveSkillIconUrl,
  SkillLayoutPlacement,
  SkillLayoutTier,
} from '../../../../domain/skills';
import { SkillsEditorialPeripheralChapterProps } from './SkillsEditorialPeripheralChapter.types';

// SkillsEditorialSection
import { resolvePeripheralDescription } from '../SkillsEditorialSection.helpers';

export const SkillsEditorialPeripheralChapter: React.FC<
SkillsEditorialPeripheralChapterProps
> = ({
  peripheral,
  showEyebrow,
  isPt,
  scrollMotion,
}): React.ReactElement => {
  const { t } = useTranslation();

  // Split peripheral tiers: featured row vs compact matrix grid.
  const featuredPlacements: SkillLayoutPlacement[] = peripheral.filter(
    (placement: SkillLayoutPlacement): boolean => (
      placement.tier === SkillLayoutTier.PeripheralFeatured
    ),
  );
  const compactPlacements: SkillLayoutPlacement[] = peripheral.filter(
    (placement: SkillLayoutPlacement): boolean => (
      placement.tier !== SkillLayoutTier.PeripheralFeatured
    ),
  );

  const renderPeripheralSkillCard = (
    placement: SkillLayoutPlacement,
  ): React.ReactElement => {
    const { skill, tier } = placement;
    const displayName: string = resolveSkillDisplayName(skill, isPt);
    const description: string = resolvePeripheralDescription(skill, t);

    return (
      <SkillsStaggerSlot key={skill.id} variants={scrollMotion.item}>
        <SupportStackCard
          skill={skill}
          displayName={displayName}
          description={description}
          iconUrl={resolveSkillIconUrl(skill)}
          tier={tier}
        />
      </SkillsStaggerSlot>
    );
  };

  return (
    <SkillsPeripheralChapter>
      {showEyebrow ? (
        <SectionEyebrow>{t('skills.layout.peripheralEyebrow')}</SectionEyebrow>
      ) : null}
      <SupportStackMatrix>
        {featuredPlacements.length > 0 ? (
          <SupportStackFeaturedRow
            variants={scrollMotion.stagger}
            initial={false}
            animate="visible"
          >
            {featuredPlacements.map((placement: SkillLayoutPlacement) => (
              renderPeripheralSkillCard(placement)
            ))}
          </SupportStackFeaturedRow>
        ) : null}
        {compactPlacements.length > 0 ? (
          <SupportStackGrid
            variants={scrollMotion.stagger}
            initial={false}
            animate="visible"
          >
            {compactPlacements.map((placement: SkillLayoutPlacement) => (
              renderPeripheralSkillCard(placement)
            ))}
          </SupportStackGrid>
        ) : null}
      </SupportStackMatrix>
    </SkillsPeripheralChapter>
  );
};
