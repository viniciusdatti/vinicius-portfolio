// Core
import React from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  HeroCanvasInteractionMode,
  useHeroCanvasPointer,
} from '@/hooks/useHeroCanvasPointer';

// Components
import { publicAssetUrl } from '@/config/env';
import { Button } from '@/components/Button';
import { HeroPortraitBust } from '@/components/Hero/HeroPortraitBust';
import {
  HeroHeadlineChoreography,
  type HeroHeadlineBlockConfig,
} from '@/components/Hero/HeroHeadlineChoreography';
import {
  HeroSection,
  HeroColumnGuides,
  HeroLayoutGrid,
  HeroNarrativeColumn,
  HeroVoidReserve,
  HeroPortraitMobileSlot,
  HeroPortrait,
  HeroMicroLabel,
  HeroStackLine,
  HeroStackTech,
  HeroDescription,
  CtaWrapper,
  CtaButtonWrapper,
  HeroScrollCue,
  HeroScrollChevron,
  ScrollCueLine,
} from '@/components/Hero/Hero.style';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const STACK_TECHNOLOGIES: string[] = [
  'React',
  'TypeScript',
  'WebSocket',
  'FastAPI',
];

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

const scrollToNarrative = (): void => {
  document.getElementById('section-work')?.scrollIntoView({ behavior: 'smooth' });
};

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Hero — geometry-first landing: fluid headline, mono micro-labels, 12-col void bay at desktop.
 */
export const Hero: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const reduced: boolean = usePrefersReducedMotion();
  const heroRef = React.useRef<HTMLElement | null>(null);
  const voidReserveRef = React.useRef<HTMLDivElement | null>(null);
  const avatarSrc: string = publicAssetUrl('avatar.png');

  const { pointer: portraitPointer } = useHeroCanvasPointer({
    mode: HeroCanvasInteractionMode.MouseTelemetry,
    heroContainerRef: heroRef,
    voidContainerRef: voidReserveRef,
    disabled: reduced,
  });

  const headlineBlocks: HeroHeadlineBlockConfig[] = [
    {
      label: t('home.hero.boot.channel'),
      line: t('home.hero.headlineLine1'),
    },
    {
      label: t('home.hero.boot.status'),
      line: t('home.hero.headlineLine2'),
      accentLine: true,
    },
  ];

  return (
    <HeroSection ref={heroRef} aria-label={t('home.hero.aria')}>
      <HeroColumnGuides aria-hidden />
      <HeroLayoutGrid>
        <HeroNarrativeColumn>
          <HeroMicroLabel>{t('home.hero.eyebrow')}</HeroMicroLabel>

          <HeroHeadlineChoreography blocks={headlineBlocks} />

          <HeroPortraitMobileSlot>
            <HeroPortrait>
              <img src={avatarSrc} alt={t('home.hero.portraitAlt')} />
            </HeroPortrait>
          </HeroPortraitMobileSlot>

          <HeroStackLine>
            {STACK_TECHNOLOGIES.map((tech: string) => (
              <HeroStackTech key={tech}>{tech}</HeroStackTech>
            ))}
          </HeroStackLine>

          <HeroDescription>{t('home.hero.description')}</HeroDescription>

          <CtaWrapper>
            <CtaButtonWrapper>
              <Button as={Link} to="/projects">
                {t('home.hero.ctaPrimary')}
              </Button>
            </CtaButtonWrapper>
            <CtaButtonWrapper>
              <Button variant="secondary" as={Link} to="/live-lab">
                {t('home.hero.ctaSecondary')}
              </Button>
            </CtaButtonWrapper>
          </CtaWrapper>

          <HeroScrollCue
            type="button"
            onClick={scrollToNarrative}
            aria-label={t('home.hero.scrollCue')}
          >
            <ScrollCueLine aria-hidden />
            {t('home.hero.scrollCue')}
            <HeroScrollChevron aria-hidden>▼</HeroScrollChevron>
          </HeroScrollCue>
        </HeroNarrativeColumn>

        <HeroVoidReserve ref={voidReserveRef}>
          <HeroPortraitBust imageSrc={avatarSrc} pointer={portraitPointer} />
        </HeroVoidReserve>
      </HeroLayoutGrid>
    </HeroSection>
  );
};
