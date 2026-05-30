// Core
import React, { useCallback, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import {
  useSkills,
  useCertificates,
  usePageMeta,
  PageMetaRoute,
} from '../../hooks';
import { useScrollMotion } from '../../hooks/useScrollMotion';

// Layout
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageTitleGradient,
  PageSubtitle,
} from '../../styles/pageLayout.style';

// Styles
import { Section } from './Skills.style';

// Types
import { Certificate } from '../../types';

// Lib
import { isPortugueseLocale } from '../../lib/i18n';

// Skills
import { SkillsCertificateModal } from './SkillsCertificateModal';
import { SkillsCertificatesSection } from './SkillsCertificatesSection';
import { SkillsEditorialSection } from './SkillsEditorialSection';
import { SkillsExperienceSection } from './SkillsExperienceSection';

interface SkillsPageState {
  selectedCertificate: Certificate | null;
}

const initialState: SkillsPageState = {
  selectedCertificate: null,
};

export const Skills: React.FC = (): React.ReactElement => {
  usePageMeta(PageMetaRoute.Skills);
  const { t, i18n } = useTranslation();
  const isPt: boolean = isPortugueseLocale(i18n.language);
  const [state, setState] = useState<SkillsPageState>(initialState);
  const scrollMotion = useScrollMotion();

  const {
    data: skills = [],
    isLoading: skillsLoading,
    isError: skillsError,
    refetch: refetchSkills,
  } = useSkills();

  const {
    data: certificates = [],
    isLoading: certificatesLoading,
    isError: certificatesError,
    refetch: refetchCertificates,
  } = useCertificates();

  const handleCertificateSelect = useCallback((cert: Certificate): void => {
    setState((prev: SkillsPageState) => ({ ...prev, selectedCertificate: cert }));
  }, []);

  const handleCloseModal = useCallback((): void => {
    setState((prev: SkillsPageState) => ({ ...prev, selectedCertificate: null }));
  }, []);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={scrollMotion.title}
          initial={false}
          animate="visible"
        >
          <PageTitleGradient>{t('skills.title')}</PageTitleGradient>
        </PageTitle>
        <PageSubtitle
          variants={scrollMotion.section}
          initial={false}
          animate="visible"
        >
          {t('skills.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <Section
        variants={scrollMotion.section}
        initial={false}
        animate="visible"
      >
        <SkillsEditorialSection
          skills={skills}
          isLoading={skillsLoading}
          isError={skillsError}
          isPt={isPt}
          scrollMotion={scrollMotion}
          onRetry={() => refetchSkills()}
        />
      </Section>

      <SkillsExperienceSection scrollMotion={scrollMotion} />

      <SkillsCertificatesSection
        certificates={certificates}
        isLoading={certificatesLoading}
        isError={certificatesError}
        isPt={isPt}
        scrollMotion={scrollMotion}
        onRetry={() => refetchCertificates()}
        onCertificateSelect={handleCertificateSelect}
      />

      <SkillsCertificateModal
        certificate={state.selectedCertificate}
        isPt={isPt}
        onClose={handleCloseModal}
      />
    </PageContainer>
  );
};
