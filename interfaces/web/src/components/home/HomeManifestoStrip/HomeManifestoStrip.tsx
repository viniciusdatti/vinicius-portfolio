// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useScrollMotion } from '@/hooks/useScrollMotion';

// View
import {
  ManifestoBand,
  ManifestoInner,
  ManifestoIndex,
  ManifestoQuote,
  ManifestoLine,
  ManifestoEmphasis,
  ManifestoMeta,
} from '@/components/home/HomeManifestoStrip/HomeManifestoStrip.style';

const viewport = { once: true, margin: '-40px' as const };

export function HomeManifestoStrip(): React.ReactElement {
  const { t } = useTranslation();
  const { manifestoStagger, manifestoPhrase } = useScrollMotion();

  return (
    <ManifestoBand id="manifesto" aria-label={t('home.manifesto.aria')}>
      <ManifestoInner
        variants={manifestoStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <ManifestoIndex aria-hidden>{t('home.manifesto.index')}</ManifestoIndex>
        <ManifestoQuote>
          <ManifestoLine variants={manifestoPhrase}>
            {t('home.manifesto.linePrimary')}
          </ManifestoLine>
          <ManifestoEmphasis variants={manifestoPhrase}>
            {t('home.manifesto.lineEmphasis')}
          </ManifestoEmphasis>
          <ManifestoMeta>{t('home.manifesto.meta')}</ManifestoMeta>
        </ManifestoQuote>
      </ManifestoInner>
    </ManifestoBand>
  );
}
