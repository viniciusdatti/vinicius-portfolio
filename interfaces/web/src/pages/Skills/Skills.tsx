/**
 * @fileoverview Skills page component.
 * Displays technical skills with filtering by category and certificates section.
 */

// Core
import React, { useState, useCallback, useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

// Types
import { SkillCategory, type Certificate, type Skill } from '@/types';

// Hooks
import { useSkills, useCertificates } from '@/hooks';

// =================================================================================================
// ============================================ DOMAIN =============================================
// =================================================================================================
import {
  getPlatformConfig,
  resolveCertificateDisplayName,
  resolveSkillDisplayName,
  resolveSkillIconUrl,
  sortCertificates,
} from '@/domain/skills';

// Components
import { SkillCardSkeleton } from '@/components/SkillCardSkeleton';
import { useScrollMotion } from '@/hooks/useScrollMotion';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
} from '@/styles/pageLayout.style';

// View
import {
  Section,
  SectionTitle,
  CategoryTabs,
  CategoryTab,
  SkillsGrid,
  SkillCard,
  SkillIcon,
  SkillInfo,
  SkillName,
  SkillCategoryLabel,
  ExperienceSection,
  ExperienceIntro,
  ExperienceSubtitle,
  ExperienceGrid,
  ExperienceCard,
  ExperienceCardTitle,
  ExperienceCardDescription,
  ExperienceCardHighlight,
  CertificatesSection,
  CertificatesGrid,
  CertificateCard,
  CertificateHeader,
  PlatformLogo,
  CertificateName,
  CertificatePlatform,
  CertificateYear,
  CertificateFooter,
  CertificateLink,
  CertificateModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalCertificateInfo,
  ModalPlatformBadge,
  ModalTitle,
  ModalMeta,
  ModalMetaItem,
  ModalActions,
  ModalButton,
  CertificateHours,
  ErrorMessage,
  RetryButton,
} from '@/pages/Skills/Skills.style';

/**
 * Represents a category filter option.
 */
interface CategoryOption {
  /** Category key or 'all' for showing all skills */
  key: SkillCategory | 'all';
  /** Display label for the category */
  label: string;
}

/**
 * Available category filter options.
 * IoT is defined in SkillCategory but has no skills yet — excluded from the filter.
 */
const categories: CategoryOption[] = [
  { key: 'all', label: '' },
  { key: SkillCategory.Frontend, label: 'Frontend' },
  { key: SkillCategory.Backend, label: 'Backend' },
  { key: SkillCategory.Testing, label: 'Testes' },
  { key: SkillCategory.Tools, label: 'Ferramentas' },
  { key: SkillCategory.Realtime, label: 'Real-time' },
];

/** Order of experience items to display (matches i18n keys under skills.experience.items). */
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

const SKELETON_CARD_COUNT = 8;

/**
 * Skills page component that displays technical skills and certificates.
 * Features category filtering and animated skill progress bars.
 *
 * @returns The rendered Skills page
 */
export function Skills(): React.ReactElement {
  const { t, i18n } = useTranslation();
  const isPt: boolean = i18n.language?.startsWith('pt') ?? false;
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const motion = useScrollMotion();
  const viewport = { once: true, margin: '-60px' as const };

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

  const filteredSkills: Skill[] = useMemo(() => (
    activeCategory === 'all'
      ? skills
      : skills.filter((skill: Skill) => skill.category === activeCategory)
  ), [skills, activeCategory]);

  const sortedCertificates: Certificate[] = useMemo(
    () => sortCertificates(certificates),
    [certificates],
  );

  const handleCertificateClick = useCallback((cert: Certificate) => {
    setSelectedCertificate(cert);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCertificate(null);
  }, []);

  const handleViewCertificate = useCallback(() => {
    if (selectedCertificate?.certificate_url) {
      window.open(selectedCertificate.certificate_url, '_blank', 'noopener,noreferrer');
    }
  }, [selectedCertificate]);

  const renderSkillsContent = (): React.ReactElement => {
    if (skillsLoading) {
      return (
        <SkillsGrid
          variants={motion.stagger}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: SKELETON_CARD_COUNT }, (_item: unknown, index: number) => (
            <SkillCardSkeleton key={`skill-skeleton-${index}`} />
          ))}
        </SkillsGrid>
      );
    }

    if (skillsError) {
      return (
        <>
          <ErrorMessage>{t('skills.error')}</ErrorMessage>
          <RetryButton type="button" onClick={() => refetchSkills()}>
            {t('common.retry')}
          </RetryButton>
        </>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <SkillsGrid
          key={activeCategory}
          variants={motion.stagger}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          {filteredSkills.map((skill: Skill) => {
            const displayName: string = resolveSkillDisplayName(skill, isPt);
            return (
              <SkillCard
                key={skill.id}
                variants={motion.item}
                layout
              >
                <SkillIcon>
                  <img src={resolveSkillIconUrl(skill)} alt={displayName} />
                </SkillIcon>
                <SkillInfo>
                  <SkillName>{displayName}</SkillName>
                  <SkillCategoryLabel>
                    {t(`skills.categories.${skill.category}`)}
                  </SkillCategoryLabel>
                </SkillInfo>
              </SkillCard>
            );
          })}
        </SkillsGrid>
      </AnimatePresence>
    );
  };

  const renderCertificatesContent = (): React.ReactElement => {
    if (certificatesLoading) {
      return (
        <SkillsGrid
          variants={motion.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {Array.from({ length: 4 }, (_item: unknown, index: number) => (
            <SkillCardSkeleton key={`cert-skeleton-${index}`} />
          ))}
        </SkillsGrid>
      );
    }

    if (certificatesError) {
      return (
        <>
          <ErrorMessage>{t('skills.certificatesError')}</ErrorMessage>
          <RetryButton type="button" onClick={() => refetchCertificates()}>
            {t('common.retry')}
          </RetryButton>
        </>
      );
    }

    return (
      <CertificatesGrid
        variants={motion.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {sortedCertificates.map((cert: Certificate) => {
          const platform = getPlatformConfig(cert.platform);
          const displayName: string = resolveCertificateDisplayName(cert, isPt);
          return (
            <CertificateCard
              key={cert.id}
              variants={motion.item}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCertificateClick(cert)}
              $platformColor={platform.color}
            >
              <CertificateHeader>
                <PlatformLogo $bgColor={platform.bgColor}>
                  <img src={platform.logo} alt={cert.platform} />
                </PlatformLogo>
                <div>
                  <CertificateName>{displayName}</CertificateName>
                  <CertificatePlatform $color={platform.color}>
                    {cert.platform}
                  </CertificatePlatform>
                </div>
              </CertificateHeader>
              <CertificateFooter>
                <CertificateYear>{cert.year}</CertificateYear>
              </CertificateFooter>
              <CertificateLink>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </CertificateLink>
            </CertificateCard>
          );
        })}
      </CertificatesGrid>
    );
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {t('skills.title')}
        </PageTitle>
        <PageSubtitle
          variants={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {t('skills.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <Section>
        <CategoryTabs>
          {categories.map((cat: CategoryOption) => (
            <CategoryTab
              key={cat.key}
              $active={activeCategory === cat.key}
              onClick={() => setActiveCategory(cat.key)}
              whileTap={{ scale: 0.98 }}
            >
              {cat.key === 'all' ? t('skills.filterAll') : t(`skills.categories.${cat.key}`)}
            </CategoryTab>
          ))}
        </CategoryTabs>

        {renderSkillsContent()}
      </Section>

      <ExperienceSection>
        <SectionTitle>{t('skills.experience.title')}</SectionTitle>
        <ExperienceIntro>{t('skills.experience.intro')}</ExperienceIntro>
        <ExperienceSubtitle>{t('skills.experience.subtitle')}</ExperienceSubtitle>
        <ExperienceGrid
          variants={motion.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {EXPERIENCE_ITEM_KEYS.map((key: string) => (
            <ExperienceCard
              key={key}
              variants={motion.item}
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
            </ExperienceCard>
          ))}
        </ExperienceGrid>
      </ExperienceSection>

      <CertificatesSection>
        <SectionTitle>
          {t('skills.certificates.title')}
          {!certificatesLoading && !certificatesError && sortedCertificates.length > 0 && (
            <CertificateHours>
              {t('skills.certificates.count', { count: sortedCertificates.length })}
            </CertificateHours>
          )}
        </SectionTitle>
        {renderCertificatesContent()}
      </CertificatesSection>

      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal>
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            <ModalContent
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <ModalHeader>
                <ModalPlatformBadge
                  $bgColor={getPlatformConfig(selectedCertificate.platform).bgColor}
                  $color={getPlatformConfig(selectedCertificate.platform).color}
                >
                  <img
                    src={getPlatformConfig(selectedCertificate.platform).logo}
                    alt={selectedCertificate.platform}
                  />
                  {selectedCertificate.platform}
                </ModalPlatformBadge>
                <ModalCloseButton onClick={handleCloseModal}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <ModalCertificateInfo>
                  <ModalTitle>
                    {resolveCertificateDisplayName(selectedCertificate, isPt)}
                  </ModalTitle>
                  <ModalMeta>
                    {selectedCertificate.year != null && (
                      <ModalMetaItem>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {selectedCertificate.year}
                      </ModalMetaItem>
                    )}
                  </ModalMeta>
                </ModalCertificateInfo>
                <ModalActions>
                  {selectedCertificate.certificate_url && (
                    <ModalButton
                      $variant="primary"
                      onClick={handleViewCertificate}
                      $platformColor={getPlatformConfig(selectedCertificate.platform).color}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      {t('skills.certificates.viewCertificate')}
                    </ModalButton>
                  )}
                  <ModalButton $variant="secondary" onClick={handleCloseModal}>
                    {t('skills.certificates.close')}
                  </ModalButton>
                </ModalActions>
              </ModalBody>
            </ModalContent>
          </CertificateModal>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
