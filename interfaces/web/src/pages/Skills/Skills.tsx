/**
 * @fileoverview Skills page component.
 * Displays technical skills with editorial hierarchy and certificates section.
 */

// Core
import React, { useState, useCallback, useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

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
import { skillCategoryLabelVariants } from '@/styles/animations';
import { SkillCardSkeleton } from '@/components/SkillCardSkeleton';
import {
  SkillInstrumentFieldVariant,
  SkillInstrumentTelemetryField,
} from '@/components/skills/SkillInstrumentTelemetryField';
import { useScrollMotion } from '@/hooks/useScrollMotion';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  SectionEyebrow,
} from '@/styles/pageLayout.style';

// View
import {
  Section,
  SectionTitle,
  CategoryTabs,
  CategoryTab,
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
  SkillEditorialCard,
  SkillEditorialIcon,
  SkillEditorialName,
  SkillEditorialDomain,
  SkillEditorialInfo,
  SkillInstrumentBody,
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

const SKELETON_CARD_COUNT: number = 8;

const OPERATIONAL_SPOTLIGHT_TIERS: ReadonlySet<SkillLayoutTier> = new Set([
  SkillLayoutTier.PeripheralInstrument,
  SkillLayoutTier.PeripheralStandard,
  SkillLayoutTier.PeripheralCompact,
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

const resolveInstrumentFieldVariant = (
  skillName: string,
): SkillInstrumentFieldVariant => (
  skillName === 'AI tools'
    ? SkillInstrumentFieldVariant.AiTools
    : SkillInstrumentFieldVariant.Vscode
);

interface SkillEditorialCardShellProps {
  tier: SkillLayoutTier;
  gridSpan: number;
  itemVariants: Variants;
  children: React.ReactNode;
}

/**
 * Editorial skill card with spring spotlight on operational-glass and marketing tiers.
 */
const SkillEditorialCardShell: React.FC<SkillEditorialCardShellProps> = ({
  tier,
  gridSpan,
  itemVariants,
  children,
}): React.ReactElement => {
  const useOperationalSpotlight: boolean = OPERATIONAL_SPOTLIGHT_TIERS.has(tier);
  const useMarketingSpotlight: boolean = tier === SkillLayoutTier.CoreLarge;
  const enableSpotlight: boolean = useOperationalSpotlight || useMarketingSpotlight;
  const enablePhysicalMotion: boolean = tier !== SkillLayoutTier.PeripheralMinimal;

  const {
    ref,
    motionProps,
  }: UsePhysicalInteractionResult<HTMLDivElement> = usePhysicalInteraction({
    disabled: !enablePhysicalMotion && !enableSpotlight,
    enableSpotlight,
    enableTilt: enablePhysicalMotion,
    enableLift: enablePhysicalMotion,
  });

  return (
    <motion.div variants={itemVariants} style={{ display: 'contents' }}>
      <SkillEditorialCard
        ref={ref}
        whileHover="hover"
        layout
        $tier={tier}
        $gridSpan={gridSpan}
        style={motionProps.style}
        animate={motionProps.animate}
        transition={motionProps.transition}
        whileTap={motionProps.whileTap}
      >
        {children}
      </SkillEditorialCard>
    </motion.div>
  );
};

interface CertificateCardShellProps {
  itemVariants: Variants;
  platformColor: string;
  onClick: () => void;
  children: React.ReactNode;
}

/**
 * Certificate card with spring lift/tilt and scroll stagger reveal.
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
    enableSpotlight: false,
    enableTilt: true,
    enableLift: true,
  });

  return (
    <motion.div variants={itemVariants} style={{ display: 'contents' }}>
      <CertificateCard
        ref={ref}
        onClick={onClick}
        $platformColor={platformColor}
        style={motionProps.style}
        animate={motionProps.animate}
        transition={motionProps.transition}
        whileTap={motionProps.whileTap}
      >
        {children}
      </CertificateCard>
    </motion.div>
  );
};

// =================================================================================================
// ============================================= COMPONENT =======================================
// =================================================================================================

export const Skills: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const isPt: boolean = i18n.language?.startsWith('pt') ?? false;
  const [state, setState] = useState<SkillsPageState>(initialState);
  const motion = useScrollMotion();
  const viewport = { once: true, margin: '-60px' as const };

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
        itemVariants={motion.item}
      >
        {tier === SkillLayoutTier.PeripheralInstrument ? (
          <>
            <SkillInstrumentTelemetryField
              variant={resolveInstrumentFieldVariant(skill.name)}
            />
            <SkillInstrumentBody>{editorialBody}</SkillInstrumentBody>
          </>
        ) : (
          editorialBody
        )}
      </SkillEditorialCardShell>
    );
  };

  const renderHeroBlock = (heroSkill: Skill): React.ReactElement => {
    const displayName: string = resolveSkillDisplayName(heroSkill, isPt);

    return (
      <SkillsHeroBlock variants={motion.item}>
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
        variants={motion.stagger}
        initial="hidden"
        animate="visible"
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
            <SkillsAsymmetricGrid>
              {peripheral.map((placement: SkillLayoutPlacement) => renderSkillCard(placement))}
            </SkillsAsymmetricGrid>
          </SkillsPeripheralChapter>
        ) : null}
      </SkillsEditorialLayout>
    );
  };

  const renderSkillsContent = (): React.ReactElement => {
    if (skillsLoading) {
      return (
        <SkillsGrid
          variants={motion.stagger}
          initial="hidden"
          animate="visible"
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
          variants={motion.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
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
        variants={motion.stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {sortedCertificates.map((cert: Certificate) => {
          const platform = getPlatformConfig(cert.platform);
          const displayName: string = resolveCertificateDisplayName(cert, isPt);
          return (
            <CertificateCardShell
              key={cert.id}
              itemVariants={motion.item}
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
          variants={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {t('skills.title')}
        </PageTitle>
        <PageSubtitle
          variants={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {t('skills.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <Section>
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

      <ExperienceSection>
        <SectionTitle>{t('skills.experience.title')}</SectionTitle>
        <ExperienceIntro>{t('skills.experience.intro')}</ExperienceIntro>
        <ExperienceSubtitle>{t('skills.experience.subtitle')}</ExperienceSubtitle>
        <ExperienceGrid
          variants={motion.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {EXPERIENCE_ITEM_KEYS.map((key: string) => (
            <ExperienceCard
              key={key}
              variants={motion.item}
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
            </ExperienceCard>
          ))}
        </ExperienceGrid>
      </ExperienceSection>

      <CertificatesSection>
        <SectionTitle>
          {t('skills.certificates.title')}
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
