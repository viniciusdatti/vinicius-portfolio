// Core
import { useEffect, useRef, useState } from 'react';

// Libraries
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface LiveLabWorkspacePinRefs {
  sectionRef: React.RefObject<HTMLElement | null>;
  stageRef: React.RefObject<HTMLDivElement | null>;
  logFlowRef: React.RefObject<HTMLDivElement | null>;
  progressRef: React.RefObject<HTMLDivElement | null>;
}

export interface LiveLabWorkspacePinState {
  refs: LiveLabWorkspacePinRefs;
  pinEnabled: boolean;
}

// =================================================================================================
// ============================================ CONSTANTS ==========================================
// =================================================================================================

const DESKTOP_QUERY: string = '(min-width: 1024px)';
const SCROLL_DISTANCE: string = '+=200%';
const PIN_START: string = 'top top+=6rem';

// =================================================================================================
// ============================================== HOOK =============================================
// =================================================================================================

/**
 * Pins the Live Lab monitor stage while the event log band scrolls through the viewport.
 */
export const useLiveLabWorkspacePin = (): LiveLabWorkspacePinState => {
  const reduced: boolean = usePrefersReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(DESKTOP_QUERY).matches;
  });
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const logFlowRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const pinEnabled: boolean = !reduced && isDesktop;

  useEffect(() => {
    const media: MediaQueryList = window.matchMedia(DESKTOP_QUERY);
    const onChange = (): void => setIsDesktop(media.matches);
    media.addEventListener('change', onChange);
    return (): void => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.body.classList.add('workspace-operational');
    return (): void => {
      document.body.classList.remove('workspace-operational');
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('live-lab-immersive', pinEnabled);
    return (): void => {
      document.body.classList.remove('live-lab-immersive');
    };
  }, [pinEnabled]);

  useGSAP(
    () => {
      if (!pinEnabled) return undefined;

      const section: HTMLElement | null = sectionRef.current;
      const stage: HTMLElement | null = stageRef.current;
      const logFlow: HTMLElement | null = logFlowRef.current;
      const progress: HTMLElement | null = progressRef.current;

      if (!section || !stage) return undefined;

      gsap.set(stage, { '--workspace-pin-t': 0 });
      if (progress) gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });

      let timeline: gsap.core.Timeline | null = null;

      timeline = gsap.timeline({
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

      timeline.fromTo(
        stage,
        { '--workspace-pin-t': 0 },
        { '--workspace-pin-t': 1, ease: 'none', duration: 1 },
        0,
      );

      if (logFlow) {
        timeline.fromTo(
          logFlow,
          { opacity: 0.72, y: 12 },
          {
            opacity: 1, y: 0, ease: 'none', duration: 0.55,
          },
          0.08,
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

      const onResize = (): void => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', onResize);

      return (): void => {
        window.removeEventListener('resize', onResize);
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
      };
    },
    { scope: sectionRef, dependencies: [pinEnabled] },
  );

  return {
    refs: {
      sectionRef,
      stageRef,
      logFlowRef,
      progressRef,
    },
    pinEnabled,
  };
};
