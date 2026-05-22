// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { Technology } from '../../data/types';
import { Language } from '../../types';
import {
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
} from './ProjectShowcase.style';

/* ***********************************************************************************************
 ****************************************** METHODS ***********************************************
 *********************************************************************************************** */

const getProjectTitle = (
  project: ProjectShowcaseCardProps['project'],
  language: Language
): string => {
  if (language === Language.Pt && project.title_pt) {
    return project.title_pt;
  }
  return project.title;
};

const getProjectDescription = (
  project: ProjectShowcaseCardProps['project'],
  language: Language
): string => {
  if (language === Language.Pt && project.description_pt) {
    return project.description_pt ?? '';
  }
  return project.description ?? '';
};

const handleCardKeyDown = (
  event: React.KeyboardEvent<HTMLElement>,
  onSelect: (project: ProjectShowcaseCardProps['project']) => void,
  project: ProjectShowcaseCardProps['project']
): void => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onSelect(project);
  }
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const ProjectShowcaseCard: React.FC<ProjectShowcaseCardProps> = ({
  project,
  language,
  variant,
  canvasTone,
  indexLabel,
  isSelected,
  onSelect,
}): React.ReactElement => {
  const { t } = useTranslation();
  const title: string = getProjectTitle(project, language);
  const description: string = getProjectDescription(project, language);
  const displayTechs: Technology[] = project.technologies.slice(0, 4);
  const caseCtaLabel: string = t(getProjectCaseCtaKey(project), {
    defaultValue: t('projects.showcase.viewCase'),
  });

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
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>): void =>
        handleCardKeyDown(event, onSelect, project)
      }
      whileHover={{ scale: variant === ProjectShowcaseVariant.Featured ? 1.01 : 1.02 }}
      whileTap={{ scale: 0.99 }}
    >
      <PreviewPanel $variant={variant} $canvasTone={canvasTone}>
        <PreviewIndexWatermark aria-hidden>{indexLabel}</PreviewIndexWatermark>
        <MockWindow>
          <MockWindowBar>
            <MockDot />
            <MockDot />
            <MockDot />
          </MockWindowBar>
          <MockBody>
            <MockLineAccent />
            <MockLine />
            <MockLine $width="56%" />
          </MockBody>
        </MockWindow>
        <TechFloatingRow>
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
        <CardFooter>
          <ViewCaseLabel>{caseCtaLabel}</ViewCaseLabel>
          <ArrowIcon aria-hidden>→</ArrowIcon>
        </CardFooter>
      </CardBody>
    </ShowcaseCard>
  );
};
