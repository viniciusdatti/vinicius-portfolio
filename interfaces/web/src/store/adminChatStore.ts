/**
 * Admin chat store — UI state for admin chat (updated by adminChatRealtime).
 */

// Libraries
import { create } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';

// Types
import type {
  AdminChatMessage,
  AdminChatSession,
  AdminChatStoreData,
} from '../types/admin-chat';
import { initialAdminChatStoreData } from '../types/admin-chat';
import type {
  ChatSocketNewMessagePayload,
  ChatSocketNewSessionPayload,
  ChatSocketSessionScopePayload,
  ChatSocketSessionUpdatedPayload,
} from '../types/chat-socket';
import { ChatMessageSenderType } from '../types';
import { parseSocketSenderType } from '../types/chat-mappers';

interface AdminChatState extends AdminChatStoreData {
  setConnected: (connected: boolean) => void;
  setSessions: (sessions: AdminChatSession[]) => void;
  setActiveSessionId: (sessionId: string | null) => void;
  setActiveMessages: (messages: AdminChatMessage[]) => void;
  appendActiveMessage: (message: AdminChatMessage) => void;
  handleNewSession: (payload: ChatSocketNewSessionPayload) => void;
  handleNewMessage: (payload: ChatSocketNewMessagePayload) => void;
  handleSessionUpdated: (payload: ChatSocketSessionUpdatedPayload) => void;
  handleVisitorTyping: (payload: ChatSocketSessionScopePayload) => void;
  clearVisitorTyping: (sessionId: string) => void;
  handleVisitorDisconnected: (payload: ChatSocketSessionScopePayload) => void;
  markSessionRead: (sessionId: string) => void;
  removeSession: (sessionId: string) => void;
  reset: () => void;
}

export const useAdminChatStore: UseBoundStore<StoreApi<AdminChatState>> = create<
AdminChatState
>((set, get) => ({
  ...initialAdminChatStoreData,

  setConnected: (isConnected: boolean): void => set({ isConnected }),

  setSessions: (sessions: AdminChatSession[]): void => set({ sessions }),

  setActiveSessionId: (activeSessionId: string | null): void => set({ activeSessionId }),

  setActiveMessages: (activeMessages: AdminChatMessage[]): void => set({ activeMessages }),

  appendActiveMessage: (message: AdminChatMessage): void => {
    const { activeSessionId, activeMessages } = get();
    if (message.session_id !== activeSessionId) {
      return;
    }
    const exists: boolean = activeMessages.some((m) => m.id === message.id);
    if (exists) {
      return;
    }
    set({ activeMessages: [...activeMessages, message] });
  },

  handleNewSession: (payload: ChatSocketNewSessionPayload): void => {
    set((state: AdminChatState) => {
      const exists: boolean = state.sessions.some(
        (s) => s.session_id === payload.session_id,
      );
      if (exists) {
        return state;
      }
      const row: AdminChatSession = {
        session_id: payload.session_id,
        visitor_name: payload.visitor_name,
        visitor_company: payload.visitor_company,
        started_at: payload.started_at,
        unread_count: payload.unread_count,
        is_typing: false,
      };
      return { sessions: [row, ...state.sessions] };
    });
  },

  handleNewMessage: (payload: ChatSocketNewMessagePayload): void => {
    const senderType = parseSocketSenderType(payload.sender_type);
    if (!senderType) {
      return;
    }

    const { activeSessionId } = get();
    const isActive: boolean = payload.session_id === activeSessionId;
    const isVisitor: boolean = senderType === ChatMessageSenderType.Visitor;

    if (isActive) {
      get().appendActiveMessage({
        id: payload.id,
        session_id: payload.session_id,
        content: payload.content,
        sender_type: senderType,
        is_read: true,
        created_at: payload.created_at,
      });
    }

    set((state: AdminChatState) => ({
      sessions: state.sessions.map((s) => (s.session_id === payload.session_id
        ? {
          ...s,
          unread_count: isActive && isVisitor ? 0 : payload.unread_count,
          last_message: isVisitor ? payload.content : s.last_message,
        }
        : s)),
    }));
  },

  handleSessionUpdated: (payload: ChatSocketSessionUpdatedPayload): void => {
    set((state: AdminChatState) => ({
      sessions: state.sessions.map((s) => (s.session_id === payload.session_id
        ? { ...s, unread_count: payload.unread_count }
        : s)),
    }));
  },

  handleVisitorTyping: (payload: ChatSocketSessionScopePayload): void => {
    set((state: AdminChatState) => ({
      sessions: state.sessions.map((s) => (
        s.session_id === payload.session_id ? { ...s, is_typing: true } : s
      )),
    }));
  },

  clearVisitorTyping: (sessionId: string): void => {
    set((state: AdminChatState) => ({
      sessions: state.sessions.map((s) => (
        s.session_id === sessionId ? { ...s, is_typing: false } : s
      )),
    }));
  },

  handleVisitorDisconnected: (payload: ChatSocketSessionScopePayload): void => {
    set((state: AdminChatState) => ({
      sessions: state.sessions.map((s) => (s.session_id === payload.session_id
        ? { ...s, visitor_name: `${s.visitor_name} (desconectado)` }
        : s)),
    }));
  },

  markSessionRead: (sessionId: string): void => {
    set((state: AdminChatState) => ({
      sessions: state.sessions.map((s) => (
        s.session_id === sessionId ? { ...s, unread_count: 0 } : s
      )),
    }));
  },

  removeSession: (sessionId: string): void => {
    const { activeSessionId } = get();
    set((state: AdminChatState) => ({
      sessions: state.sessions.filter((s) => s.session_id !== sessionId),
      activeSessionId:
          activeSessionId === sessionId ? null : activeSessionId,
      activeMessages:
          activeSessionId === sessionId ? [] : state.activeMessages,
    }));
  },

  reset: (): void => set({ ...initialAdminChatStoreData }),
}));
