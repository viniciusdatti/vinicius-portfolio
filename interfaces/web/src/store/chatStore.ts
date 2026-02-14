/**
 * Chat store for managing visitor chat state.
 * Handles session, messages, and connection status.
 */

// Libraries
import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';

// Types
import type { ChatMessage } from '../types';

/**
 * Chat state interface with actions.
 */
interface ChatState {
  sessionId: string | null;
  messages: ChatMessage[];
  isConnected: boolean;
  isAdminOnline: boolean;
  isTyping: boolean;
  soundEnabled: boolean;

  setSessionId: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setConnected: (connected: boolean) => void;
  setAdminOnline: (online: boolean) => void;
  setTyping: (typing: boolean) => void;
  toggleSound: () => void;
  reset: () => void;
}

export const useChatStore: UseBoundStore<StoreApi<ChatState>> =
  create<ChatState>((set) => ({
    sessionId: null,
    messages: [],
    isConnected: false,
    isAdminOnline: false,
    isTyping: false,
    soundEnabled: false,

    setSessionId: (sessionId: string): void => set({ sessionId }),

    addMessage: (message: ChatMessage): void =>
      set((state: ChatState) => ({
        messages: [...state.messages, message],
      })),

    setMessages: (messages: ChatMessage[]): void => set({ messages }),

    setConnected: (isConnected: boolean): void => set({ isConnected }),

    setAdminOnline: (isAdminOnline: boolean): void => set({ isAdminOnline }),

    setTyping: (isTyping: boolean): void => set({ isTyping }),

    toggleSound: (): void =>
      set((state: ChatState) => ({ soundEnabled: !state.soundEnabled })),

    reset: (): void =>
      set({
        sessionId: null,
        messages: [],
        isConnected: false,
        isTyping: false,
      }),
  }));
