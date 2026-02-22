// Core
import React from 'react';

// Libraries
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import { ErrorBoundary } from './components/ErrorBoundary';
import { Router } from './Router';

// Store
import { useThemeStore } from './store';

// Styles
import { GlobalStyles } from './styles/GlobalStyles'; 
import { 
  darkTheme, 
  lightTheme, 
  Theme 
} from './styles/theme';

// Config
import './i18n/config';

// Create a client
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Theme wrapper component
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

function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemedApp />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
