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

      setAuth: (user: User, tokens: AuthTokens) => {
        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
        });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      updateTokens: (tokens: AuthTokens) => {
        set({ tokens });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        tokens: state.tokens,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
