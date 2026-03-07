// Core
import React from 'react';
import './i18n/config';

// Libraries
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Theme
import { GlobalStyles } from './styles/GlobalStyles';
import {
  darkTheme,
  lightTheme,
  Theme,
} from './styles/theme';

// Components
import { ErrorBoundary } from './components/ErrorBoundary';
import { Router } from './Router';
import { useThemeStore } from './store';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const ThemedApp: React.FC = (): React.ReactElement => {
  const { mode } = useThemeStore();
  const theme: Theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
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

export default App;
