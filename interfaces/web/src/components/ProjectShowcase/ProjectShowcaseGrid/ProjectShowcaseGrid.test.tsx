// Core
import React from 'react';

// Libraries
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

// Styles
import { darkTheme } from '../../../styles/theme';

// Types
import { Language } from '../../../types';
import { ProjectShowcaseGridProps } from '../ProjectShowcase.types';

// I18n
import i18n from '../../../i18n/config';

// Plugins
import { MOCKED_PROJECT_LIST } from '../../../plugins/testUtils';

// ProjectShowcaseGrid
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

describe('ProjectShowcaseGrid Component', (): void => {
  // RENDER *******************************

  it('should render project cards from [projects] prop', (): void => {
    render(<ProjectShowcaseGridComponent {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'vinicius-portfolio' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ReactGram' })).toBeInTheDocument();
  });
});
