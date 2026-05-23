// Core
import React, { useState, useMemo, useCallback } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

// Types
import type { Project } from '@/data/types';
import type { Skill } from '@/types';
import { Language, SkillCategory, WorkspaceModule } from '@/types';

// Components
import { useProjects, useSkills } from '@/hooks';
import { useWorkspaceStore, useSystemEventStore } from '@/store';
import { modulePanelSwitch } from '@/styles/animations';
import {
  SystemEventLevel,
  SystemEventType,
} from '@/types/system-events';
import {
  PanelScroll,
  PanelTitle,
  PanelLead,
  StatGrid,
  StatCell,
  StatValue,
  StatLabel,
  CaseList,
  CaseRow,
  CaseRowTitle,
  CaseRowMeta,
  InspectPanel,
  BackButton,
  ActionRow,
  ActionLink,
  CapabilityGroup,
  CapabilityHeading,
  CapabilityItem,
} from '@/components/workspace/ContextPanel/ContextPanel.style';

interface ContextPanelProps {
  module: WorkspaceModule;
}

const IdentityModule = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <PanelTitle>{t('home.hero.name')}</PanelTitle>
      <PanelLead>{t('workspace.identity.focus')}</PanelLead>
      <p>{t('home.hero.description')}</p>
      <StatGrid>
        <StatCell>
          <StatValue>{t('workspace.identity.statProjectsValue')}</StatValue>
          <StatLabel>{t('workspace.identity.statProjects')}</StatLabel>
        </StatCell>
        <StatCell>
          <StatValue>{t('workspace.identity.statRealtimeValue')}</StatValue>
          <StatLabel>{t('workspace.identity.statRealtime')}</StatLabel>
        </StatCell>
        <StatCell>
          <StatValue>{t('workspace.identity.statFocusValue')}</StatValue>
          <StatLabel>{t('workspace.identity.statFocus')}</StatLabel>
        </StatCell>
      </StatGrid>
    </>
  );
};

const CasesModule = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const {
    data: projects = [], isLoading, isError, refetch,
  } = useProjects();
  const setActiveCase = useWorkspaceStore((s) => s.setActiveCase);
  const setPendingChannelDraft = useWorkspaceStore((s) => s.setPendingChannelDraft);
  const pushEvent = useSystemEventStore((s) => s.push);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const isPt: boolean = i18n.language?.startsWith('pt') ?? false;
  const language: Language = isPt ? Language.Pt : Language.En;

  const selected: Project | null = useMemo(() => {
    if (selectedId == null) {
      return null;
    }
    return projects.find((p: Project) => p.id === selectedId) ?? null;
  }, [projects, selectedId]);

  const titleFor = useCallback(
    (p: Project): string => (language === Language.Pt && p.title_pt ? p.title_pt : p.title),
    [language],
  );

  const descriptionFor = useCallback(
    (p: Project): string | null => {
      if (language === Language.Pt && p.description_pt) {
        return p.description_pt;
      }
      return p.description ?? null;
    },
    [language],
  );

  if (isLoading) {
    return <PanelLead>{t('workspace.cases.loading')}</PanelLead>;
  }

  if (isError) {
    return (
      <>
        <PanelLead>{t('workspace.cases.error')}</PanelLead>
        <BackButton type="button" onClick={() => refetch()}>
          {t('common.retry')}
        </BackButton>
      </>
    );
  }

  if (selected) {
    const description: string | null = descriptionFor(selected);
    return (
      <InspectPanel>
        <BackButton
          type="button"
          onClick={(): void => {
            setSelectedId(null);
            setActiveCase(null, null);
            pushEvent(
              SystemEventType.ContextDetach,
              SystemEventLevel.Info,
              'workspace.events.contextDetach',
            );
          }}
        >
          {t('workspace.cases.back')}
        </BackButton>
        <PanelTitle>{titleFor(selected)}</PanelTitle>
        {description ? <PanelLead>{description}</PanelLead> : null}
        <ActionRow>
          {selected.demo_url ? (
            <ActionLink
              href={selected.demo_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('workspace.cases.demo')}
            </ActionLink>
          ) : null}
          <ActionLink
            href={selected.repository_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('workspace.cases.repository')}
          </ActionLink>
        </ActionRow>
      </InspectPanel>
    );
  }

  if (projects.length === 0) {
    return <PanelLead>{t('workspace.cases.empty')}</PanelLead>;
  }

  return (
    <>
      <PanelTitle>{t('workspace.cases.title')}</PanelTitle>
      <PanelLead>{t('workspace.cases.lead')}</PanelLead>
      <CaseList>
        {projects.map((project: Project, index: number) => {
          const padded: string = String(index + 1).padStart(2, '0');
          return (
            <CaseRow
              key={project.id}
              type="button"
              onClick={(): void => {
                const title: string = titleFor(project);
                setSelectedId(project.id);
                setActiveCase(project.id, title);
                setPendingChannelDraft(
                  t('workspace.events.contextDraft', { title }),
                );
                pushEvent(
                  SystemEventType.ContextAttach,
                  SystemEventLevel.Info,
                  'workspace.events.contextAttach',
                  { title },
                );
              }}
            >
              <CaseRowMeta>{padded}</CaseRowMeta>
              <CaseRowTitle>{titleFor(project)}</CaseRowTitle>
            </CaseRow>
          );
        })}
      </CaseList>
    </>
  );
};

const CATEGORY_ORDER: SkillCategory[] = [
  SkillCategory.Realtime,
  SkillCategory.Frontend,
  SkillCategory.Backend,
  SkillCategory.Testing,
  SkillCategory.Tools,
  SkillCategory.Iot,
];

const CapabilitiesModule = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const { data: skills = [], isLoading } = useSkills();

  const labelForCategory = (category: SkillCategory): string => t(`skills.categories.${category}`);

  const nameFor = (skill: Skill): string => {
    const isPt: boolean = i18n.language?.startsWith('pt') ?? false;
    if (isPt && skill.name_pt) {
      return skill.name_pt;
    }
    return skill.name;
  };

  const grouped = useMemo(() => {
    const map = new Map<SkillCategory, Skill[]>();
    skills.forEach((skill: Skill) => {
      const list: Skill[] = map.get(skill.category) ?? [];
      list.push(skill);
      map.set(skill.category, list);
    });
    return map;
  }, [skills]);

  if (isLoading) {
    return <PanelLead>{t('common.loading')}</PanelLead>;
  }

  if (skills.length === 0) {
    return <PanelLead>{t('workspace.capabilities.empty')}</PanelLead>;
  }

  return (
    <>
      <PanelTitle>{t('workspace.capabilities.title')}</PanelTitle>
      <PanelLead>{t('workspace.capabilities.lead')}</PanelLead>
      {CATEGORY_ORDER.map((category: SkillCategory) => {
        const items: Skill[] | undefined = grouped.get(category);
        if (!items?.length) {
          return null;
        }
        return (
          <CapabilityGroup key={category}>
            <CapabilityHeading>{labelForCategory(category)}</CapabilityHeading>
            {items.map((skill: Skill) => (
              <CapabilityItem key={skill.id}>{nameFor(skill)}</CapabilityItem>
            ))}
          </CapabilityGroup>
        );
      })}
    </>
  );
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const ContextPanel = ({
  module,
}: ContextPanelProps): React.ReactElement => {
  const renderModule = (): React.ReactElement => {
    switch (module) {
      case WorkspaceModule.Cases:
        return <CasesModule />;
      case WorkspaceModule.Capabilities:
        return <CapabilitiesModule />;
      case WorkspaceModule.Identity:
      default:
        return <IdentityModule />;
    }
  };

  return (
    <PanelScroll>
      <AnimatePresence mode="wait">
        <motion.div
          key={module}
          variants={modulePanelSwitch}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {renderModule()}
        </motion.div>
      </AnimatePresence>
    </PanelScroll>
  );
};
