// Libraries
import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';

// Types
import { WorkspaceModule } from '../types';

interface WorkspaceState {
  activeLiveLabModule: WorkspaceModule;
  activeCaseId: number | null;
  activeCaseTitle: string | null;
  pendingChannelDraft: string | null;
  setActiveLiveLabModule: (module: WorkspaceModule) => void;
  setActiveCase: (id: number | null, title: string | null) => void;
  setPendingChannelDraft: (draft: string | null) => void;
}

export const useWorkspaceStore: UseBoundStore<StoreApi<WorkspaceState>> =
  create<WorkspaceState>((set) => ({
    activeLiveLabModule: WorkspaceModule.Cases,
    activeCaseId: null,
    activeCaseTitle: null,
    pendingChannelDraft: null,

    setActiveLiveLabModule: (activeLiveLabModule: WorkspaceModule): void => {
      set({ activeLiveLabModule });
    },

    setActiveCase: (
      activeCaseId: number | null,
      activeCaseTitle: string | null
    ): void => {
      set({ activeCaseId, activeCaseTitle });
    },

    setPendingChannelDraft: (pendingChannelDraft: string | null): void => {
      set({ pendingChannelDraft });
    },
  }));
