// Core
import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { SkillCardSkeleton } from '../../../components/SkillCardSkeleton';

// Styles
import {
  ErrorMessage,
  RetryButton,
  SkillsFeedbackPanel,
  SkillsGrid,
  SkillsLoadingMessage,
} from '../Skills.style';
import { SkillsEditorialLayout } from './SkillsEditorialSection.style';

// Types
import {
  buildEditorialSkillsLayout,
  EditorialSkillsLayout,
} from '../../../domain/skills';
import { SkillsEditorialSectionProps } from './SkillsEditorialSection.types';

// SkillsEditorialSection
import { SkillsEditorialCoreChapter } from './SkillsEditorialCoreChapter';
import { SkillsEditorialPeripheralChapter } from './SkillsEditorialPeripheralChapter';

const SKELETON_CARD_COUNT: number = 8;

export const SkillsEditorialSection: React.FC<SkillsEditorialSectionProps> = ({
  skills,
  isLoading,
  isError,
  isPt,
  scrollMotion,
  onRetry,
}): React.ReactElement => {
  const { t } = useTranslation();

  // Domain SSOT: hero skill, asymmetric core row, and peripheral support stack.
  const editorialLayout: EditorialSkillsLayout = useMemo(
    (): EditorialSkillsLayout => buildEditorialSkillsLayout(skills),
    [skills],
  );

  // Eyebrow only when peripheral follows a core chapter (avoids orphan label).
  const showPeripheralChapter: boolean = useMemo((): boolean => (
    editorialLayout.peripheral.length > 0
    && (editorialLayout.hero !== null || editorialLayout.coreRow.length > 0)
  ), [editorialLayout]);

  if (isLoading) {
    return (
      <>
        <SkillsFeedbackPanel>
          <SkillsLoadingMessage>{t('skills.loading')}</SkillsLoadingMessage>
        </SkillsFeedbackPanel>
        <SkillsGrid
          variants={scrollMotion.stagger}
          initial={false}
          animate="visible"
        >
          {Array.from({ length: SKELETON_CARD_COUNT }, (_item: unknown, index: number) => (
            <SkillCardSkeleton key={`skill-skeleton-${index}`} />
          ))}
        </SkillsGrid>
      </>
    );
  }

  if (isError) {
    return (
      <SkillsFeedbackPanel>
        <ErrorMessage>{t('skills.error')}</ErrorMessage>
        <RetryButton type="button" onClick={onRetry}>
          {t('common.retry')}
        </RetryButton>
      </SkillsFeedbackPanel>
    );
  }

  const {
    hero,
    coreRow,
    peripheral,
  } = editorialLayout;

  return (
    <SkillsEditorialLayout
      variants={scrollMotion.stagger}
      initial={false}
      animate="visible"
      exit={{ opacity: 0 }}
    >
      {(hero !== null || coreRow.length > 0) ? (
        <SkillsEditorialCoreChapter
          hero={hero}
          coreRow={coreRow}
          isPt={isPt}
          scrollMotion={scrollMotion}
        />
      ) : null}
      {peripheral.length > 0 ? (
        <SkillsEditorialPeripheralChapter
          peripheral={peripheral}
          showEyebrow={showPeripheralChapter}
          isPt={isPt}
          scrollMotion={scrollMotion}
        />
      ) : null}
    </SkillsEditorialLayout>
  );
};
