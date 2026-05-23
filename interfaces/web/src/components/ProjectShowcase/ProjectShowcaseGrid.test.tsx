// Core
import React from 'react';
import { render, screen } from '@testing-library/react';

// Libraries
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

// Config
import i18n from '@/i18n/config';
import { darkTheme } from '@/styles/theme';

// Types
import { Language } from '@/types';
import type { ProjectShowcaseGridProps } from '@/components/ProjectShowcase/ProjectShowcase.types';

// =================================================================================================
// ============================================ PLUGINS ============================================
// =================================================================================================
import { MOCKED_PROJECT_LIST } from '@/plugins/testUtils';

// Components
import { ProjectShowcaseGrid } from '@/components/ProjectShowcase/ProjectShowcaseGrid';

// =================================================================================================
// ======================================= TEST SUPPORT VARS =======================================
// =================================================================================================

const defaultProps: ProjectShowcaseGridProps = {
  projects: MOCKED_PROJECT_LIST,
  language: Language.En,
};

const ProjectShowcaseGridComponent = (props: ProjectShowcaseGridProps): React.ReactElement => (
  <I18nextProvider i18n={i18n}>
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>
        <ProjectShowcaseGrid {...props} />
      </MemoryRouter>
    </ThemeProvider>
  </I18nextProvider>
);

// =================================================================================================
// ======================================== TEST EXECUTION =========================================
// =================================================================================================

describe('ProjectShowcaseGrid Component', (): void => {
  // RENDER *******************************

  it('should render project cards from [projects] prop', (): void => {
    render(<ProjectShowcaseGridComponent {...defaultProps} />);

    expect(screen.getByText('Vault ERP Synchronizer')).toBeInTheDocument();
    expect(screen.getByText('Live Lab Matrix')).toBeInTheDocument();
  });
});
