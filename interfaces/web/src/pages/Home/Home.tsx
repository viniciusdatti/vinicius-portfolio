/**
 * @fileoverview Home page — cinematic one-page narrative with premium sections.
 */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Language } from '../../types';
import { ProjectShowcaseDetailMode } from '../../components/ProjectShowcase';
import { publicAssetUrl } from '../../config/env';
import { Hero } from '../../components/Hero';
import { RealtimePresence } from '../../components/home/RealtimePresence';
import { ProjectShowcaseGrid } from '../../components/ProjectShowcase';
import { ProjectCardSkeleton } from '../../components/ProjectCardSkeleton';
import { useProjects } from '../../hooks';
import {
  scrollReveal,
  scrollRevealStagger,
  scrollRevealItem,
} from '../../styles/animations';
import {
  Section,
  SectionTitle,
  SectionLead,
  SectionEyebrow,
  SectionIndex,
  SectionStory,
  ProjectsSectionHeader,
  ProjectsSectionMain,
  EditorialHeaderAside,
  ViewAllProjectsLink,
  SkeletonGrid,
  ErrorMessage,
  RetryButton,
  SkillsPreviewSection,
  SkillsPreviewDescription,
  SkillsEditorialLayout,
  SkillsEditorialIntro,
  SkillsGrid,
  SkillIcon,
  ViewAllLinkWrapper,
  ViewAllLink,
  LiveLabSection,
  LiveLabCard,
  LiveLabCopy,
  LiveLabVisual,
  LiveBadge,
  LiveLabSectionTitle,
  LiveLabDescription,
  CTAButton,
  TelemetryPreview,
  TelemetryPreviewCard,
  TelemetryPreviewLabel,
  TelemetryPreviewValue,
  TelemetryPreviewBadge,
  AboutPreviewSection,
  AboutPreviewLayout,
  AboutPreviewMain,
  AboutPreviewLink,
  ContactCtaSection,
  ContactCtaInner,
  ContactCtaDescription,
  ContactCtaActions,
} from './Home.style';

interface SkillItem {
  name: string;
  icon: string;
}

const PREVIEW_SKILLS: SkillItem[] = [
  { name: 'React', icon: publicAssetUrl('icons/react.svg') },
  { name: 'TypeScript', icon: publicAssetUrl('icons/typescript.svg') },
  { name: 'Python', icon: publicAssetUrl('icons/python.svg') },
  { name: 'FastAPI', icon: publicAssetUrl('icons/fastapi.svg') },
  { name: 'PostgreSQL', icon: publicAssetUrl('icons/postgresql.svg') },
  { name: 'Docker', icon: publicAssetUrl('icons/docker.svg') },
];

// Viewport config reutilizável — once: false garante re-animação após navegação
const vp = { once: false, margin: '-80px' };
const vpSm = { once: false, margin: '-40px' };

export const Home: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const { data: projects, isLoading, isError, refetch } = useProjects();

  const currentLanguage: Language =
    i18n.language?.startsWith('pt') ? Language.Pt : Language.En;

  const renderProjects = (): React.ReactElement => {
    if (isLoading) {
      return (
        <SkeletonGrid>
          {[1, 2, 3].map((i: number) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </SkeletonGrid>
      );
    }

    if (isError) {
      return (
        <ErrorMessage>
          <p>{t('home.projectsError')}</p>
          <RetryButton onClick={() => refetch()}>
            {t('common.retry')}
          </RetryButton>
        </ErrorMessage>
      );
    }

    const list = (projects || []).slice(0, 4);
    return (
      <ProjectShowcaseGrid
        projects={list}
        language={currentLanguage}
        compact
        detailMode={ProjectShowcaseDetailMode.Inline}
      />
    );
  };

  return (
    <>
      <Hero />
      <RealtimePresence />

      <SkillsPreviewSection id="section-capabilities">
        <SkillsEditorialLayout>
          <SkillsEditorialIntro>
            <SectionEyebrow>{t('home.sections.skills.eyebrow')}</SectionEyebrow>
            <SectionTitle
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              {t('home.skillsPreview.title')}
            </SectionTitle>
            <SkillsPreviewDescription>
              {t('home.skillsPreview.description')}
            </SkillsPreviewDescription>
            <ViewAllLinkWrapper>
              <ViewAllLink to="/skills">
                {t('home.skillsPreview.viewAll')} →
              </ViewAllLink>
            </ViewAllLinkWrapper>
          </SkillsEditorialIntro>
          <SkillsGrid
            variants={scrollRevealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={vpSm}
          >
            {PREVIEW_SKILLS.map((skill: SkillItem) => (
              <SkillIcon key={skill.name} variants={scrollRevealItem}>
                <img src={skill.icon} alt={skill.name} />
                <span>{skill.name}</span>
              </SkillIcon>
            ))}
          </SkillsGrid>
        </SkillsEditorialLayout>
      </SkillsPreviewSection>

      <Section id="section-work">
        <ProjectsSectionHeader>
          <SectionIndex>{t('home.sections.projects.index')}</SectionIndex>
          <ProjectsSectionMain>
            <SectionEyebrow>{t('home.sections.projects.eyebrow')}</SectionEyebrow>
            <SectionTitle
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              {t('projects.sectionTitle')}
            </SectionTitle>
            <SectionLead>{t('projects.sectionLead')}</SectionLead>
          </ProjectsSectionMain>
          <EditorialHeaderAside>
            <SectionStory>{t('home.sections.projects.story')}</SectionStory>
            <ViewAllProjectsLink to="/projects">
              {t('home.sections.projects.viewAll')} →
            </ViewAllProjectsLink>
          </EditorialHeaderAside>
        </ProjectsSectionHeader>
        {renderProjects()}
      </Section>

      <LiveLabSection id="live-lab-preview">
        <SectionEyebrow>{t('home.sections.liveLab.eyebrow')}</SectionEyebrow>
        <LiveLabSectionTitle>{t('home.liveLabPreview.title')}</LiveLabSectionTitle>
        <LiveLabCard
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <LiveLabCopy>
            <LiveBadge>{t('home.liveLabPreview.badge')}</LiveBadge>
            <LiveLabDescription>
              {t('home.liveLabPreview.description')}
            </LiveLabDescription>
            <CTAButton to="/live-lab">
              {t('home.liveLabPreview.cta')}
            </CTAButton>
          </LiveLabCopy>
          <LiveLabVisual>
            <TelemetryPreview>
              <TelemetryPreviewCard $status="ok">
                <TelemetryPreviewLabel>Temperatura</TelemetryPreviewLabel>
                <TelemetryPreviewValue $status="ok">72.4 °C</TelemetryPreviewValue>
              </TelemetryPreviewCard>
              <TelemetryPreviewCard $status="warn">
                <TelemetryPreviewLabel>Vibração</TelemetryPreviewLabel>
                <TelemetryPreviewValue $status="warn">8.1 mm/s</TelemetryPreviewValue>
              </TelemetryPreviewCard>
              <TelemetryPreviewCard $status="ok">
                <TelemetryPreviewLabel>Pressão</TelemetryPreviewLabel>
                <TelemetryPreviewValue $status="ok">3.2 bar</TelemetryPreviewValue>
              </TelemetryPreviewCard>
              <TelemetryPreviewCard $status="ok">
                <TelemetryPreviewLabel>Corrente</TelemetryPreviewLabel>
                <TelemetryPreviewValue $status="ok">14.8 A</TelemetryPreviewValue>
              </TelemetryPreviewCard>
            </TelemetryPreview>
            <TelemetryPreviewBadge>WebSocket · 4 sensors · live</TelemetryPreviewBadge>
          </LiveLabVisual>
        </LiveLabCard>
      </LiveLabSection>

      <AboutPreviewSection id="section-about">
        <AboutPreviewLayout
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <AboutPreviewMain>
            <SectionEyebrow>{t('home.sections.about.eyebrow')}</SectionEyebrow>
            <SectionTitle>{t('home.aboutPreview.title')}</SectionTitle>
            <SectionLead>{t('home.aboutPreview.description')}</SectionLead>
          </AboutPreviewMain>
          <AboutPreviewLink to="/about">
            {t('home.aboutPreview.cta')} →
          </AboutPreviewLink>
        </AboutPreviewLayout>
      </AboutPreviewSection>

      <ContactCtaSection id="section-contact">
        <ContactCtaInner
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
        >
          <div>
            <SectionEyebrow>{t('home.sections.contact.eyebrow')}</SectionEyebrow>
            <SectionTitle>{t('home.contactCta.title')}</SectionTitle>
            <ContactCtaDescription>
              {t('home.contactCta.description')}
            </ContactCtaDescription>
          </div>
          <ContactCtaActions>
            <CTAButton to="/contact">
              {t('home.contactCta.cta')}
            </CTAButton>
          </ContactCtaActions>
        </ContactCtaInner>
      </ContactCtaSection>
    </>
  );
};
