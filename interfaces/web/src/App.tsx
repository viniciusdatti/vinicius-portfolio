// Core
import React from 'react';

// Libraries
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import { useThemeStore } from './store';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastHost } from './components/common/Toast';
import { Router } from './Router';

// Styles
import { GlobalStyles } from './styles/GlobalStyles';
import {
  darkTheme,
  lightTheme,
  Theme,
} from './styles/theme';

// I18n
import './i18n/config';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const ThemedApp = (): React.ReactElement => {
  const { mode } = useThemeStore();
  const theme: Theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastHost />
      <Router />
    </ThemeProvider>
  );
};

const App = (): React.ReactElement => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemedApp />
    </QueryClientProvider>
  </ErrorBoundary>
);

export { App };
