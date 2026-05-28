// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useScrollMotion } from '../../../hooks/useScrollMotion';

// Component
import {
  ManifestoBand,
  ManifestoInner,
  ManifestoIndex,
  ManifestoQuote,
  ManifestoLine,
  ManifestoEmphasis,
  ManifestoMeta,
} from './HomeManifestoStrip.style';

export const HomeManifestoStrip = (): React.ReactElement => {
  const { t } = useTranslation();
  const { manifestoStagger, manifestoPhrase, viewport } = useScrollMotion();

  return (
    <ManifestoBand id="manifesto" aria-label={t('home.manifesto.aria')}>
      <ManifestoInner
        variants={manifestoStagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <ManifestoIndex variants={manifestoPhrase} aria-hidden>
          {t('home.manifesto.index')}
        </ManifestoIndex>
        <ManifestoQuote>
          <ManifestoLine variants={manifestoPhrase}>
            {t('home.manifesto.linePrimary')}
          </ManifestoLine>
          <ManifestoEmphasis variants={manifestoPhrase}>
            {t('home.manifesto.lineEmphasis')}
          </ManifestoEmphasis>
          <ManifestoMeta variants={manifestoPhrase}>
            {t('home.manifesto.meta')}
          </ManifestoMeta>
        </ManifestoQuote>
      </ManifestoInner>
    </ManifestoBand>
  );
};
