/**
 * Admin chat hook — thin UI adapter over adminChatStore + adminChatRealtime.
 * Socket lifecycle and listeners live in adminChatRealtime (started by AdminLayout).
 */

// Core
import { useCallback } from 'react';

// Types
import type { AdminChatMessage, AdminChatSession } from '../types/admin-chat';

// Components
import {
  closeAdminChatSession,
  joinAdminChatSession,
  sendAdminChatMessage,
  sendAdminChatTyping,
} from '../realtime/adminChatRealtime';
import { useAdminChatStore } from '../store/adminChatStore';

export type { AdminChatMessage, AdminChatSession };

/**
 * Hook for admin chat UI. Reads global store; actions delegate to realtime module.
 */
export const useAdminChat = (): {
  sessions: AdminChatSession[];
  activeSessionId: string | null;
  activeSession: AdminChatSession | undefined;
  activeMessages: AdminChatMessage[];
  isConnected: boolean;
  joinSession: (sessionId: string) => Promise<void>;
  sendMessage: (content: string) => void;
  sendTyping: () => void;
  closeSession: (sessionId: string) => void;
} => {
  const sessions: AdminChatSession[] = useAdminChatStore((s) => s.sessions);
  const activeSessionId: string | null = useAdminChatStore(
    (s) => s.activeSessionId
  );
  const activeMessages: AdminChatMessage[] = useAdminChatStore(
    (s) => s.activeMessages
  );
  const isConnected: boolean = useAdminChatStore((s) => s.isConnected);

  const joinSession = useCallback(async (sessionId: string): Promise<void> => {
    await joinAdminChatSession(sessionId);
  }, []);

  const sendMessage = useCallback(
    (content: string): void => {
      if (activeSessionId) {
        sendAdminChatMessage(activeSessionId, content);
      }
    },
    [activeSessionId]
  );

  const sendTyping = useCallback((): void => {
    if (activeSessionId) {
      sendAdminChatTyping(activeSessionId);
    }
  }, [activeSessionId]);

  const closeSession = useCallback((sessionId: string): void => {
    closeAdminChatSession(sessionId);
  }, []);

  const activeSession: AdminChatSession | undefined = sessions.find(
    (s) => s.session_id === activeSessionId
  );

  return {
    sessions,
    activeSessionId,
    activeSession,
    activeMessages,
    isConnected,
    joinSession,
    sendMessage,
    sendTyping,
    closeSession,
  };
};
