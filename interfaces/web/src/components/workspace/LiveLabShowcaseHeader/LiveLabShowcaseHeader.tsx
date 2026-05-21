// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  ShowcaseHeaderRoot,
  ShowcaseHeaderCopy,
  ShowcaseTitle,
  ShowcaseLead,
  ShowcaseBadge,
} from './LiveLabShowcaseHeader.style';

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

/**
 * Page-level Live Lab title — portfolio showcase hierarchy (h1), not boot strip.
 */
export const LiveLabShowcaseHeader: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <ShowcaseHeaderRoot role="region" aria-label={t('liveLab.title')}>
      <ShowcaseHeaderCopy>
        <ShowcaseTitle>{t('liveLab.title')}</ShowcaseTitle>
        <ShowcaseLead>{t('liveLab.subtitle')}</ShowcaseLead>
      </ShowcaseHeaderCopy>
      <ShowcaseBadge>{t('workspace.boot.showcaseBadge')}</ShowcaseBadge>
    </ShowcaseHeaderRoot>
  );
};
