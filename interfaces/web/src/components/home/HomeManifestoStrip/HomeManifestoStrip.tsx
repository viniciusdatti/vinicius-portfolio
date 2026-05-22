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
  ManifestoLine,
  ManifestoMeta,
} from '@/components/home/HomeManifestoStrip/HomeManifestoStrip.style';

const viewport = { once: true, margin: '-40px' as const };

export function HomeManifestoStrip(): React.ReactElement {
  const { t } = useTranslation();
  const { section } = useScrollMotion();

  return (
    <ManifestoBand id="manifesto" aria-label={t('home.manifesto.aria')}>
      <ManifestoInner
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <ManifestoIndex aria-hidden>—</ManifestoIndex>
        <div>
          <ManifestoLine>{t('home.manifesto.line')}</ManifestoLine>
          <ManifestoMeta>{t('home.manifesto.meta')}</ManifestoMeta>
        </div>
      </ManifestoInner>
    </ManifestoBand>
  );
}
