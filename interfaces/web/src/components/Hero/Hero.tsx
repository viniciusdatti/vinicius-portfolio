// Core
import React from 'react';

// Libraries
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useAvatarPortraitObjectPosition } from '@/hooks/useAvatarPortraitObjectPosition';

// Components
import { publicAssetUrl } from '@/config/env';
import { AvatarPortraitPhoto } from '@/components/AvatarPortrait';
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
  HeroNarrativeContent,
  HeroPortraitDesktopSlot,
  HeroPortraitMobileSlot,
  HeroPortraitMobileReveal,
  HeroPortrait,
  HeroMicroLabel,
  HeroEyebrowRow,
  HeroEyebrowLine,
  HeroEyebrowStack,
  HeroLiveIndicatorRow,
  HeroHeadline,
  HeroHeadlineClip,
  HeroHeadlineClipInner,
  HeroHeadlineLine,
  HeroHeadlineText,
  HeroHeadlineHighlight,
  HeroStackLine,
  HeroStackTech,
  HeroDescription,
  CtaWrapper,
  CtaButtonWrapper,
  HeroScrollCue,
  HeroScrollCueSlot,
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

interface HeroPortraitFrameProps {
  avatarSrc: string;
  alt: string;
}

/** Measured portrait frame — object-position tracks container size (mobile + desktop). */
const HeroPortraitFrame: React.FC<HeroPortraitFrameProps> = ({
  avatarSrc,
  alt,
}): React.ReactElement => {
  const { frameRef, objectPosition } = useAvatarPortraitObjectPosition();

  return (
    <HeroPortrait ref={frameRef}>
      <AvatarPortraitPhoto
        src={avatarSrc}
        alt={alt}
        $objectPosition={objectPosition}
      />
    </HeroPortrait>
  );
};

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Hero — canonical 2-column narrative + portrait grid, editorial cubic choreography.
 */
export const Hero: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const reduced: boolean = usePrefersReducedMotion();
  const heroRef = React.useRef<HTMLElement | null>(null);
  const avatarSrc: string = publicAssetUrl('avatar.png');

  const motionInitial: string = reduced ? 'show' : 'hidden';
  const motionAnimate: string = 'show';

  return (
    <HeroSection ref={heroRef} aria-label={t('home.hero.aria')}>
      <HeroBackgroundStack aria-hidden>
        <HeroDotGrid />
        <HeroCenterWash />
      </HeroBackgroundStack>
      <HeroVisual3D containerRef={heroRef} />
      <HeroColumnGuides aria-hidden />
      <HeroLayoutGrid>
        <HeroPortraitMobileReveal
          variants={heroModuleReveal}
          initial={motionInitial}
          animate={motionAnimate}
        >
          <HeroPortraitMobileSlot>
            <HeroPortraitFrame
              avatarSrc={avatarSrc}
              alt={t('home.hero.portraitAlt')}
            />
          </HeroPortraitMobileSlot>
        </HeroPortraitMobileReveal>

        <HeroNarrativeColumn>
          <HeroNarrativeContent>
            <HeroMotionStack
              variants={heroEntranceStagger}
              initial={motionInitial}
              animate={motionAnimate}
            >
              <motion.div variants={heroMonoReveal}>
                <HeroEyebrowStack>
                  <HeroEyebrowRow>
                    <HeroEyebrowLine
                      variants={heroEyebrowLineExpand}
                      initial={motionInitial}
                      animate={motionAnimate}
                      aria-hidden
                    />
                    <HeroMicroLabel>{t('home.hero.eyebrow')}</HeroMicroLabel>
                  </HeroEyebrowRow>
                  <HeroLiveIndicatorRow>
                    <HeroMicroLabel>{t('home.hero.liveIndicator')}</HeroMicroLabel>
                  </HeroLiveIndicatorRow>
                </HeroEyebrowStack>
              </motion.div>

              <HeroHeadline
                variants={heroHeadlineStagger}
                initial={motionInitial}
                animate={motionAnimate}
              >
                <HeroHeadlineClip>
                  <HeroHeadlineClipInner
                    variants={heroHeadlineClipReveal}
                    initial={motionInitial}
                    animate={motionAnimate}
                  >
                    <HeroHeadlineLine>
                      <HeroHeadlineText>{t('home.hero.headlinePart1')}</HeroHeadlineText>
                      <HeroHeadlineHighlight>{t('home.hero.headlinePart2')}</HeroHeadlineHighlight>
                    </HeroHeadlineLine>
                  </HeroHeadlineClipInner>
                </HeroHeadlineClip>
              </HeroHeadline>

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
            </HeroMotionStack>
          </HeroNarrativeContent>

          <HeroScrollCueSlot
            variants={heroModuleReveal}
            initial={motionInitial}
            animate={motionAnimate}
          >
            <HeroScrollCue
              type="button"
              onClick={scrollToNarrative}
              aria-label={t('home.hero.scrollCue')}
            >
              <ScrollCueLine aria-hidden />
              {t('home.hero.scrollCue')}
              <HeroScrollChevron aria-hidden>▼</HeroScrollChevron>
            </HeroScrollCue>
          </HeroScrollCueSlot>
        </HeroNarrativeColumn>

        <HeroPortraitDesktopSlot
          variants={heroModuleReveal}
          initial={motionInitial}
          animate={motionAnimate}
        >
          <HeroPortraitFrame
            avatarSrc={avatarSrc}
            alt={t('home.hero.portraitAlt')}
          />
        </HeroPortraitDesktopSlot>
      </HeroLayoutGrid>
    </HeroSection>
  );
};
