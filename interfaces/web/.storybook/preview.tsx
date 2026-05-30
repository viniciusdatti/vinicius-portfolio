// Core
import React from 'react';

// Libraries
import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';

// Styles
import { GlobalStyles } from '../src/styles/GlobalStyles';
import { darkTheme } from '../src/styles/theme';

// I18n
import i18n from '../src/i18n/config';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story): React.ReactElement => (
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={darkTheme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      </I18nextProvider>
    ),
  ],
};

export default preview;
