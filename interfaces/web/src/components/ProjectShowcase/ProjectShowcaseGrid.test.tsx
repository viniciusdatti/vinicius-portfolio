// Core
import React from 'react';

// Libraries
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

// Types
import { Language } from '../../types';

// Config
import i18n from '../../i18n/config';

// Components
import { darkTheme } from '../../styles/theme';
import { MOCKED_PROJECT_LIST } from '../../plugins/testUtils';

// Component
import type { ProjectShowcaseGridProps } from './ProjectShowcase.types';
import { ProjectShowcaseGrid } from './ProjectShowcaseGrid';

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

/* *************************************************************************************************
 ***************************************** TEST EXECUTION ******************************************
 ************************************************************************************************ */

describe('ProjectShowcaseGrid Component', (): void => {
  // RENDER *******************************

  it('should render project cards from [projects] prop', (): void => {
    render(<ProjectShowcaseGridComponent {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'vinicius-portfolio' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ReactGram' })).toBeInTheDocument();
  });
});
