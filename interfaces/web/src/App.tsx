// Core
import './i18n/config';
import React from 'react';

// Libraries
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// =================================================================================================
// ============================================= THEME =============================================
// =================================================================================================
import { GlobalStyles } from '@/styles/GlobalStyles';
import { darkTheme, lightTheme, Theme } from '@/styles/theme';

// Components
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ToastHost } from '@/components/Common/Toast';
import { ObservatoryIdleLayer } from '@/components/Motion/ObservatoryIdleLayer';
import { Router } from '@/Router';
import { useThemeStore } from '@/store';

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
      <ObservatoryIdleLayer />
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

export default App;
