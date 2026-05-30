// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { useLiveLabImmersionPin } from '../../../hooks/useLiveLabImmersionPin';
import { useScrollMotion } from '../../../hooks/useScrollMotion';

// Styles
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
} from './HomeLiveLabImmersion.style';

// Atmosphere
import { ObservatoryCanvas2D } from '../../atmosphere/ObservatoryCanvas2D';

// Home
import { LiveLabObservatory } from '../LiveLabObservatory';

export const HomeLiveLabImmersion = (): React.ReactElement => {
  const { t } = useTranslation();
  const {
    stagger,
    item,
    section,
    viewport,
  } = useScrollMotion();
  const { refs } = useLiveLabImmersionPin();

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
        <ImmersionGrid>
          <ImmersionCopy
            ref={refs.copyRef}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <ImmersionIndex variants={item} aria-hidden>
              {t('home.sections.liveLab.index')}
            </ImmersionIndex>
            <ImmersionEyebrow variants={item}>
              {t('home.sections.liveLab.eyebrow')}
            </ImmersionEyebrow>
            <ImmersionTitle variants={item}>
              {t('home.liveLabPreview.title')}
            </ImmersionTitle>
            <LiveBadge variants={item}>{t('home.liveLabPreview.badge')}</LiveBadge>
            <ImmersionLead variants={item}>
              {t('home.liveLabPreview.description')}
            </ImmersionLead>
            <ImmersionCta variants={item} to="/live-lab">
              {t('home.liveLabPreview.cta')}
            </ImmersionCta>
          </ImmersionCopy>
          <ImmersionVisual
            variants={section}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
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
};
