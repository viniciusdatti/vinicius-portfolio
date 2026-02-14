/**
 * @fileoverview Skills page component.
 * Displays technical skills with filtering by category and certificates section.
 */

// Core
import React, { useState } from 'react';

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
  /** Name of the certificate/course */
  name: string;
  /** Platform where the certificate was obtained */
  platform: string;
  /** Year of completion */
  year: number;
  /** Emoji icon representing the platform type */
  icon: string;
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
 */
const certificatesData: CertificateItem[] = [
  { name: 'React Completo', platform: 'Udemy', year: 2023, icon: '📚' },
  { name: 'TypeScript do Básico ao Avançado', platform: 'Udemy', year: 2023, icon: '📚' },
  { name: 'Python para Data Science', platform: 'Alura', year: 2022, icon: '🎓' },
  { name: 'Ignite React', platform: 'RocketSeat', year: 2023, icon: '🚀' },
  { name: 'Docker Fundamentals', platform: 'Udemy', year: 2023, icon: '📚' },
  { name: 'FastAPI do Zero', platform: 'Udemy', year: 2024, icon: '📚' },
  { name: 'Testes Automatizados', platform: 'Alura', year: 2023, icon: '🎓' },
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

  const filteredSkills: SkillItem[] = activeCategory === 'all'
    ? skillsData
    : skillsData.filter((skill: SkillItem) => skill.category === activeCategory);

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
        <SectionTitle>{t('skills.certificates.title')}</SectionTitle>
        <CertificatesGrid
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {certificatesData.map((cert: CertificateItem) => (
            <CertificateCard
              key={cert.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
            >
              <CertificateHeader>
                <PlatformLogo>{cert.icon}</PlatformLogo>
                <div>
                  <CertificateName>{cert.name}</CertificateName>
                  <CertificatePlatform>{cert.platform}</CertificatePlatform>
                </div>
              </CertificateHeader>
              <CertificateYear>{cert.year}</CertificateYear>
            </CertificateCard>
          ))}
        </CertificatesGrid>
      </CertificatesSection>
    </PageContainer>
  );
};
