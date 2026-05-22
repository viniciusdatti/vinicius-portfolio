/**
 * @fileoverview Skills page component.
 * Displays technical skills with filtering by category and certificates section.
 */

// Core
import React, { useState, useCallback, useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

// Components
import {
  scrollReveal,
  scrollRevealStagger,
  scrollRevealItem,
} from '../../styles/animations';
import { SkillCategory } from '../../types';
import { publicAssetUrl } from '../../config/env';
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

const skillIconUrl = (file: string): string => publicAssetUrl(file);

/**
 * Represents a single skill item with category, name, icon, and proficiency level.
 */
interface SkillItem {
  /** Category the skill belongs to */
  category: SkillCategory;
  /** Display name of the skill (fallback when nameKey is not used) */
  name: string;
  /** Optional i18n key for name (e.g. skills.toolNames.cursor) */
  nameKey?: string;
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
    // Logo Rocketseat: foguete (nariz, corpo, aletas)
    logo: 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">' +
      '<rect width="48" height="48" rx="8" fill="#8257E5"/>' +
      '<path fill="white" d="M24 8 L28 14 L28 26 L32 36 L24 30 L16 36 L20 26 L20 14 Z"/>' +
      '<circle cx="24" cy="20" r="3" fill="#8257E5"/>' +
      '</svg>'
    ),
    color: '#8257e5',
    bgColor: 'rgba(130, 87, 229, 0.1)',
  },
  Alura: {
    logo: skillIconUrl('icons/platforms/alura.svg'),
    color: '#0066cc',
    bgColor: 'rgba(0, 102, 204, 0.1)',
  },
  Udemy: {
    logo: skillIconUrl('icons/platforms/udemy.svg'),
    color: '#a435f0',
    bgColor: 'rgba(164, 53, 240, 0.1)',
  },
};

/**
 * Skills data array containing all technical skills.
 */
const skillsData: SkillItem[] = [
  // Frontend
  {
    category: SkillCategory.Frontend,
    name: 'React',
    icon: skillIconUrl('icons/react.svg'),
    level: 90,
  },
  {
    category: SkillCategory.Frontend,
    name: 'TypeScript',
    icon: skillIconUrl('icons/typescript.svg'),
    level: 85,
  },
  {
    category: SkillCategory.Frontend,
    name: 'JavaScript',
    icon: skillIconUrl('icons/javascript.svg'),
    level: 90,
  },
  {
    category: SkillCategory.Frontend,
    name: 'HTML5',
    icon: skillIconUrl('icons/html5.svg'),
    level: 95,
  },
  {
    category: SkillCategory.Frontend,
    name: 'CSS3',
    icon: skillIconUrl('icons/css3.svg'),
    level: 90,
  },
  {
    category: SkillCategory.Frontend,
    name: 'Styled Components',
    icon: skillIconUrl('icons/styled-components.svg'),
    level: 85,
  },
  // Backend
  {
    category: SkillCategory.Backend,
    name: 'Python',
    icon: skillIconUrl('icons/python.svg'),
    level: 85,
  },
  {
    category: SkillCategory.Backend,
    name: 'FastAPI',
    icon: skillIconUrl('icons/fastapi.svg'),
    level: 80,
  },
  {
    category: SkillCategory.Backend,
    name: 'PostgreSQL',
    icon: skillIconUrl('icons/postgresql.svg'),
    level: 75,
  },
  // Testing
  {
    category: SkillCategory.Testing,
    name: 'Jest',
    icon: skillIconUrl('icons/jest.svg'),
    level: 80,
  },
  {
    category: SkillCategory.Testing,
    name: 'Playwright',
    icon: skillIconUrl('icons/playwright.svg'),
    level: 70,
  },
  // Tools
  {
    category: SkillCategory.Tools,
    name: 'Git',
    icon: skillIconUrl('icons/git.svg'),
    level: 85,
  },
  {
    category: SkillCategory.Tools,
    name: 'Docker',
    icon: skillIconUrl('icons/docker.svg'),
    level: 70,
  },
  {
    category: SkillCategory.Tools,
    name: 'VS Code',
    icon: skillIconUrl('icons/vscode.svg'),
    level: 95,
  },
  {
    category: SkillCategory.Tools,
    name: 'Cursor',
    nameKey: 'skills.toolNames.cursor',
    icon: skillIconUrl('cursor-icon.png'),
    level: 90,
  },
  {
    category: SkillCategory.Tools,
    name: 'AI tools',
    nameKey: 'skills.toolNames.aiTools',
    icon: skillIconUrl('ai-tools-icon.png'),
    level: 85,
  },
  // Real-time
  {
    category: SkillCategory.Realtime,
    name: 'WebSocket',
    icon: skillIconUrl('icons/socketio.svg'),
    level: 75,
  },
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
    hours: 5,
  },
  {
    id: 'aluraGitGithub',
    platform: 'Alura',
    year: 2023,
    certificateUrl: 'https://cursos.alura.com.br/certificate/5659f1f1-973e-4921-b577-de3a9e7472d1',
    type: 'course',
    hours: 8,
  },
  {
    id: 'aluraTypescriptPart1',
    platform: 'Alura',
    year: 2023,
    certificateUrl: 'https://cursos.alura.com.br/certificate/a2a3d58f-ea00-40ca-9590-3d7c6b2a7f8c',
    type: 'course',
    hours: 10,
  },
  {
    id: 'aluraTypescriptPart2',
    platform: 'Alura',
    year: 2023,
    certificateUrl: 'https://cursos.alura.com.br/certificate/cc58c86c-0467-4c6a-982d-2caedd25b5ae',
    type: 'course',
    hours: 10,
  },
  {
    id: 'aluraReactTypescriptAdmin',
    platform: 'Alura',
    year: 2023,
    certificateUrl: 'https://cursos.alura.com.br/certificate/9ee980b3-f18c-4982-ae4c-72e54cf33969',
    type: 'course',
    hours: 8,
  },
  {
    id: 'aluraReactStyledComponents',
    platform: 'Alura',
    year: 2023,
    certificateUrl: 'https://cursos.alura.com.br/certificate/66a1bdb5-5ac1-43dc-9737-949cf5809b06',
    type: 'course',
    hours: 6,
  },
  {
    id: 'aluraAngularPlaywright',
    platform: 'Alura',
    year: 2024,
    certificateUrl: 'https://cursos.alura.com.br/certificate/4c998df4-9b4e-47fc-a5e2-b4b118568042',
    type: 'course',
    hours: 8,
  },
];

/** Platform display order: Rocketseat, Alura, Udemy */
const PLATFORM_ORDER: Record<CertificateItem['platform'], number> = {
  Rocketseat: 0,
  Alura: 1,
  Udemy: 2,
};

/** Type priority: trail > course > micro */
const TYPE_ORDER: Record<CertificateItem['type'], number> = {
  trail: 0,
  course: 1,
  micro: 2,
};

/**
 * Available category filter options.
 */
const categories: CategoryOption[] = [
  { key: 'all', label: '' },
  { key: SkillCategory.Frontend, label: 'Frontend' },
  { key: SkillCategory.Backend, label: 'Backend' },
  { key: SkillCategory.Testing, label: 'Testes' },
  { key: SkillCategory.Tools, label: 'Ferramentas' },
  { key: SkillCategory.Realtime, label: 'Real-time' },
];

/** Human-readable labels for each skill category (displayed on SkillCard hover). */
const CATEGORY_LABELS: Record<SkillCategory, string> = {
  [SkillCategory.Frontend]: 'Frontend',
  [SkillCategory.Backend]: 'Backend',
  [SkillCategory.Testing]: 'Testing',
  [SkillCategory.Realtime]: 'Real-time',
  [SkillCategory.Tools]: 'Tools',
  [SkillCategory.Iot]: 'IoT',
};

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

  // Order: platform (Rocketseat → Alura → Udemy), then type, then hours desc
  const sortedCertificates = useMemo(() => {
    return [...certificatesData].sort((a, b) => {
      const platformDiff = PLATFORM_ORDER[a.platform] - PLATFORM_ORDER[b.platform];
      if (platformDiff !== 0) return platformDiff;
      const typeDiff = TYPE_ORDER[a.type] - TYPE_ORDER[b.type];
      if (typeDiff !== 0) return typeDiff;
      return b.hours - a.hours;
    });
  }, []);

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
        >
          {t('skills.title')}
        </PageTitle>
        <PageSubtitle
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-60px' }}
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
              {cat.key === 'all' ? t('skills.filterAll') : t(`skills.categories.${cat.key}`)}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <AnimatePresence mode="wait">
          <SkillsGrid
            key={activeCategory}
            variants={scrollRevealStagger}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {filteredSkills.map((skill: SkillItem, index: number) => {
              const displayName: string = skill.nameKey ? t(skill.nameKey) : skill.name;
              return (
              <SkillCard
                key={skill.nameKey ?? skill.name}
                variants={scrollRevealItem}
                layout
              >
                <SkillIcon>
                  <img src={skill.icon} alt={displayName} />
                </SkillIcon>
                <SkillInfo>
                  <SkillName>{displayName}</SkillName>
                  <SkillCategoryLabel>
                    {CATEGORY_LABELS[skill.category]}
                  </SkillCategoryLabel>
                </SkillInfo>
              </SkillCard>
              );
            })}
          </SkillsGrid>
        </AnimatePresence>
      </Section>

      <ExperienceSection>
        <SectionTitle>{t('skills.experience.title')}</SectionTitle>
        <ExperienceIntro>{t('skills.experience.intro')}</ExperienceIntro>
        <ExperienceSubtitle>{t('skills.experience.subtitle')}</ExperienceSubtitle>
        <ExperienceGrid
          variants={scrollRevealStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {EXPERIENCE_ITEM_KEYS.map((key: string) => (
            <ExperienceCard
              key={key}
              variants={scrollRevealItem}
              whileHover={{ y: -4 }}
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
          <CertificateHours>
            {t('skills.certificates.totalHours', { hours: totalHours })}
          </CertificateHours>
        </SectionTitle>
        <CertificatesGrid
          variants={scrollRevealStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {sortedCertificates.map((cert: CertificateItem) => {
            const platform = platformConfig[cert.platform];
            return (
              <CertificateCard
                key={cert.id}
                variants={scrollRevealItem}
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
                  <CertificateYear>
                    {t('skills.certificates.hours', { count: cert.hours })} • {cert.year}
                  </CertificateYear>
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
                  <ModalTitle>{t(`skills.certificates.items.${selectedCertificate.id}`)}</ModalTitle>
                  <ModalMeta>
                    <ModalMetaItem>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {t('skills.certificates.hours', { count: selectedCertificate.hours })}
                    </ModalMetaItem>
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
                    <ModalMetaItem>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {t(`skills.certificates.types.${selectedCertificate.type}`)}
                      {selectedCertificate.coursesCount &&
                        ` (${t('skills.certificates.courses', {
                          count: selectedCertificate.coursesCount,
                        })})`}
                    </ModalMetaItem>
                  </ModalMeta>
                </ModalCertificateInfo>
                <ModalActions>
                  <ModalButton
                    $variant="primary"
                    onClick={handleViewCertificate}
                    $platformColor={platformConfig[selectedCertificate.platform].color}
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
