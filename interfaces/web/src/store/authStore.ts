/**
 * Authentication store for managing user session.
 * Persists auth state to local storage.
 */

// Libraries
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
import type { User, AuthTokens } from '../types';

/**
 * Authentication state interface with actions.
 */
interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User, tokens: AuthTokens) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateTokens: (tokens: AuthTokens) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (user: User, tokens: AuthTokens): void =>
        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: (): void =>
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        }),

      setLoading: (isLoading: boolean): void => set({ isLoading }),

      updateTokens: (tokens: AuthTokens): void => set({ tokens }),
    }),
    {
      name: 'auth-storage',
      partialize: (state: AuthState): Partial<AuthState> => ({
        tokens: state.tokens,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
