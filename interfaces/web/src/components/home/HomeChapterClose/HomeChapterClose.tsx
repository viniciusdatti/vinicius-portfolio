// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useScrollMotion } from '../../../hooks/useScrollMotion';

// Components
import { SectionEyebrowAnimated } from '../../../styles/pageLayout.style';

// Component
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
} from './HomeChapterClose.style';

export const HomeChapterClose = (): React.ReactElement => {
  const { t } = useTranslation();
  const { stagger, item, viewport } = useScrollMotion();

  return (
    <CloseBand id="section-contact">
      <CloseGrid>
        <AboutChapter
          id="section-about"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <ChapterIndex variants={item} aria-hidden>
            {t('home.sections.about.index')}
          </ChapterIndex>
          <SectionEyebrowAnimated variants={item}>
            {t('home.sections.about.eyebrow')}
          </SectionEyebrowAnimated>
          <ChapterTitle variants={item}>{t('home.aboutPreview.title')}</ChapterTitle>
          <ChapterBody variants={item}>{t('home.aboutPreview.description')}</ChapterBody>
          <ChapterLink variants={item} to="/about">
            {t('home.aboutPreview.cta')}
            {' →'}
          </ChapterLink>
        </AboutChapter>
        <ContactChapter
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <ChapterIndex variants={item} aria-hidden>
            {t('home.sections.contact.index')}
          </ChapterIndex>
          <SectionEyebrowAnimated variants={item}>
            {t('home.sections.contact.eyebrow')}
          </SectionEyebrowAnimated>
          <ContactTitle variants={item}>{t('home.contactCta.title')}</ContactTitle>
          <ContactBody variants={item}>{t('home.contactCta.description')}</ContactBody>
          <ContactCta variants={item} to="/contact">
            {t('home.contactCta.cta')}
          </ContactCta>
        </ContactChapter>
      </CloseGrid>
    </CloseBand>
  );
};
