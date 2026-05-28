// Core
import React, { type ReactElement } from 'react';

// Libraries
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

// Components
import { darkTheme } from '../../styles/theme';

const createTestQueryClient = (): QueryClient => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
      staleTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
});

interface WrapperProps {
  children: React.ReactNode;
  initialEntries?: string[];
}

const AllProviders = ({
  children,
  initialEntries = ['/'],
}: WrapperProps): ReactElement => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

export const renderWithProviders = (
  ui: ReactElement,
  options: CustomRenderOptions = {},
): ReturnType<typeof render> => {
  const { initialEntries, ...rest } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders initialEntries={initialEntries}>{children}</AllProviders>
    ),
    ...rest,
  });
};
