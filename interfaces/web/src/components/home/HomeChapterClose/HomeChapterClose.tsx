// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useScrollMotion } from '@/hooks/useScrollMotion';

// View
import {
  CloseBand,
  CloseGrid,
  AboutChapter,
  ChapterIndex,
  ChapterTitle,
  ChapterBody,
  ChapterLink,
  ContactChapter,
  ContactTitle,
  ContactBody,
  ContactCta,
} from '@/components/home/HomeChapterClose/HomeChapterClose.style';

const viewport = { once: true, margin: '-60px' as const };

export function HomeChapterClose(): React.ReactElement {
  const { t } = useTranslation();
  const { section } = useScrollMotion();

  return (
    <CloseBand id="section-contact">
      <CloseGrid
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <AboutChapter id="section-about">
          <ChapterIndex>{t('home.sections.about.eyebrow')}</ChapterIndex>
          <ChapterTitle>{t('home.aboutPreview.title')}</ChapterTitle>
          <ChapterBody>{t('home.aboutPreview.description')}</ChapterBody>
          <ChapterLink to="/about">
            {t('home.aboutPreview.cta')}
            {' '}
            →
          </ChapterLink>
        </AboutChapter>
        <ContactChapter>
          <ChapterIndex>{t('home.sections.contact.eyebrow')}</ChapterIndex>
          <ContactTitle>{t('home.contactCta.title')}</ContactTitle>
          <ContactBody>{t('home.contactCta.description')}</ContactBody>
          <ContactCta to="/contact">{t('home.contactCta.cta')}</ContactCta>
        </ContactChapter>
      </CloseGrid>
    </CloseBand>
  );
}
