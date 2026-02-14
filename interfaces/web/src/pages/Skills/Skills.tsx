/**
 * @fileoverview Skills page component.
 * Displays technical skills with filtering by category and certificates section.
 */

// Core
import React, { useState, useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

// Styles
import { staggerContainer, staggerItem, fadeInUp } from '../../styles/animations';

// Components (styled)
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  Section,
  SectionTitle,
  CategoryTabs,
  CategoryTab,
  SkillsGrid,
  SkillCard,
  SkillIcon,
  SkillInfo,
  SkillName,
  SkillBar,
  SkillProgress,
  CertificatesSection,
  CertificatesGrid,
  CertificateCard,
  CertificateHeader,
  PlatformLogo,
  CertificateName,
  CertificatePlatform,
  CertificateYear,
  CertificateType,
  CertificateHours,
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
  CertificateCoursesCount,
} from './Skills.style';

// Types
import type { SkillCategory } from '../../types';

/**
 * Represents a single skill item with category, name, icon, and proficiency level.
 */
interface SkillItem {
  /** Category the skill belongs to */
  category: SkillCategory;
  /** Display name of the skill */
  name: string;
  /** URL to the skill's icon image */
  icon: string;
  /** Proficiency level (0-100) */
  level: number;
}

/**
 * Represents a certificate or course completion.
 */
interface CertificateItem {
  /** Unique identifier - also used as translation key */
  id: string;
  /** Platform where the certificate was obtained */
  platform: 'Rocketseat' | 'Alura' | 'Udemy';
  /** Year of completion */
  year: number;
  /** URL to the certificate */
  certificateUrl: string;
  /** Type of certificate */
  type: 'micro' | 'course' | 'trail';
  /** Hours of content */
  hours: number;
  /** Number of courses (for trails) */
  coursesCount?: number;
}

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
 * Platform configuration with logo and colors.
 * Using data URIs for logos to ensure they always load correctly.
 */
const platformConfig = {
  Rocketseat: {
    // Rocketseat official logo - stylized R with orbit
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Crect width="48" height="48" rx="8" fill="%238257E5"/%3E%3Cpath d="M12 35V13h10c3 0 5.3.8 7 2.4 1.7 1.6 2.5 3.7 2.5 6.3 0 2-.5 3.7-1.5 5.1-1 1.4-2.4 2.4-4.2 3L33 35h-6l-6-5h-4v5h-5zm5-10h5c1.5 0 2.7-.4 3.5-1.2.8-.8 1.2-1.8 1.2-3s-.4-2.2-1.2-3c-.8-.8-2-1.2-3.5-1.2h-5v8.4z" fill="white"/%3E%3Cellipse cx="32" cy="16" rx="9" ry="4" stroke="white" stroke-width="2.5" fill="none" transform="rotate(-25 32 16)"/%3E%3C/svg%3E',
    color: '#8257e5',
    bgColor: 'rgba(130, 87, 229, 0.1)',
  },
  Alura: {
    logo: 'https://www.alura.com.br/assets/img/alura-logo.svg',
    color: '#0066cc',
    bgColor: 'rgba(0, 102, 204, 0.1)',
  },
  Udemy: {
    logo: 'https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg',
    color: '#a435f0',
    bgColor: 'rgba(164, 53, 240, 0.1)',
  },
};

/**
 * Skills data array containing all technical skills.
 */
const skillsData: SkillItem[] = [
  // Frontend
  { category: 'frontend', name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', level: 90 },
  { category: 'frontend', name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', level: 85 },
  { category: 'frontend', name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 90 },
  { category: 'frontend', name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', level: 95 },
  { category: 'frontend', name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', level: 90 },
  { category: 'frontend', name: 'Styled Components', icon: 'https://raw.githubusercontent.com/styled-components/brand/master/styled-components.svg', level: 85 },
  // Backend
  { category: 'backend', name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 85 },
  { category: 'backend', name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', level: 80 },
  { category: 'backend', name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', level: 75 },
  // Testing
  { category: 'testing', name: 'Jest', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg', level: 80 },
  { category: 'testing', name: 'Playwright', icon: 'https://playwright.dev/img/playwright-logo.svg', level: 70 },
  // Tools
  { category: 'tools', name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 85 },
  { category: 'tools', name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 70 },
  { category: 'tools', name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', level: 95 },
  // Real-time
  { category: 'realtime', name: 'WebSocket', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg', level: 75 },
];

/**
 * Certificates data array containing all certifications and courses.
 * Hours are based on official certificate data from each platform.
 * Certificate names are stored in translation files using the id as key.
 */
const certificatesData: CertificateItem[] = [
  {
    id: 'aluraReactExplore',
    platform: 'Alura',
    year: 2023,
    certificateUrl: 'https://cursos.alura.com.br/degree/certificate/6999f5a9-b6dd-4cce-b756-8d5738dabadb',
    type: 'trail',
    hours: 65,
    coursesCount: 7,
  },
  {
    id: 'aluraReactTests',
    platform: 'Alura',
    year: 2023,
    certificateUrl: 'https://cursos.alura.com.br/degree/certificate/42002daa-5432-4bad-96c5-24b80ba06e0d',
    type: 'trail',
    hours: 56,
    coursesCount: 6,
  },
  {
    id: 'udemyWebDesign',
    platform: 'Udemy',
    year: 2023,
    certificateUrl: 'https://udemy-certificate.s3.amazonaws.com/image/UC-912d30a6-ed7b-4854-a113-a8f71195a847.jpg',
    type: 'course',
    hours: 40,
  },
  {
    id: 'aluraCssDeepDive',
    platform: 'Alura',
    year: 2024,
    certificateUrl: 'https://cursos.alura.com.br/degree/certificate/43d6018a-d00d-43af-9f54-7fb207c0c28a',
    type: 'trail',
    hours: 36,
    coursesCount: 5,
  },
  {
    id: 'aluraReactContext',
    platform: 'Alura',
    year: 2023,
    certificateUrl: 'https://cursos.alura.com.br/certificate/b284d47d-01be-482f-9116-85b83cbdc424',
    type: 'course',
    hours: 10,
  },
  {
    id: 'rocketseatPythonFundamentals',
    platform: 'Rocketseat',
    year: 2025,
    certificateUrl: 'https://app.rocketseat.com.br/certificates/484a443c-0b2e-4ee7-bd49-8d03919ebd52',
    type: 'micro',
    hours: 10,
  },
  {
    id: 'rocketseatPythonFlask',
    platform: 'Rocketseat',
    year: 2025,
    certificateUrl: 'https://app.rocketseat.com.br/certificates/0bd49b7b-e481-4c67-9f42-e059be4d0a94',
    type: 'course',
    hours: 10,
  },
];

/**
 * Available category filter options.
 */
const categories: CategoryOption[] = [
  { key: 'all', label: 'Todas' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'testing', label: 'Testes' },
  { key: 'tools', label: 'Ferramentas' },
  { key: 'realtime', label: 'Real-time' },
];


/**
 * Skills page component that displays technical skills and certificates.
 * Features category filtering and animated skill progress bars.
 *
 * @returns The rendered Skills page
 */
export const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  const filteredSkills: SkillItem[] = activeCategory === 'all'
    ? skillsData
    : skillsData.filter((skill: SkillItem) => skill.category === activeCategory);

  const handleCertificateClick = useCallback((cert: CertificateItem) => {
    setSelectedCertificate(cert);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCertificate(null);
  }, []);

  const handleViewCertificate = useCallback(() => {
    if (selectedCertificate) {
      window.open(selectedCertificate.certificateUrl, '_blank', 'noopener,noreferrer');
    }
  }, [selectedCertificate]);

  // Calculate total hours
  const totalHours = certificatesData.reduce((acc, cert) => acc + cert.hours, 0);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {t('skills.title')}
        </PageTitle>
        <PageSubtitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.key === 'all' ? cat.label : t(`skills.categories.${cat.key}`)}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <AnimatePresence mode="wait">
          <SkillsGrid
            key={activeCategory}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
          >
            {filteredSkills.map((skill: SkillItem, index: number) => (
              <SkillCard
                key={skill.name}
                variants={staggerItem}
                layout
              >
                <SkillIcon>
                  <img src={skill.icon} alt={skill.name} />
                </SkillIcon>
                <SkillInfo>
                  <SkillName>{skill.name}</SkillName>
                  <SkillBar>
                    <SkillProgress
                      $level={skill.level}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </SkillBar>
                </SkillInfo>
              </SkillCard>
            ))}
          </SkillsGrid>
        </AnimatePresence>
      </Section>

      <CertificatesSection>
        <SectionTitle>
          {t('skills.certificates.title')}
          <CertificateHours>{t('skills.certificates.totalHours', { hours: totalHours })}</CertificateHours>
        </SectionTitle>
        <CertificatesGrid
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {certificatesData.map((cert: CertificateItem) => {
            const platform = platformConfig[cert.platform];
            return (
              <CertificateCard
                key={cert.id}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCertificateClick(cert)}
                $platformColor={platform.color}
              >
                <CertificateHeader>
                  <PlatformLogo $bgColor={platform.bgColor}>
                    <img src={platform.logo} alt={cert.platform} />
                  </PlatformLogo>
                  <div>
                    <CertificateName>{t(`skills.certificates.items.${cert.id}`)}</CertificateName>
                    <CertificatePlatform $color={platform.color}>
                      {cert.platform}
                    </CertificatePlatform>
                  </div>
                </CertificateHeader>
                <CertificateFooter>
                  <CertificateType $type={cert.type}>
                    {t(`skills.certificates.types.${cert.type}`)}
                    {cert.coursesCount && (
                      <CertificateCoursesCount>
                        {t('skills.certificates.courses', { count: cert.coursesCount })}
                      </CertificateCoursesCount>
                    )}
                  </CertificateType>
                  <CertificateYear>{t('skills.certificates.hours', { count: cert.hours })} • {cert.year}</CertificateYear>
                </CertificateFooter>
                <CertificateLink>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </CertificateLink>
              </CertificateCard>
            );
          })}
        </CertificatesGrid>
      </CertificatesSection>

      {/* Certificate Modal */}
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
                  $bgColor={platformConfig[selectedCertificate.platform].bgColor}
                  $color={platformConfig[selectedCertificate.platform].color}
                >
                  <img 
                    src={platformConfig[selectedCertificate.platform].logo} 
                    alt={selectedCertificate.platform} 
                  />
                  {selectedCertificate.platform}
                </ModalPlatformBadge>
                <ModalCloseButton onClick={handleCloseModal}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <ModalCertificateInfo>
                  <ModalTitle>{t(`skills.certificates.items.${selectedCertificate.id}`)}</ModalTitle>
                  <ModalMeta>
                    <ModalMetaItem>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {t('skills.certificates.hours', { count: selectedCertificate.hours })}
                    </ModalMetaItem>
                    <ModalMetaItem>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {selectedCertificate.year}
                    </ModalMetaItem>
                    <ModalMetaItem>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {t(`skills.certificates.types.${selectedCertificate.type}`)}
                      {selectedCertificate.coursesCount && ` (${t('skills.certificates.courses', { count: selectedCertificate.coursesCount })})`}
                    </ModalMetaItem>
                  </ModalMeta>
                </ModalCertificateInfo>
                <ModalActions>
                  <ModalButton 
                    $variant="primary" 
                    onClick={handleViewCertificate}
                    $platformColor={platformConfig[selectedCertificate.platform].color}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    {t('skills.certificates.viewCertificate')}
                  </ModalButton>
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
};
