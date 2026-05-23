/**
 * @fileoverview Skills page component.
 * Displays technical skills with editorial hierarchy and certificates section.
 */

// Core
import React, { useState, useCallback, useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence, type Variants } from 'framer-motion';

// Types
import { SkillCategory, type Certificate, type Skill } from '@/types';

// Hooks
import { useSkills, useCertificates } from '@/hooks';
import { usePhysicalInteraction } from '@/hooks/usePhysicalInteraction';
import type { UsePhysicalInteractionResult } from '@/hooks/usePhysicalInteraction.types';

// Domain
import {
  buildEditorialSkillsLayout,
  getPlatformConfig,
  resolveCertificateDisplayName,
  resolveSkillDisplayName,
  resolveSkillIconUrl,
  sortCertificates,
  SkillLayoutTier,
  type EditorialSkillsLayout,
  type SkillLayoutPlacement,
} from '@/domain/skills';

// Components
import { motionEase } from '@/styles/animations';
import { motionPresets } from '@/styles/motionPresets';
import { SkillCardSkeleton } from '@/components/SkillCardSkeleton';
import { SupportStackCard } from '@/components/Skills/SupportStackCard';
import { useScrollMotion } from '@/hooks/useScrollMotion';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageTitleGradient,
  PageSubtitle,
  SectionEyebrow,
} from '@/styles/pageLayout.style';

// View
import {
  Section,
  SectionTitle,
  SectionTitleGradient,
  CategoryTabs,
  CategoryTab,
  SkillsStaggerSlot,
  SkillsGrid,
  SkillsEditorialLayout,
  SkillsCoreChapter,
  SkillsCoreLead,
  SkillsHeroBlock,
  SkillsHeroSignal,
  SkillsHeroName,
  SkillsHeroIcon,
  SkillsHeroMeta,
  SkillsHeroDesc,
  SkillsHeroDomain,
  SkillsAsymmetricGrid,
  SupportStackFeaturedRow,
  SupportStackGrid,
  SupportStackMatrix,
  SkillEditorialCard,
  SkillEditorialIcon,
  SkillEditorialName,
  SkillEditorialDomain,
  SkillEditorialInfo,
  SkillCategoryLabel,
  SkillsPeripheralChapter,
  ExperienceSection,
  ExperienceIntro,
  ExperienceSubtitle,
  ExperienceGrid,
  ExperienceCard,
  ExperienceCardTitle,
  ExperienceCardDescription,
  ExperienceCardHighlight,
  CertificatesSection,
  CertificatesGrid,
  CertificateCard,
  CertificateHeader,
  PlatformLogo,
  CertificateName,
  CertificatePlatform,
  CertificateYear,
  CertificateFooter,
  CertificateLink,
  CertificateModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalCertificateInfo,
  ModalPlatformBadge,
  ModalTitle,
  ModalMeta,
  ModalMetaItem,
  ModalActions,
  ModalButton,
  CertificateHours,
  ErrorMessage,
  RetryButton,
} from '@/pages/Skills/Skills.style';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

interface CategoryOption {
  key: SkillCategory | 'all';
  label: string;
}

interface SkillsPageState {
  activeCategory: SkillCategory | 'all';
  selectedCertificate: Certificate | null;
}

// =================================================================================================
// ============================================ CONSTANTS ==========================================
// =================================================================================================

const categories: CategoryOption[] = [
  { key: 'all', label: '' },
  { key: SkillCategory.Frontend, label: 'Frontend' },
  { key: SkillCategory.Backend, label: 'Backend' },
  { key: SkillCategory.Testing, label: 'Testes' },
  { key: SkillCategory.Tools, label: 'Ferramentas' },
  { key: SkillCategory.Realtime, label: 'Real-time' },
];

const EXPERIENCE_ITEM_KEYS: readonly string[] = [
  'auth',
  'state',
  'i18n',
  'realtime',
  'api',
  'theming',
  'dashboards',
  'crud',
  'architecture',
  'testing',
];

/** Production WebSocket dashboards card — spans 2 columns on desktop. */
const FEATURED_EXPERIENCE_KEY: string = 'realtime';

const SKELETON_CARD_COUNT: number = 8;

/** Category chip reveal on card hover — ease-out only (no spring bounce). */
const skillCategoryLabelVariants: Variants = {
  hidden: { y: 6, opacity: 0 },
  visible: { y: 6, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: {
      duration: motionPresets.duration.fast,
      ease: motionEase,
    },
  },
};

const MARKETING_SPOTLIGHT_TIERS: ReadonlySet<SkillLayoutTier> = new Set([
  SkillLayoutTier.CoreLarge,
  SkillLayoutTier.CoreMedium,
  SkillLayoutTier.PeripheralFeatured,
]);

const initialState: SkillsPageState = {
  activeCategory: 'all',
  selectedCertificate: null,
};

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

const resolveCoreDomainLabel = (
  skillName: string,
  t: (key: string) => string,
): string | null => {
  const domainKey: string = `skills.layout.coreDomains.${skillName}`;
  const translated: string = t(domainKey);
  return translated === domainKey ? null : translated;
};

const resolvePeripheralDomainLabel = (
  skillName: string,
  t: (key: string) => string,
): string | null => {
  const domainKey: string = `skills.layout.peripheralDomains.${skillName}`;
  const translated: string = t(domainKey);
  return translated === domainKey ? null : translated;
};

const resolvePeripheralDescription = (
  skill: Skill,
  t: (key: string) => string,
): string => {
  const domainLabel: string | null = resolvePeripheralDomainLabel(skill.name, t);
  if (domainLabel) {
    return domainLabel;
  }
  return t(`skills.categories.${skill.category}`).toLowerCase();
};

interface SkillEditorialCardShellProps {
  tier: SkillLayoutTier;
  gridSpan: number;
  itemVariants: Variants;
  children: React.ReactNode;
}

/**
 * Editorial skill card — pointer-tracked spotlight; CSS interactiveLift handles hover lift.
 */
const SkillEditorialCardShell: React.FC<SkillEditorialCardShellProps> = ({
  tier,
  gridSpan,
  itemVariants,
  children,
}): React.ReactElement => {
  const enableSpotlight: boolean = MARKETING_SPOTLIGHT_TIERS.has(tier);
  const isMinimalTier: boolean = tier === SkillLayoutTier.PeripheralMinimal;

  const {
    ref,
    motionProps,
  }: UsePhysicalInteractionResult<HTMLDivElement> = usePhysicalInteraction({
    disabled: isMinimalTier,
    enableSpotlight,
    enableTilt: false,
    enableLift: false,
  });

  return (
    <SkillsStaggerSlot variants={itemVariants}>
      <SkillEditorialCard
        ref={ref}
        layout
        $tier={tier}
        $gridSpan={gridSpan}
        style={motionProps.style}
        whileTap={isMinimalTier ? undefined : motionProps.whileTap}
      >
        {children}
      </SkillEditorialCard>
    </SkillsStaggerSlot>
  );
};

interface CertificateCardShellProps {
  itemVariants: Variants;
  platformColor: string;
  onClick: () => void;
  children: React.ReactNode;
}

/**
 * Certificate card — pointer spotlight + CSS lift via cardInteractive mixin.
 */
const CertificateCardShell: React.FC<CertificateCardShellProps> = ({
  itemVariants,
  platformColor,
  onClick,
  children,
}): React.ReactElement => {
  const {
    ref,
    motionProps,
  }: UsePhysicalInteractionResult<HTMLDivElement> = usePhysicalInteraction({
    enableSpotlight: true,
    enableTilt: false,
    enableLift: false,
  });

  return (
    <SkillsStaggerSlot variants={itemVariants}>
      <CertificateCard
        ref={ref}
        onClick={onClick}
        $platformColor={platformColor}
        style={motionProps.style}
        whileTap={motionProps.whileTap}
      >
        {children}
      </CertificateCard>
    </SkillsStaggerSlot>
  );
};

interface ExperienceCardShellProps {
  itemVariants: Variants;
  featured: boolean;
  children: React.ReactNode;
}

/**
 * Architecture experience card — amber pointer torch + CSS liftMd + tap scale.
 */
const ExperienceCardShell: React.FC<ExperienceCardShellProps> = ({
  itemVariants,
  featured,
  children,
}): React.ReactElement => {
  const {
    ref,
    motionProps,
  }: UsePhysicalInteractionResult<HTMLDivElement> = usePhysicalInteraction({
    enableSpotlight: true,
    enableTilt: false,
    enableLift: false,
  });

  return (
    <SkillsStaggerSlot variants={itemVariants}>
      <ExperienceCard
        ref={ref}
        $featured={featured}
        style={motionProps.style}
        whileTap={motionProps.whileTap}
      >
        {children}
      </ExperienceCard>
    </SkillsStaggerSlot>
  );
};

// =================================================================================================
// ============================================= COMPONENT =======================================
// =================================================================================================

export const Skills: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const isPt: boolean = i18n.language?.startsWith('pt') ?? false;
  const [state, setState] = useState<SkillsPageState>(initialState);
  const scrollMotion = useScrollMotion();

  const {
    data: skills = [],
    isLoading: skillsLoading,
    isError: skillsError,
    refetch: refetchSkills,
  } = useSkills();

  const {
    data: certificates = [],
    isLoading: certificatesLoading,
    isError: certificatesError,
    refetch: refetchCertificates,
  } = useCertificates();

  const filteredSkills: Skill[] = useMemo((): Skill[] => (
    state.activeCategory === 'all'
      ? skills
      : skills.filter((skill: Skill) => skill.category === state.activeCategory)
  ), [skills, state.activeCategory]);

  const editorialLayout: EditorialSkillsLayout = useMemo(
    (): EditorialSkillsLayout => buildEditorialSkillsLayout(filteredSkills),
    [filteredSkills],
  );

  const sortedCertificates: Certificate[] = useMemo(
    (): Certificate[] => sortCertificates(certificates),
    [certificates],
  );

  const showPeripheralChapter: boolean = useMemo((): boolean => (
    editorialLayout.peripheral.length > 0
    && (editorialLayout.hero !== null || editorialLayout.coreRow.length > 0)
  ), [editorialLayout]);

  const handleCategoryChange = useCallback((category: SkillCategory | 'all'): void => {
    setState((prev: SkillsPageState) => ({ ...prev, activeCategory: category }));
  }, []);

  const handleCertificateClick = useCallback((cert: Certificate): void => {
    setState((prev: SkillsPageState) => ({ ...prev, selectedCertificate: cert }));
  }, []);

  const handleCloseModal = useCallback((): void => {
    setState((prev: SkillsPageState) => ({ ...prev, selectedCertificate: null }));
  }, []);

  const handleViewCertificate = useCallback((): void => {
    if (state.selectedCertificate?.certificate_url) {
      window.open(state.selectedCertificate.certificate_url, '_blank', 'noopener,noreferrer');
    }
  }, [state.selectedCertificate]);

  const renderSkillCard = (placement: SkillLayoutPlacement): React.ReactElement => {
    const { skill, tier, gridSpan } = placement;
    const displayName: string = resolveSkillDisplayName(skill, isPt);
    const coreDomain: string | null = resolveCoreDomainLabel(skill.name, t);
    const showCategoryOnHover: boolean = tier !== SkillLayoutTier.PeripheralMinimal;

    const editorialBody: React.ReactElement = (
      <>
        <SkillEditorialIcon $tier={tier}>
          <img src={resolveSkillIconUrl(skill)} alt="" aria-hidden />
        </SkillEditorialIcon>
        <SkillEditorialInfo>
          <SkillEditorialName $tier={tier}>{displayName}</SkillEditorialName>
          {coreDomain ? (
            <SkillEditorialDomain>{coreDomain}</SkillEditorialDomain>
          ) : null}
          {showCategoryOnHover ? (
            <SkillCategoryLabel variants={skillCategoryLabelVariants}>
              {t(`skills.categories.${skill.category}`)}
            </SkillCategoryLabel>
          ) : null}
        </SkillEditorialInfo>
      </>
    );

    return (
      <SkillEditorialCardShell
        key={skill.id}
        tier={tier}
        gridSpan={gridSpan}
        itemVariants={scrollMotion.item}
      >
        {editorialBody}
      </SkillEditorialCardShell>
    );
  };

  const renderPeripheralSkillCard = (placement: SkillLayoutPlacement): React.ReactElement => {
    const { skill, tier } = placement;
    const displayName: string = resolveSkillDisplayName(skill, isPt);
    const description: string = resolvePeripheralDescription(skill, t);

    return (
      <SkillsStaggerSlot key={skill.id} variants={scrollMotion.item}>
        <SupportStackCard
          skill={skill}
          displayName={displayName}
          description={description}
          iconUrl={resolveSkillIconUrl(skill)}
          tier={tier}
        />
      </SkillsStaggerSlot>
    );
  };

  const renderSupportStackChapter = (
    peripheralPlacements: SkillLayoutPlacement[],
  ): React.ReactElement => {
    const featuredPlacements: SkillLayoutPlacement[] = peripheralPlacements.filter(
      (placement: SkillLayoutPlacement): boolean => (
        placement.tier === SkillLayoutTier.PeripheralFeatured
      ),
    );
    const compactPlacements: SkillLayoutPlacement[] = peripheralPlacements.filter(
      (placement: SkillLayoutPlacement): boolean => (
        placement.tier !== SkillLayoutTier.PeripheralFeatured
      ),
    );

    return (
      <SupportStackMatrix>
        {featuredPlacements.length > 0 ? (
          <SupportStackFeaturedRow>
            {featuredPlacements.map((placement: SkillLayoutPlacement) => (
              renderPeripheralSkillCard(placement)
            ))}
          </SupportStackFeaturedRow>
        ) : null}
        {compactPlacements.length > 0 ? (
          <SupportStackGrid>
            {compactPlacements.map((placement: SkillLayoutPlacement) => (
              renderPeripheralSkillCard(placement)
            ))}
          </SupportStackGrid>
        ) : null}
      </SupportStackMatrix>
    );
  };

  const renderHeroBlock = (heroSkill: Skill): React.ReactElement => {
    const displayName: string = resolveSkillDisplayName(heroSkill, isPt);

    return (
      <SkillsHeroBlock variants={scrollMotion.item}>
        <SkillsHeroSignal aria-hidden>{t('skills.layout.heroSignal')}</SkillsHeroSignal>
        <SkillsHeroName>
          <SkillsHeroIcon
            src={resolveSkillIconUrl(heroSkill)}
            alt=""
            aria-hidden
          />
          {displayName}
        </SkillsHeroName>
        <SkillsHeroMeta>
          <SkillsHeroDesc>{t('skills.layout.heroDescription')}</SkillsHeroDesc>
          <SkillsHeroDomain>{t('skills.layout.heroDomain')}</SkillsHeroDomain>
        </SkillsHeroMeta>
      </SkillsHeroBlock>
    );
  };

  const renderEditorialSkills = (): React.ReactElement => {
    const { hero, coreRow, peripheral } = editorialLayout;

    return (
      <SkillsEditorialLayout
        key={state.activeCategory}
        variants={scrollMotion.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={scrollMotion.viewport}
        exit={{ opacity: 0 }}
      >
        {(hero !== null || coreRow.length > 0) ? (
          <SkillsCoreChapter>
            <SectionEyebrow>{t('skills.layout.coreEyebrow')}</SectionEyebrow>
            <SkillsCoreLead>{t('skills.layout.coreLead')}</SkillsCoreLead>
            {hero !== null ? renderHeroBlock(hero) : null}
            {coreRow.length > 0 ? (
              <SkillsAsymmetricGrid>
                {coreRow.map((placement: SkillLayoutPlacement) => renderSkillCard(placement))}
              </SkillsAsymmetricGrid>
            ) : null}
          </SkillsCoreChapter>
        ) : null}

        {peripheral.length > 0 ? (
          <SkillsPeripheralChapter>
            {showPeripheralChapter ? (
              <SectionEyebrow>{t('skills.layout.peripheralEyebrow')}</SectionEyebrow>
            ) : null}
            {renderSupportStackChapter(peripheral)}
          </SkillsPeripheralChapter>
        ) : null}
      </SkillsEditorialLayout>
    );
  };

  const renderSkillsContent = (): React.ReactElement => {
    if (skillsLoading) {
      return (
        <SkillsGrid
          variants={scrollMotion.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={scrollMotion.viewport}
        >
          {Array.from({ length: SKELETON_CARD_COUNT }, (_item: unknown, index: number) => (
            <SkillCardSkeleton key={`skill-skeleton-${index}`} />
          ))}
        </SkillsGrid>
      );
    }

    if (skillsError) {
      return (
        <>
          <ErrorMessage>{t('skills.error')}</ErrorMessage>
          <RetryButton type="button" onClick={() => refetchSkills()}>
            {t('common.retry')}
          </RetryButton>
        </>
      );
    }

    return (
      <AnimatePresence mode="wait">
        {renderEditorialSkills()}
      </AnimatePresence>
    );
  };

  const renderCertificatesContent = (): React.ReactElement => {
    if (certificatesLoading) {
      return (
        <SkillsGrid
          variants={scrollMotion.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={scrollMotion.viewport}
        >
          {Array.from({ length: 4 }, (_item: unknown, index: number) => (
            <SkillCardSkeleton key={`cert-skeleton-${index}`} />
          ))}
        </SkillsGrid>
      );
    }

    if (certificatesError) {
      return (
        <>
          <ErrorMessage>{t('skills.certificatesError')}</ErrorMessage>
          <RetryButton type="button" onClick={() => refetchCertificates()}>
            {t('common.retry')}
          </RetryButton>
        </>
      );
    }

    return (
      <CertificatesGrid
        variants={scrollMotion.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={scrollMotion.viewport}
      >
        {sortedCertificates.map((cert: Certificate) => {
          const platform = getPlatformConfig(cert.platform);
          const displayName: string = resolveCertificateDisplayName(cert, isPt);
          return (
            <CertificateCardShell
              key={cert.id}
              itemVariants={scrollMotion.item}
              platformColor={platform.color}
              onClick={() => handleCertificateClick(cert)}
            >
              <CertificateHeader>
                <PlatformLogo $bgColor={platform.bgColor}>
                  <img src={platform.logo} alt={cert.platform} />
                </PlatformLogo>
                <div>
                  <CertificateName>{displayName}</CertificateName>
                  <CertificatePlatform $color={platform.color}>
                    {cert.platform}
                  </CertificatePlatform>
                </div>
              </CertificateHeader>
              <CertificateFooter>
                <CertificateYear>{cert.year}</CertificateYear>
              </CertificateFooter>
              <CertificateLink>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </CertificateLink>
            </CertificateCardShell>
          );
        })}
      </CertificatesGrid>
    );
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={scrollMotion.title}
          initial="hidden"
          whileInView="visible"
          viewport={scrollMotion.viewport}
        >
          <PageTitleGradient>{t('skills.title')}</PageTitleGradient>
        </PageTitle>
        <PageSubtitle
          variants={scrollMotion.section}
          initial="hidden"
          whileInView="visible"
          viewport={scrollMotion.viewport}
        >
          {t('skills.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <Section
        variants={scrollMotion.section}
        initial="hidden"
        whileInView="visible"
        viewport={scrollMotion.viewport}
      >
        <CategoryTabs>
          {categories.map((cat: CategoryOption) => (
            <CategoryTab
              key={cat.key}
              $active={state.activeCategory === cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              whileTap={{ scale: 0.98 }}
            >
              {cat.key === 'all' ? t('skills.filterAll') : t(`skills.categories.${cat.key}`)}
            </CategoryTab>
          ))}
        </CategoryTabs>

        {renderSkillsContent()}
      </Section>

      <ExperienceSection
        variants={scrollMotion.section}
        initial="hidden"
        whileInView="visible"
        viewport={scrollMotion.viewport}
      >
        <SectionTitle>
          <SectionTitleGradient>{t('skills.experience.title')}</SectionTitleGradient>
        </SectionTitle>
        <ExperienceIntro>{t('skills.experience.intro')}</ExperienceIntro>
        <ExperienceSubtitle>{t('skills.experience.subtitle')}</ExperienceSubtitle>
        <ExperienceGrid
          variants={scrollMotion.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={scrollMotion.viewport}
        >
          {EXPERIENCE_ITEM_KEYS.map((key: string) => (
            <ExperienceCardShell
              key={key}
              itemVariants={scrollMotion.item}
              featured={key === FEATURED_EXPERIENCE_KEY}
            >
              <ExperienceCardTitle>
                {t(`skills.experience.items.${key}.title`)}
              </ExperienceCardTitle>
              <ExperienceCardDescription>
                {t(`skills.experience.items.${key}.description`)}
              </ExperienceCardDescription>
              <ExperienceCardHighlight>
                {t(`skills.experience.items.${key}.highlight`)}
              </ExperienceCardHighlight>
            </ExperienceCardShell>
          ))}
        </ExperienceGrid>
      </ExperienceSection>

      <CertificatesSection
        variants={scrollMotion.section}
        initial="hidden"
        whileInView="visible"
        viewport={scrollMotion.viewport}
      >
        <SectionTitle>
          <SectionTitleGradient>{t('skills.certificates.title')}</SectionTitleGradient>
          {!certificatesLoading && !certificatesError && sortedCertificates.length > 0 && (
            <CertificateHours>
              {t('skills.certificates.count', { count: sortedCertificates.length })}
            </CertificateHours>
          )}
        </SectionTitle>
        {renderCertificatesContent()}
      </CertificatesSection>

      <AnimatePresence>
        {state.selectedCertificate && (
          <CertificateModal>
            <ModalOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            <ModalContent
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <ModalHeader>
                <ModalPlatformBadge
                  $bgColor={getPlatformConfig(state.selectedCertificate.platform).bgColor}
                  $color={getPlatformConfig(state.selectedCertificate.platform).color}
                >
                  <img
                    src={getPlatformConfig(state.selectedCertificate.platform).logo}
                    alt={state.selectedCertificate.platform}
                  />
                  {state.selectedCertificate.platform}
                </ModalPlatformBadge>
                <ModalCloseButton onClick={handleCloseModal}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <ModalCertificateInfo>
                  <ModalTitle>
                    {resolveCertificateDisplayName(state.selectedCertificate, isPt)}
                  </ModalTitle>
                  <ModalMeta>
                    {state.selectedCertificate.year != null && (
                      <ModalMetaItem>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {state.selectedCertificate.year}
                      </ModalMetaItem>
                    )}
                  </ModalMeta>
                </ModalCertificateInfo>
                <ModalActions>
                  {state.selectedCertificate.certificate_url && (
                    <ModalButton
                      $variant="primary"
                      onClick={handleViewCertificate}
                      $platformColor={getPlatformConfig(state.selectedCertificate.platform).color}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      {t('skills.certificates.viewCertificate')}
                    </ModalButton>
                  )}
                  <ModalButton $variant="secondary" onClick={handleCloseModal}>
                    {t('skills.certificates.close')}
                  </ModalButton>
                </ModalActions>
              </ModalBody>
            </ModalContent>
          </CertificateModal>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};
