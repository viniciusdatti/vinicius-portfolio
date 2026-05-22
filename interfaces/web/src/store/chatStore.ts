/**
 * Visitor chat store — session and messages for Live Lab UI.
 */

// Libraries
import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';

// Types
import type { ChatMessage } from '../types';
import type { VisitorChatStoreData } from '../types/chat';
import { initialVisitorChatStoreData } from '../types/chat';

interface ChatState extends VisitorChatStoreData {
  setSessionId: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  setMessages: (messages: ChatMessage[]) => void;
  setConnected: (connected: boolean) => void;
  setAdminOnline: (online: boolean) => void;
  setTyping: (typing: boolean) => void;
  toggleSound: () => void;
  reset: () => void;
}

export const useChatStore: UseBoundStore<StoreApi<ChatState>> = create<ChatState>((set) => ({
  ...initialVisitorChatStoreData,

  setSessionId: (sessionId: string): void => set({ sessionId }),

  addMessage: (message: ChatMessage): void => set((state: ChatState) => ({
    messages: [...state.messages, message],
  })),

  setMessages: (messages: ChatMessage[]): void => set({ messages }),

  setConnected: (isConnected: boolean): void => set({ isConnected }),

  setAdminOnline: (isAdminOnline: boolean): void => set({ isAdminOnline }),

  setTyping: (isTyping: boolean): void => set({ isTyping }),

  toggleSound: (): void => set((state: ChatState) => ({ soundEnabled: !state.soundEnabled })),

  reset: (): void => set({
    sessionId: null,
    messages: [],
    isConnected: false,
    isTyping: false,
    isAdminOnline: initialVisitorChatStoreData.isAdminOnline,
    soundEnabled: initialVisitorChatStoreData.soundEnabled,
  }),
}));
