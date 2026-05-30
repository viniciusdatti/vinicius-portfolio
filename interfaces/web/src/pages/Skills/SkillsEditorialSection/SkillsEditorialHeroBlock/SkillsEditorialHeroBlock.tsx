// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Styles
import {
  SkillsHeroBlock,
  SkillsHeroDesc,
  SkillsHeroDomain,
  SkillsHeroIcon,
  SkillsHeroMeta,
  SkillsHeroName,
  SkillsHeroSignal,
} from '../SkillsEditorialSection.style';

// Types
import {
  resolveSkillDisplayName,
  resolveSkillIconUrl,
} from '../../../../domain/skills';
import { SkillsEditorialHeroBlockProps } from './SkillsEditorialHeroBlock.types';

export const SkillsEditorialHeroBlock: React.FC<SkillsEditorialHeroBlockProps> = ({
  heroSkill,
  isPt,
  itemVariants,
}): React.ReactElement => {
  const { t } = useTranslation();
  const displayName: string = resolveSkillDisplayName(heroSkill, isPt);

  return (
    <SkillsHeroBlock variants={itemVariants}>
      <SkillsHeroSignal aria-hidden>{t('skills.layout.heroSignal')}</SkillsHeroSignal>
      <SkillsHeroName>
        <SkillsHeroIcon
          src={resolveSkillIconUrl(heroSkill)}
          alt=""
          aria-hidden
        />
        {displayName}
      </SkillsHeroName>
      <SkillsHeroMeta>
        <SkillsHeroDesc>{t('skills.layout.heroDescription')}</SkillsHeroDesc>
        <SkillsHeroDomain>{t('skills.layout.heroDomain')}</SkillsHeroDomain>
      </SkillsHeroMeta>
    </SkillsHeroBlock>
  );
};
