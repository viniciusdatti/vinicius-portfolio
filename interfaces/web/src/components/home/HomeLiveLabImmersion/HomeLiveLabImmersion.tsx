// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useLiveLabImmersionPin } from '@/hooks/useLiveLabImmersionPin';
import { useScrollMotion } from '@/hooks/useScrollMotion';

// Components
import { ObservatoryCanvas2D } from '@/components/atmosphere/ObservatoryCanvas2D';
import { LiveLabObservatory } from '@/components/home/LiveLabObservatory';
import {
  ImmersionBand,
  ImmersionPinStage,
  ImmersionAtmosphere,
  ImmersionGrid,
  ImmersionCopy,
  ImmersionIndex,
  ImmersionEyebrow,
  ImmersionTitle,
  ImmersionLead,
  LiveBadge,
  ImmersionCta,
  ImmersionVisual,
  ObservatoryCanvas,
  ImmersionFieldParallax,
  VisualFrame,
  VisualFrameForeground,
  NarrativeProgressTrack,
  NarrativeProgressFill,
} from '@/components/home/HomeLiveLabImmersion/HomeLiveLabImmersion.style';

const viewport = { once: true, margin: '-60px' as const };

export function HomeLiveLabImmersion(): React.ReactElement {
  const { t } = useTranslation();
  const { section } = useScrollMotion();
  const { refs, pinEnabled } = useLiveLabImmersionPin();

  return (
    <ImmersionBand
      ref={refs.sectionRef}
      id="live-lab-preview"
      aria-label={t('home.sections.liveLab.aria')}
    >
      <ImmersionPinStage ref={refs.stageRef}>
        <ImmersionAtmosphere ref={refs.atmosphereRef} aria-hidden />
        <NarrativeProgressTrack aria-hidden>
          <NarrativeProgressFill ref={refs.progressRef} />
        </NarrativeProgressTrack>
        <ImmersionGrid
          variants={pinEnabled ? undefined : section}
          initial={pinEnabled ? false : 'hidden'}
          whileInView={pinEnabled ? undefined : 'visible'}
          viewport={viewport}
        >
          <ImmersionCopy ref={refs.copyRef}>
            <ImmersionIndex aria-hidden>{t('home.sections.liveLab.index')}</ImmersionIndex>
            <ImmersionEyebrow>{t('home.sections.liveLab.eyebrow')}</ImmersionEyebrow>
            <ImmersionTitle>{t('home.liveLabPreview.title')}</ImmersionTitle>
            <LiveBadge>{t('home.liveLabPreview.badge')}</LiveBadge>
            <ImmersionLead>{t('home.liveLabPreview.description')}</ImmersionLead>
            <ImmersionCta to="/live-lab">{t('home.liveLabPreview.cta')}</ImmersionCta>
          </ImmersionCopy>
          <ImmersionVisual>
            <ObservatoryCanvas ref={refs.canvasRef}>
              <VisualFrame>
                <ImmersionFieldParallax ref={refs.fieldLayerRef}>
                  <ObservatoryCanvas2D />
                </ImmersionFieldParallax>
                <VisualFrameForeground ref={refs.hudLayerRef}>
                  <LiveLabObservatory />
                </VisualFrameForeground>
              </VisualFrame>
            </ObservatoryCanvas>
          </ImmersionVisual>
        </ImmersionGrid>
      </ImmersionPinStage>
    </ImmersionBand>
  );
}
