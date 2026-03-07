/**
 * @fileoverview How I Build page. Maps patterns to live pages in the portfolio.
 * Shows the differential: this site is the proof of what I implement in real projects.
 */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Styles
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
} from '../../styles/animations';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  Grid,
  Card,
  CardTitle,
  CardDescription,
  CardLink,
} from './HowIBuild.style';

/** Pattern key and route path (paths are same for pt/en). */
const PATTERNS: ReadonlyArray<{ key: string; path: string }> = [
  { key: 'listsFilterDrawer', path: '/projects' },
  { key: 'realtime', path: '/live-lab' },
  { key: 'i18nTheming', path: '/' },
  { key: 'authAdmin', path: '/admin/login' },
  { key: 'designSystem', path: '/about' },
];

/**
 * How I Build page: lists patterns and links to where they are implemented.
 */
export const HowIBuild: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {t('howIBuild.title')}
        </PageTitle>
        <PageSubtitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {t('howIBuild.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <Grid
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {PATTERNS.map(({ key, path }) => (
          <Card
            key={key}
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            <CardTitle>{t(`howIBuild.items.${key}.title`)}</CardTitle>
            <CardDescription>
              {t(`howIBuild.items.${key}.description`)}
            </CardDescription>
            <CardLink to={path}>
              {t(`howIBuild.items.${key}.linkLabel`)}
              <span aria-hidden>→</span>
            </CardLink>
          </Card>
        ))}
      </Grid>
    </PageContainer>
  );
};
