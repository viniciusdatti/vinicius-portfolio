// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { LiveLabObservatory } from '@/components/home/LiveLabObservatory';
import { useScrollMotion } from '@/hooks/useScrollMotion';

// View
import {
  ImmersionBand,
  ImmersionGrid,
  ImmersionCopy,
  ImmersionIndex,
  ImmersionEyebrow,
  ImmersionTitle,
  ImmersionLead,
  LiveBadge,
  ImmersionCta,
  ImmersionVisual,
  VisualFrame,
} from '@/components/home/HomeLiveLabImmersion/HomeLiveLabImmersion.style';

const viewport = { once: true, margin: '-60px' as const };

export function HomeLiveLabImmersion(): React.ReactElement {
  const { t } = useTranslation();
  const { section } = useScrollMotion();

  return (
    <ImmersionBand id="live-lab-preview">
      <ImmersionGrid
        variants={section}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <ImmersionCopy>
          <ImmersionIndex aria-hidden>{t('home.sections.liveLab.index')}</ImmersionIndex>
          <ImmersionEyebrow>{t('home.sections.liveLab.eyebrow')}</ImmersionEyebrow>
          <ImmersionTitle>{t('home.liveLabPreview.title')}</ImmersionTitle>
          <LiveBadge>{t('home.liveLabPreview.badge')}</LiveBadge>
          <ImmersionLead>{t('home.liveLabPreview.description')}</ImmersionLead>
          <ImmersionCta to="/live-lab">{t('home.liveLabPreview.cta')}</ImmersionCta>
        </ImmersionCopy>
        <ImmersionVisual>
          <VisualFrame>
            <LiveLabObservatory />
          </VisualFrame>
        </ImmersionVisual>
      </ImmersionGrid>
    </ImmersionBand>
  );
}
