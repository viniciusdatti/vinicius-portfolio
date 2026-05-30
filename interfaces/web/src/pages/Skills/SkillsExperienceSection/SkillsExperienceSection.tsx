// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { UsePhysicalInteractionResult } from '../../../hooks/usePhysicalInteraction.types';
import { usePhysicalInteraction } from '../../../hooks/usePhysicalInteraction';

// Styles
import {
  SectionTitle,
  SectionTitleGradient,
  SkillsStaggerSlot,
} from '../Skills.style';
import {
  ExperienceCard,
  ExperienceCardDescription,
  ExperienceCardHighlight,
  ExperienceCardTitle,
  ExperienceGrid,
  ExperienceIntro,
  ExperienceSection,
  ExperienceSubtitle,
} from './SkillsExperienceSection.style';

// Types
import {
  ExperienceCardShellProps,
  SkillsExperienceSectionProps,
} from './SkillsExperienceSection.types';

const EXPERIENCE_ITEM_KEYS: readonly string[] = [
  'auth',
  'state',
  'i18n',
  'realtime',
  'api',
  'theming',
  'dashboards',
  'crud',
  'architecture',
  'testing',
];

const FEATURED_EXPERIENCE_KEY: string = 'realtime';

const ExperienceCardShell: React.FC<ExperienceCardShellProps> = ({
  itemVariants,
  featured,
  children,
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
    <SkillsStaggerSlot variants={itemVariants}>
      <ExperienceCard
        ref={ref}
        $featured={featured}
        style={motionProps.style}
        whileTap={motionProps.whileTap}
      >
        {children}
      </ExperienceCard>
    </SkillsStaggerSlot>
  );
};

export const SkillsExperienceSection: React.FC<SkillsExperienceSectionProps> = ({
  scrollMotion,
}): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <ExperienceSection
      variants={scrollMotion.depth}
      initial={false}
      animate="visible"
    >
      <SectionTitle>
        <SectionTitleGradient>{t('skills.experience.title')}</SectionTitleGradient>
      </SectionTitle>
      <ExperienceIntro>{t('skills.experience.intro')}</ExperienceIntro>
      <ExperienceSubtitle>{t('skills.experience.subtitle')}</ExperienceSubtitle>
      <ExperienceGrid
        variants={scrollMotion.stagger}
        initial={false}
        animate="visible"
      >
        {EXPERIENCE_ITEM_KEYS.map((key: string) => (
          <ExperienceCardShell
            key={key}
            itemVariants={scrollMotion.item}
            featured={key === FEATURED_EXPERIENCE_KEY}
          >
            <ExperienceCardTitle>
              {t(`skills.experience.items.${key}.title`)}
            </ExperienceCardTitle>
            <ExperienceCardDescription>
              {t(`skills.experience.items.${key}.description`)}
            </ExperienceCardDescription>
            <ExperienceCardHighlight>
              {t(`skills.experience.items.${key}.highlight`)}
            </ExperienceCardHighlight>
          </ExperienceCardShell>
        ))}
      </ExperienceGrid>
    </ExperienceSection>
  );
};
