// Core
import { useEffect } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { PageMetaRoute } from './usePageMeta.types';

// Lib
import { applyPageMeta } from '../lib/pageMeta';

export const usePageMeta = (route: PageMetaRoute): void => {
  const { t, i18n } = useTranslation();

  useEffect((): void => {
    const title: string = t(`seo.${route}.title`);
    const description: string = t(`seo.${route}.description`);

    applyPageMeta({
      title,
      description,
      language: i18n.language,
    });
  }, [t, i18n.language, route]);
};
