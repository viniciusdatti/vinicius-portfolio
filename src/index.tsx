// Core
import './i18n/config';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Libraries
import { ThemeProvider } from 'styled-components';

// Theme
import { theme } from './styles/theme';

// Components
import { GlobalStyles } from './styles/GlobalStyles';
import { ErrorBoundary } from './components/ErrorBoundary';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
