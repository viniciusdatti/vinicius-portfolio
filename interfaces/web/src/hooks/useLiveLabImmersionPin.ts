// Core
import {
  useEffect,
  useRef,
  useState,
} from 'react';

// Libraries
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Hooks
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

// Styles
import { DESKTOP_BREAKPOINT_PX } from '../styles/theme/shared';
import { motionPresets } from '../styles/motionPresets';

// Utils
import { LIVE_LAB_IMMERSIVE_CLASS } from '../utils/bodyScrollLock';

export interface LiveLabImmersionPinRefs {
  sectionRef: React.RefObject<HTMLElement | null>;
  stageRef: React.RefObject<HTMLDivElement | null>;
  copyRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  fieldLayerRef: React.RefObject<HTMLDivElement | null>;
  hudLayerRef: React.RefObject<HTMLDivElement | null>;
  atmosphereRef: React.RefObject<HTMLDivElement | null>;
  progressRef: React.RefObject<HTMLDivElement | null>;
}

export interface LiveLabImmersionPinState {
  refs: LiveLabImmersionPinRefs;
  pinEnabled: boolean;
}

const DESKTOP_QUERY: string = `(min-width: ${DESKTOP_BREAKPOINT_PX}px)`;
const SCROLL_DISTANCE: string = '+=220%';
const PIN_START: string = 'top top+=6rem';
const HEADER_OFFSET_PX: number = 96;

/** Maps the pinned canvas rect to a full-bleed scale/translate for the immersion reveal. */
const computeFullBleedTransform = (
  canvas: HTMLElement,
): { scale: number; x: number; y: number } => {
  const rect: DOMRect = canvas.getBoundingClientRect();
  const viewportWidth: number = window.innerWidth;
  const viewportHeight: number = window.innerHeight - HEADER_OFFSET_PX;
  const scaleX: number = viewportWidth / rect.width;
  const scaleY: number = viewportHeight / rect.height;
  const scale: number = Math.max(scaleX, scaleY) * 1.015;
  const centerX: number = rect.left + rect.width / 2;
  const centerY: number = rect.top + rect.height / 2;
  const targetX: number = viewportWidth / 2;
  const targetY: number = HEADER_OFFSET_PX + viewportHeight / 2;
  const x: number = targetX - centerX;
  const y: number = targetY - centerY;

  return { scale, x, y };
};

export const useLiveLabImmersionPin = (): LiveLabImmersionPinState => {
  const reduced: boolean = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(DESKTOP_QUERY).matches;
  });
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const fieldLayerRef = useRef<HTMLDivElement | null>(null);
  const hudLayerRef = useRef<HTMLDivElement | null>(null);
  const atmosphereRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const pinEnabled: boolean = !reduced && isDesktop;

  // Toggles document scroll mode so Framer viewport.root defers to Layout when pinned.
  useEffect(() => {
    document.body.classList.toggle(LIVE_LAB_IMMERSIVE_CLASS, pinEnabled);
    return (): void => {
      document.body.classList.remove(LIVE_LAB_IMMERSIVE_CLASS);
    };
  }, [pinEnabled]);

  useEffect(() => {
    const media: MediaQueryList = window.matchMedia(DESKTOP_QUERY);
    const onChange = (): void => setIsDesktop(media.matches);
    media.addEventListener('change', onChange);
    return (): void => media.removeEventListener('change', onChange);
  }, []);

  useGSAP(
    () => {
      if (reduced || !isDesktop) return undefined;

      const section: HTMLElement | null = sectionRef.current;
      const stage: HTMLElement | null = stageRef.current;
      const copy: HTMLElement | null = copyRef.current;
      const canvas: HTMLElement | null = canvasRef.current;
      const fieldLayer: HTMLElement | null = fieldLayerRef.current;
      const hudLayer: HTMLElement | null = hudLayerRef.current;
      const atmosphere: HTMLElement | null = atmosphereRef.current;
      const progress: HTMLElement | null = progressRef.current;

      if (!section || !stage || !canvas) return undefined;

      gsap.set(stage, { '--immersion-t': 0 });
      if (atmosphere) gsap.set(atmosphere, { opacity: 0 });
      if (progress) gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });

      // Pinned scrub timeline: copy fades, canvas full-bleeds, HUD/field parallax, progress bar.
      const buildTimeline = (): gsap.core.Timeline => {
        const {
          scale,
          x,
          y,
        } = computeFullBleedTransform(canvas);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: PIN_START,
            end: SCROLL_DISTANCE,
            pin: stage,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        if (copy) {
          timeline.fromTo(
            copy,
            { opacity: 1, y: 0 },
            {
              opacity: 0,
              y: -motionPresets.distance.fadeUp,
              ease: 'none',
              duration: 0.22,
            },
            0,
          );
        }

        timeline.fromTo(
          canvas,
          {
            scale: 1,
            x: 0,
            y: 0,
            transformOrigin: '50% 50%',
          },
          {
            scale,
            x,
            y,
            ease: 'none',
            duration: 0.68,
          },
          0.1,
        );

        if (fieldLayer) {
          timeline.fromTo(
            fieldLayer,
            { y: 0, opacity: 0.72 },
            {
              y: -motionPresets.distance.editorial,
              opacity: 0.95,
              ease: 'none',
              duration: 0.68,
            },
            0.1,
          );
        }

        if (hudLayer) {
          timeline.fromTo(
            hudLayer,
            { y: 0 },
            {
              y: motionPresets.distance.item,
              ease: 'none',
              duration: 0.68,
            },
            0.1,
          );
        }

        timeline.fromTo(
          stage,
          { '--immersion-t': 0 },
          { '--immersion-t': 1, ease: 'none', duration: 0.68 },
          0.1,
        );

        if (atmosphere) {
          timeline.fromTo(
            atmosphere,
            { opacity: 0 },
            { opacity: 1, ease: 'none', duration: 0.32 },
            0.48,
          );
        }

        if (progress) {
          timeline.fromTo(
            progress,
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', duration: 1 },
            0,
          );
        }

        return timeline;
      };

      buildTimeline();

      const onResize = (): void => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', onResize);

      return (): void => {
        window.removeEventListener('resize', onResize);
      };
    },
    { scope: sectionRef, dependencies: [reduced, isDesktop] },
  );

  return {
    refs: {
      sectionRef,
      stageRef,
      copyRef,
      canvasRef,
      fieldLayerRef,
      hudLayerRef,
      atmosphereRef,
      progressRef,
    },
    pinEnabled,
  };
};
