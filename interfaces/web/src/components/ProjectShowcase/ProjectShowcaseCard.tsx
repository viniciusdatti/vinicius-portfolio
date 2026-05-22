// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Technology } from '../../data/types';
import { Language } from '../../types';
import {
  MockWindowScene,
  ProjectCanvasTone,
  ProjectShowcaseVariant,
} from './ProjectShowcase.types';
import type { ProjectShowcaseCardProps } from './ProjectShowcase.types';

// Components
import { getTechIconUrl } from '../../utils/techIcon';
import {
  getProjectCaseCtaKey,
  resolveTechnologyCapabilityLabel,
} from '../../utils/projectCaseCopy';
import { showcaseStaggerItem } from '../../styles/animations';
import {
  ShowcaseCard,
  PreviewPanel,
  PreviewIndexWatermark,
  MockWindow,
  MockWindowBar,
  MockDot,
  MockBody,
  MockLine,
  MockLineAccent,
  MockRowGroup,
  MockCodeGroup,
  TechFloatingRow,
  TechChip,
  TechChipFallback,
  CardBody,
  CardMetaRow,
  IndexLabel,
  LivePill,
  CardTitle,
  CardDescription,
  CardFooter,
  ViewCaseLabel,
  ArrowIcon,
  TechStackLine,
  TechStackSep,
} from './ProjectShowcase.style';

/* ***********************************************************************************************
 ****************************************** METHODS ***********************************************
 *********************************************************************************************** */

const getProjectTitle = (
  project: ProjectShowcaseCardProps['project'],
  language: Language,
): string => {
  if (language === Language.Pt && project.title_pt) {
    return project.title_pt;
  }
  return project.title;
};

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

/**
 * Resolves which MockWindow visual scene to render based on variant and canvas tone.
 * Featured cards always use the Shell scene (richest visual).
 */
const resolveMockScene = (
  variant: ProjectShowcaseVariant,
  canvasTone: ProjectCanvasTone,
): MockWindowScene => {
  if (variant === ProjectShowcaseVariant.Featured) {
    return MockWindowScene.Shell;
  }
  if (canvasTone === ProjectCanvasTone.B) {
    return MockWindowScene.Table;
  }
  if (canvasTone === ProjectCanvasTone.C) {
    return MockWindowScene.Code;
  }
  return MockWindowScene.Shell;
};

/**
 * Renders the appropriate MockWindow body content for the given scene.
 */
const renderMockScene = (scene: MockWindowScene): React.ReactElement => {
  if (scene === MockWindowScene.Table) {
    return (
      <MockBody>
        <MockLineAccent />
        <MockRowGroup>
          <MockLine $width="80%" $delay="0.3s" />
          <MockLine $width="70%" $delay="0.5s" />
          <MockLine $width="60%" $delay="0.7s" />
        </MockRowGroup>
        <MockRowGroup>
          <MockLine $width="75%" $delay="0.8s" />
          <MockLine $width="85%" $delay="1s" />
          <MockLine $width="55%" $delay="1.2s" />
        </MockRowGroup>
      </MockBody>
    );
  }
  if (scene === MockWindowScene.Code) {
    return (
      <MockBody>
        <MockLine $width="42%" $delay="0s" />
        <MockCodeGroup>
          <MockLineAccent />
          <MockLine $width="72%" $delay="0.4s" />
          <MockLine $width="58%" $delay="0.8s" />
        </MockCodeGroup>
        <MockLine $width="34%" $delay="1.2s" />
      </MockBody>
    );
  }
  return (
    <MockBody>
      <MockLineAccent />
      <MockLine $delay="0.3s" $width="82%" />
      <MockLine $delay="0.9s" $width="65%" />
      <MockLine $delay="1.5s" $width="48%" />
    </MockBody>
  );
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export function ProjectShowcaseCard({
  project,
  language,
  variant,
  canvasTone,
  indexLabel,
  isSelected,
  onSelect,
}: ProjectShowcaseCardProps): React.ReactElement {
  const { t } = useTranslation();
  const title: string = getProjectTitle(project, language);
  const description: string = getProjectDescription(project, language);
  const displayTechs: Technology[] = project.technologies.slice(0, 4);
  const caseCtaLabel: string = t(getProjectCaseCtaKey(project), {
    defaultValue: t('projects.showcase.viewCase'),
  });
  const isFeatured: boolean = variant === ProjectShowcaseVariant.Featured;
  const scene: MockWindowScene = resolveMockScene(variant, canvasTone);

  const handleClick = (): void => {
    onSelect(project);
  };

  return (
    <ShowcaseCard
      data-variant={variant}
      $variant={variant}
      $canvasTone={canvasTone}
      $selected={isSelected}
      variants={showcaseStaggerItem}
      tabIndex={0}
      role="button"
      aria-label={title}
      onClick={handleClick}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>): void => (
        handleCardKeyDown(event, onSelect, project)
      )}
      whileHover={{ scale: isFeatured ? 1.005 : 1.015, y: isFeatured ? -2 : -4 }}
      whileTap={{ scale: 0.99, y: 0 }}
    >
      <PreviewPanel $variant={variant} $canvasTone={canvasTone}>
        <PreviewIndexWatermark aria-hidden>{indexLabel}</PreviewIndexWatermark>
        <MockWindow>
          <MockWindowBar>
            <MockDot />
            <MockDot />
            <MockDot />
          </MockWindowBar>
          {renderMockScene(scene)}
        </MockWindow>
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
            <LivePill>{t('projects.showcase.liveDemo')}</LivePill>
          ) : null}
        </CardMetaRow>
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
          <ArrowIcon aria-hidden>→</ArrowIcon>
        </CardFooter>
      </CardBody>
    </ShowcaseCard>
  );
}
