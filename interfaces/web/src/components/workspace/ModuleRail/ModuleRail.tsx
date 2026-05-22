// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { WorkspaceModule } from '../../../types';

// Components
import { useWorkspaceStore } from '../../../store';
import { RailRoot, RailButton, RailIndex } from './ModuleRail.style';

interface RailItem {
  module: WorkspaceModule;
  labelKey: string;
  index: string;
}

const RAIL_ITEMS: RailItem[] = [
  {
    module: WorkspaceModule.Identity,
    labelKey: 'workspace.rail.identity',
    index: '01',
  },
  {
    module: WorkspaceModule.Cases,
    labelKey: 'workspace.rail.cases',
    index: '02',
  },
  {
    module: WorkspaceModule.Capabilities,
    labelKey: 'workspace.rail.capabilities',
    index: '03',
  },
];

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export function ModuleRail(): React.ReactElement {
  const { t } = useTranslation();
  const activeModule: WorkspaceModule = useWorkspaceStore(
    (s) => s.activeLiveLabModule,
  );
  const setActiveLiveLabModule = useWorkspaceStore(
    (s) => s.setActiveLiveLabModule,
  );

  return (
    <RailRoot aria-label={t('workspace.rail.label')}>
      {RAIL_ITEMS.map((item: RailItem) => (
        <RailButton
          key={item.module}
          type="button"
          $active={activeModule === item.module}
          onClick={(): void => setActiveLiveLabModule(item.module)}
        >
          <RailIndex>{item.index}</RailIndex>
          {t(item.labelKey)}
        </RailButton>
      ))}
    </RailRoot>
  );
}
