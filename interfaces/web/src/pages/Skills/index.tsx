// Core
import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Styles
import { staggerContainer, staggerItem, fadeInUp } from '../../styles/animations';

// Types
import type { SkillCategory } from '../../types';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const PageTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PageSubtitle = styled(motion.p)`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.section};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  justify-content: center;
`;

const CategoryTab = styled(motion.button)<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.surface};
  color: ${({ $active, theme }) =>
    $active ? 'white' : theme.colors.textSecondary};
  border: 1px solid ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.border};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ $active, theme }) =>
      $active ? 'white' : theme.colors.primary};
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SkillCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  transition: border-color ${({ theme }) => theme.transitions.fast},
              transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
  }
`;

const SkillIcon = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SkillInfo = styled.div`
  flex: 1;
`;

const SkillName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SkillBar = styled.div`
  height: 6px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const SkillProgress = styled(motion.div)<{ $level: number }>`
  height: 100%;
  background: linear-gradient(90deg, 
    ${({ theme }) => theme.colors.primary}, 
    ${({ theme }) => theme.colors.primaryHover}
  );
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: ${({ $level }) => $level}%;
`;

const CertificatesSection = styled(Section)`
  margin-top: ${({ theme }) => theme.spacing.section};
`;

const CertificatesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CertificateCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CertificateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PlatformLogo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const CertificateName = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CertificatePlatform = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const CertificateYear = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

// Skills data
const skillsData: { category: SkillCategory; name: string; icon: string; level: number }[] = [
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

// Certificates data
const certificatesData = [
  { name: 'React Completo', platform: 'Udemy', year: 2023, icon: '📚' },
  { name: 'TypeScript do Básico ao Avançado', platform: 'Udemy', year: 2023, icon: '📚' },
  { name: 'Python para Data Science', platform: 'Alura', year: 2022, icon: '🎓' },
  { name: 'Ignite React', platform: 'RocketSeat', year: 2023, icon: '🚀' },
  { name: 'Docker Fundamentals', platform: 'Udemy', year: 2023, icon: '📚' },
  { name: 'FastAPI do Zero', platform: 'Udemy', year: 2024, icon: '📚' },
  { name: 'Testes Automatizados', platform: 'Alura', year: 2023, icon: '🎓' },
];

const categories: { key: SkillCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'testing', label: 'Testes' },
  { key: 'tools', label: 'Ferramentas' },
  { key: 'realtime', label: 'Real-time' },
];

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all');

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.category === activeCategory);

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
          {categories.map((cat) => (
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
            {filteredSkills.map((skill, index) => (
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
          {certificatesData.map((cert) => (
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

export default Skills;
