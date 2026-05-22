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
  ShowcaseActions,
  ShowcaseBadge,
} from './LiveLabShowcaseHeader.style';

export function LiveLabShowcaseHeader(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <ShowcaseHeaderRoot role="region" aria-label={t('liveLab.title')}>
      <ShowcaseHeaderCopy>
        <ShowcaseTitle>{t('liveLab.title')}</ShowcaseTitle>
        <ShowcaseLead>{t('liveLab.subtitle')}</ShowcaseLead>
      </ShowcaseHeaderCopy>
      <ShowcaseActions>
        <ShowcaseBadge title={t('workspace.boot.showcaseBadgeTooltip')}>
          {t('workspace.boot.showcaseBadge')}
        </ShowcaseBadge>
      </ShowcaseActions>
    </ShowcaseHeaderRoot>
  );
}
