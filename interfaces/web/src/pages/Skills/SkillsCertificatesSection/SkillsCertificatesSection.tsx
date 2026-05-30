// Core
import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { UsePhysicalInteractionResult } from '../../../hooks/usePhysicalInteraction.types';
import { usePhysicalInteraction } from '../../../hooks/usePhysicalInteraction';

// Components
import { SkillCardSkeleton } from '../../../components/SkillCardSkeleton';

// Styles
import {
  ErrorMessage,
  RetryButton,
  SectionTitleGradient,
  SkillsFeedbackPanel,
  SkillsGrid,
  SkillsStaggerSlot,
} from '../Skills.style';
import {
  CertificateCard,
  CertificateFooter,
  CertificateHeader,
  CertificateHours,
  CertificateLink,
  CertificateName,
  CertificatePlatform,
  CertificatesEmptyMessage,
  CertificatesGrid,
  CertificatesSection,
  CertificateYear,
  PlatformLogo,
  SectionTitle,
} from './SkillsCertificatesSection.style';

// Types
import {
  getPlatformConfig,
  resolveCertificateDisplayName,
  sortCertificates,
} from '../../../domain/skills';
import { Certificate } from '../../../types';
import {
  CertificateCardShellProps,
  SkillsCertificatesSectionProps,
} from './SkillsCertificatesSection.types';

const CertificateCardShell: React.FC<CertificateCardShellProps> = ({
  itemVariants,
  platformColor,
  ariaLabel,
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <SkillsStaggerSlot variants={itemVariants}>
      <CertificateCard
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        $platformColor={platformColor}
        style={motionProps.style}
        whileTap={motionProps.whileTap}
      >
        {children}
      </CertificateCard>
    </SkillsStaggerSlot>
  );
};

export const SkillsCertificatesSection: React.FC<SkillsCertificatesSectionProps> = ({
  certificates,
  isLoading,
  isError,
  isPt,
  scrollMotion,
  onRetry,
  onCertificateSelect,
}): React.ReactElement => {
  const { t } = useTranslation();

  // Sorted once via domain helper — display order is API display_order + platform rules.
  const sortedCertificates: Certificate[] = useMemo(
    (): Certificate[] => sortCertificates(certificates),
    [certificates],
  );

  const renderCertificatesContent = (): React.ReactElement => {
    if (isLoading) {
      return (
        <SkillsGrid
          variants={scrollMotion.stagger}
          initial={false}
          animate="visible"
        >
          {Array.from({ length: 4 }, (_item: unknown, index: number) => (
            <SkillCardSkeleton key={`cert-skeleton-${index}`} />
          ))}
        </SkillsGrid>
      );
    }

    if (isError) {
      return (
        <SkillsFeedbackPanel>
          <ErrorMessage>{t('skills.certificatesError')}</ErrorMessage>
          <RetryButton type="button" onClick={onRetry}>
            {t('common.retry')}
          </RetryButton>
        </SkillsFeedbackPanel>
      );
    }

    if (sortedCertificates.length === 0) {
      return (
        <SkillsFeedbackPanel>
          <CertificatesEmptyMessage>
            {t('skills.certificates.empty')}
          </CertificatesEmptyMessage>
        </SkillsFeedbackPanel>
      );
    }

    return (
      <CertificatesGrid
        variants={scrollMotion.stagger}
        initial={false}
        animate="visible"
      >
        {sortedCertificates.map((cert: Certificate) => {
          const platform = getPlatformConfig(cert.platform);
          const displayName: string = resolveCertificateDisplayName(cert, isPt);
          return (
            <CertificateCardShell
              key={cert.id}
              itemVariants={scrollMotion.item}
              platformColor={platform.color}
              ariaLabel={displayName}
              onClick={() => onCertificateSelect(cert)}
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
              <CertificateLink aria-hidden>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line
                    x1="10"
                    y1="14"
                    x2="21"
                    y2="3"
                  />
                </svg>
              </CertificateLink>
            </CertificateCardShell>
          );
        })}
      </CertificatesGrid>
    );
  };

  return (
    <CertificatesSection
      variants={scrollMotion.depth}
      initial={false}
      animate="visible"
    >
      <SectionTitle>
        <SectionTitleGradient>{t('skills.certificates.title')}</SectionTitleGradient>
        {!isLoading && !isError && sortedCertificates.length > 0 && (
          <CertificateHours>
            {t('skills.certificates.count', { count: sortedCertificates.length })}
          </CertificateHours>
        )}
      </SectionTitle>
      {renderCertificatesContent()}
    </CertificatesSection>
  );
};
