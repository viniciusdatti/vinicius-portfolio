// Core
import React from 'react';

// Libraries
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import { publicAssetUrl } from '@/config/env';
import { Button } from '@/components/Button';
import { HeroVisual3D } from '@/components/Hero/HeroVisual3D';
import {
  heroEntranceStagger,
  heroEyebrowLineExpand,
  heroHeadlineClipReveal,
  heroHeadlineStagger,
  heroModuleReveal,
  heroMonoReveal,
} from '@/components/Hero/Hero.motion';
import {
  HeroSection,
  HeroBackgroundStack,
  HeroDotGrid,
  HeroCenterWash,
  HeroColumnGuides,
  HeroLayoutGrid,
  HeroNarrativeColumn,
  HeroVoidReserve,
  HeroPortraitDesktopSlot,
  HeroPortraitMobileSlot,
  HeroPortrait,
  HeroMicroLabel,
  HeroEyebrowRow,
  HeroEyebrowLine,
  HeroHeadline,
  HeroHeadlineBlockLabel,
  HeroHeadlineClip,
  HeroHeadlineLine,
  HeroStackLine,
  HeroStackTech,
  HeroDescription,
  CtaWrapper,
  CtaButtonWrapper,
  HeroScrollCue,
  HeroScrollChevron,
  ScrollCueLine,
  HeroMotionStack,
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
 * Hero — asymmetric 12-col narrative shell, editorial cubic choreography, amber particle void.
 */
export const Hero: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const reduced: boolean = usePrefersReducedMotion();
  const heroRef = React.useRef<HTMLElement | null>(null);
  const avatarSrc: string = publicAssetUrl('avatar.png');

  const motionInitial: string = reduced ? 'show' : 'hidden';
  const motionAnimate: string = 'show';

  const headlineBlocks: Array<{
    label: string;
    line: string;
    accentLine?: boolean;
  }> = [
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
      <HeroBackgroundStack aria-hidden>
        <HeroDotGrid />
        <HeroCenterWash />
      </HeroBackgroundStack>
      <HeroVisual3D containerRef={heroRef} />
      <HeroColumnGuides aria-hidden />
      <HeroLayoutGrid>
        <HeroNarrativeColumn>
          <HeroMotionStack
            variants={heroEntranceStagger}
            initial={motionInitial}
            animate={motionAnimate}
          >
            <motion.div variants={heroMonoReveal}>
              <HeroEyebrowRow>
                <HeroEyebrowLine
                  variants={heroEyebrowLineExpand}
                  initial={motionInitial}
                  animate={motionAnimate}
                  aria-hidden
                />
                <HeroMicroLabel>{t('home.hero.eyebrow')}</HeroMicroLabel>
              </HeroEyebrowRow>
            </motion.div>

            <HeroHeadline
              variants={heroHeadlineStagger}
              initial={motionInitial}
              animate={motionAnimate}
            >
              {headlineBlocks.map((block) => {
                const isAccentLine: boolean = block.accentLine === true;

                return (
                  <React.Fragment key={block.label}>
                    <motion.div variants={heroMonoReveal}>
                      <HeroHeadlineBlockLabel>{block.label}</HeroHeadlineBlockLabel>
                    </motion.div>
                    <HeroHeadlineClip>
                      <motion.div
                        variants={heroHeadlineClipReveal}
                        initial={motionInitial}
                        animate={motionAnimate}
                      >
                        <HeroHeadlineLine $accent={isAccentLine}>
                          {block.line}
                        </HeroHeadlineLine>
                      </motion.div>
                    </HeroHeadlineClip>
                  </React.Fragment>
                );
              })}
            </HeroHeadline>

            <motion.div variants={heroModuleReveal}>
              <HeroPortraitMobileSlot>
                <HeroPortrait>
                  <img src={avatarSrc} alt={t('home.hero.portraitAlt')} />
                </HeroPortrait>
              </HeroPortraitMobileSlot>
            </motion.div>

            <motion.div variants={heroModuleReveal}>
              <HeroStackLine>
                {STACK_TECHNOLOGIES.map((tech: string) => (
                  <HeroStackTech key={tech}>{tech}</HeroStackTech>
                ))}
              </HeroStackLine>
            </motion.div>

            <motion.div variants={heroModuleReveal}>
              <HeroDescription>{t('home.hero.description')}</HeroDescription>
            </motion.div>

            <motion.div variants={heroModuleReveal}>
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
            </motion.div>

            <motion.div variants={heroModuleReveal}>
              <HeroScrollCue
                type="button"
                onClick={scrollToNarrative}
                aria-label={t('home.hero.scrollCue')}
              >
                <ScrollCueLine aria-hidden />
                {t('home.hero.scrollCue')}
                <HeroScrollChevron aria-hidden>▼</HeroScrollChevron>
              </HeroScrollCue>
            </motion.div>
          </HeroMotionStack>
        </HeroNarrativeColumn>

        <HeroVoidReserve aria-hidden />

        <HeroPortraitDesktopSlot
          variants={heroModuleReveal}
          initial={motionInitial}
          animate={motionAnimate}
        >
          <HeroPortrait>
            <img src={avatarSrc} alt={t('home.hero.portraitAlt')} />
          </HeroPortrait>
        </HeroPortraitDesktopSlot>
      </HeroLayoutGrid>
    </HeroSection>
  );
};
