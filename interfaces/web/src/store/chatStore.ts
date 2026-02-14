// Libraries
import { create } from 'zustand';

// Types
import type { ChatMessage } from '../types';

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

export const useChatStore = create<ChatState>((set) => ({
  sessionId: null,
  messages: [],
  isConnected: false,
  isAdminOnline: false,
  isTyping: false,
  soundEnabled: false, // Opt-in for sound

  setSessionId: (sessionId) => set({ sessionId }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setMessages: (messages) => set({ messages }),

  setConnected: (isConnected) => set({ isConnected }),

  setAdminOnline: (isAdminOnline) => set({ isAdminOnline }),

  setTyping: (isTyping) => set({ isTyping }),

  toggleSound: () =>
    set((state) => ({ soundEnabled: !state.soundEnabled })),

  reset: () =>
    set({
      sessionId: null,
      messages: [],
      isConnected: false,
      isTyping: false,
    }),
}));
