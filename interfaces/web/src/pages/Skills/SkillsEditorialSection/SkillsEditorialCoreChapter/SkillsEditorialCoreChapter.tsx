// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Layout
import { SectionEyebrow } from '../../../../styles/pageLayout.style';

// Styles
import {
  SkillsAsymmetricGrid,
  SkillsCoreChapter,
  SkillsCoreLead,
} from '../SkillsEditorialSection.style';

// Types
import { SkillLayoutPlacement } from '../../../../domain/skills';
import { SkillsEditorialCoreChapterProps } from './SkillsEditorialCoreChapter.types';

// SkillsEditorialCoreChapter
import { SkillsEditorialSkillCard } from './SkillsEditorialSkillCard';

// SkillsEditorialSection
import { SkillsEditorialHeroBlock } from '../SkillsEditorialHeroBlock';

export const SkillsEditorialCoreChapter: React.FC<SkillsEditorialCoreChapterProps> = ({
  hero,
  coreRow,
  isPt,
  scrollMotion,
}): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <SkillsCoreChapter>
      <SectionEyebrow>{t('skills.layout.coreEyebrow')}</SectionEyebrow>
      <SkillsCoreLead>{t('skills.layout.coreLead')}</SkillsCoreLead>
      {hero !== null ? (
        <SkillsEditorialHeroBlock
          heroSkill={hero}
          isPt={isPt}
          itemVariants={scrollMotion.item}
        />
      ) : null}
      {coreRow.length > 0 ? (
        <SkillsAsymmetricGrid
          variants={scrollMotion.stagger}
          initial={false}
          animate="visible"
        >
          {coreRow.map((placement: SkillLayoutPlacement) => (
            <SkillsEditorialSkillCard
              key={placement.skill.id}
              placement={placement}
              isPt={isPt}
              itemVariants={scrollMotion.item}
              translate={t}
            />
          ))}
        </SkillsAsymmetricGrid>
      ) : null}
    </SkillsCoreChapter>
  );
};
