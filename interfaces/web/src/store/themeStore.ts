// Libraries
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'dark' | 'light';

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'dark' as ThemeMode,
      toggleTheme: () => {
        set((state) => ({
          mode: state.mode === 'dark' ? 'light' : 'dark',
        }));
      },
      setTheme: (mode: ThemeMode) => {
        set({ mode });
      },
    }),
    {
      name: 'theme-storage',
    },
  ),
);
