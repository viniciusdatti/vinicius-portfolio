// Core
import React, { memo, useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { UsePhysicalInteractionResult } from '../../../hooks/usePhysicalInteraction.types';
import { usePhysicalInteraction } from '../../../hooks/usePhysicalInteraction';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// Styles
import {
  ShowcaseStaggerItem,
  ShowcaseCard,
  CardSpecularRim,
  CardSpotlightTorch,
  PreviewPanel,
  PreviewIndexWatermark,
  TechFloatingRow,
  TechChip,
  TechChipFallback,
  CardBody,
  CardMetaRow,
  IndexLabel,
  DemoPill,
  RepoSlug,
  CardTitle,
  CardDescription,
  CardFooter,
  ViewCaseLabel,
  FooterArrowWrap,
  ArrowIcon,
  TechStackLine,
  TechStackSep,
} from '../ProjectShowcase.style';

// Types
import { Technology } from '../../../data/types';
import { Language } from '../../../types';
import { getProjectDisplayTitle } from '../../../domain/projects';
import { ProjectShowcaseCardProps, ProjectShowcaseVariant } from '../ProjectShowcase.types';

// Home
import { WorkCanvasPreview } from '../../home/WorkCanvasPreview';

// ProjectShowcase
import { ProjectTerminalMock } from '../ProjectTerminalMock';

// Utils
import { getTechIconUrl } from '../../../utils/techIcon';
import {
  getProjectCaseCtaKey,
  getProjectRepoSlug,
  resolveTechnologyCapabilityLabel,
} from '../../../utils/projectCaseCopy';

const getProjectDescription = (
  project: ProjectShowcaseCardProps['project'],
  language: Language,
): string => {
  if (language === Language.Pt && project.description_pt) {
    return project.description_pt ?? '';
  }
  return project.description ?? '';
};

export const ProjectShowcaseCard = memo(({
  project,
  language,
  variant,
  canvasTone,
  indexLabel,
  isSelected,
  onSelect,
  itemVariants,
}: ProjectShowcaseCardProps): React.ReactElement => {
  const { t } = useTranslation();
  const reducedMotion: boolean = usePrefersReducedMotion();
  const {
    ref,
    isPointerActive,
    motionProps,
  }: UsePhysicalInteractionResult<HTMLElement> = usePhysicalInteraction<HTMLElement>({
    disabled: reducedMotion || variant !== ProjectShowcaseVariant.Featured,
    enableTilt: true,
    enableLift: true,
    enableSpotlight: true,
    maxTiltDeg: 7,
    liftPx: 6,
  });

  const title: string = getProjectDisplayTitle(project, language);
  const description: string = getProjectDescription(project, language);
  const displayTechs: Technology[] = project.technologies.slice(0, 4);
  const caseCtaLabel: string = t(getProjectCaseCtaKey(project), {
    defaultValue: t('projects.showcase.viewCase'),
  });
  const isFeatured: boolean = variant === ProjectShowcaseVariant.Featured;
  const repoSlug: string = getProjectRepoSlug(project.repository_url);
  const handleClick = useCallback((): void => {
    onSelect(project);
  }, [onSelect, project]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(project);
    }
  }, [onSelect, project]);

  return (
    <ShowcaseStaggerItem variants={itemVariants}>
      <ShowcaseCard
        ref={ref}
        data-variant={variant}
        $variant={variant}
        $canvasTone={canvasTone}
        $selected={isSelected}
        $spotActive={isPointerActive}
        style={motionProps.style}
        animate={motionProps.animate}
        transition={motionProps.transition}
        whileTap={motionProps.whileTap}
        tabIndex={0}
        role="button"
        aria-label={title}
        aria-pressed={isSelected}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <CardSpotlightTorch aria-hidden />
        <CardSpecularRim aria-hidden />
        <PreviewPanel $variant={variant} $canvasTone={canvasTone}>
          <WorkCanvasPreview tone={canvasTone} active={isSelected} />
          <PreviewIndexWatermark aria-hidden>{indexLabel}</PreviewIndexWatermark>
          <ProjectTerminalMock repositorySlug={repoSlug} />
          <TechFloatingRow $hideOnDesktop={isFeatured}>
            {displayTechs.map((tech: Technology) => {
              const iconUrl: string | null = getTechIconUrl(tech.slug);
              return (
                <TechChip key={tech.id}>
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt=""
                      aria-hidden
                    />
                  ) : (
                    <TechChipFallback aria-hidden>
                      {tech.name.charAt(0)}
                    </TechChipFallback>
                  )}
                  {resolveTechnologyCapabilityLabel(tech, t)}
                </TechChip>
              );
            })}
          </TechFloatingRow>
        </PreviewPanel>
        <CardBody>
          <CardMetaRow>
            <IndexLabel>{indexLabel}</IndexLabel>
            {project.demo_url ? (
              <DemoPill>{t('projects.showcase.hostedDemo')}</DemoPill>
            ) : null}
          </CardMetaRow>
          <RepoSlug title={project.repository_url}>{repoSlug}</RepoSlug>
          <CardTitle>{title}</CardTitle>
          {description ? <CardDescription>{description}</CardDescription> : null}
          {isFeatured ? (
            <TechStackLine>
              {project.technologies.slice(0, 5).map(
                (tech: Technology, i: number, arr: Technology[]) => (
                  <React.Fragment key={tech.id}>
                    <span>{tech.name}</span>
                    {i < arr.length - 1 ? (
                      <TechStackSep aria-hidden="true">·</TechStackSep>
                    ) : null}
                  </React.Fragment>
                ),
              )}
            </TechStackLine>
          ) : null}
          <CardFooter>
            <ViewCaseLabel>{caseCtaLabel}</ViewCaseLabel>
            <FooterArrowWrap aria-hidden>
              <ArrowIcon>→</ArrowIcon>
            </FooterArrowWrap>
          </CardFooter>
        </CardBody>
      </ShowcaseCard>
    </ShowcaseStaggerItem>
  );
});

ProjectShowcaseCard.displayName = 'ProjectShowcaseCard';
