// Core
import { useEffect, useRef } from 'react';

// Libraries
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

const PIN_START: string = 'top top+=6rem';
const LOG_SCROLL_FALLBACK_PX: number = 320;

const resolveLogScrollDistance = (logFlow: HTMLElement | null): string => {
  const logHeight: number = logFlow?.offsetHeight ?? LOG_SCROLL_FALLBACK_PX;
  return `+=${Math.max(logHeight, LOG_SCROLL_FALLBACK_PX)}`;
};

/* *************************************************************************************************
 ********************************************** HOOK ***********************************************
 ************************************************************************************************ */

/**
 * Pins the Live Lab monitor stage while the event log band scrolls through the viewport.
 */
export const useLiveLabWorkspacePin = (): LiveLabWorkspacePinState => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const logFlowRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  /**
   * GSAP pin collapsed the stage (~267px) and clipped the trend chart — disabled until
   * pin spacing is reconciled with the viewport flex budget (MCP-validated 2026-05-23).
   */
  const pinEnabled: boolean = false;

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
          end: () => resolveLogScrollDistance(logFlow),
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
