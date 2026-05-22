// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Shared layout primitives
import { SectionEyebrow } from '@/styles/pageLayout.style';

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
  const { chapterAside, chapterPanel } = useScrollMotion();

  return (
    <CloseBand id="section-contact">
      <CloseGrid>
        <AboutChapter
          id="section-about"
          variants={chapterAside}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <ChapterIndex aria-hidden>{t('home.sections.about.index')}</ChapterIndex>
          <SectionEyebrow>{t('home.sections.about.eyebrow')}</SectionEyebrow>
          <ChapterTitle>{t('home.aboutPreview.title')}</ChapterTitle>
          <ChapterBody>{t('home.aboutPreview.description')}</ChapterBody>
          <ChapterLink to="/about">
            {t('home.aboutPreview.cta')}
            {' →'}
          </ChapterLink>
        </AboutChapter>
        <ContactChapter
          variants={chapterPanel}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <ChapterIndex aria-hidden>{t('home.sections.contact.index')}</ChapterIndex>
          <SectionEyebrow>{t('home.sections.contact.eyebrow')}</SectionEyebrow>
          <ContactTitle>{t('home.contactCta.title')}</ContactTitle>
          <ContactBody>{t('home.contactCta.description')}</ContactBody>
          <ContactCta to="/contact">{t('home.contactCta.cta')}</ContactCta>
        </ContactChapter>
      </CloseGrid>
    </CloseBand>
  );
}
