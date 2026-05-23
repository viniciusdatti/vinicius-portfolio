/**
 * @fileoverview Interactive project card for the editorial showcase grid.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Technology } from '@/data/types';
import type { ProjectShowcaseCardProps } from '@/components/ProjectShowcase/ProjectShowcase.types';

// Components
import { getProjectDisplayTitle } from '@/domain/projects';
import { Language } from '@/types';
import { ProjectShowcaseVariant } from '@/components/ProjectShowcase/ProjectShowcase.types';
import { usePointerPosition } from '@/hooks/usePointerPosition';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ProjectTerminalMock } from '@/components/ProjectShowcase/ProjectTerminalMock';
import { WorkCanvasPreview } from '@/components/Home/WorkCanvasPreview';
import { getTechIconUrl } from '@/utils/techIcon';
import {
  getProjectCaseCtaKey,
  getProjectRepoSlug,
  resolveTechnologyCapabilityLabel,
} from '@/utils/projectCaseCopy';
import { PHYSICAL_TAP_SCALE } from '@/lib/motionPhysics';
import { motionPresets } from '@/styles/motionPresets';
import {
  ShowcaseStaggerItem,
  ShowcaseCard,
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
} from '@/components/ProjectShowcase/ProjectShowcase.style';

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

const showcaseTapTransition = motionPresets.spring.physical;

const getProjectDescription = (
  project: ProjectShowcaseCardProps['project'],
  language: Language,
): string => {
  if (language === Language.Pt && project.description_pt) {
    return project.description_pt ?? '';
  }
  return project.description ?? '';
};

const handleCardKeyDown = (
  event: React.KeyboardEvent<HTMLElement>,
  onSelect: (project: ProjectShowcaseCardProps['project']) => void,
  project: ProjectShowcaseCardProps['project'],
): void => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onSelect(project);
  }
};

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

export const ProjectShowcaseCard: React.FC<ProjectShowcaseCardProps> = ({
  project,
  language,
  variant,
  canvasTone,
  indexLabel,
  isSelected,
  onSelect,
  itemVariants,
}): React.ReactElement => {
  const { t } = useTranslation();
  const reducedMotion: boolean = usePrefersReducedMotion();
  const { ref, position, isActive: isPointerActive } = usePointerPosition<HTMLElement>(
    reducedMotion,
  );

  const title: string = getProjectDisplayTitle(project, language);
  const description: string = getProjectDescription(project, language);
  const displayTechs: Technology[] = project.technologies.slice(0, 4);
  const caseCtaLabel: string = t(getProjectCaseCtaKey(project), {
    defaultValue: t('projects.showcase.viewCase'),
  });
  const isFeatured: boolean = variant === ProjectShowcaseVariant.Featured;
  const repoSlug: string = getProjectRepoSlug(project.repository_url);
  const spotActive: boolean = !reducedMotion && isPointerActive;

  const handleClick = (): void => {
    onSelect(project);
  };

  return (
    <ShowcaseStaggerItem variants={itemVariants}>
      <ShowcaseCard
        ref={ref}
        data-variant={variant}
        $variant={variant}
        $canvasTone={canvasTone}
        $selected={isSelected}
        $spotX={position.x}
        $spotY={position.y}
        $spotActive={spotActive}
        whileTap={{
          scale: PHYSICAL_TAP_SCALE,
          transition: showcaseTapTransition,
        }}
        tabIndex={0}
        role="button"
        aria-label={title}
        aria-pressed={isSelected}
        onClick={handleClick}
        onKeyDown={(event: React.KeyboardEvent<HTMLElement>): void => (
          handleCardKeyDown(event, onSelect, project)
        )}
      >
        <CardSpotlightTorch aria-hidden />
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
                    <img src={iconUrl} alt="" aria-hidden />
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
};
