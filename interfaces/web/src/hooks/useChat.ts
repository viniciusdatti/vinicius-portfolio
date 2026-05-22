/**
 * Visitor chat hook — thin UI adapter over chatStore + visitorChatRealtime.
 */

// Core
import { useCallback, useEffect, useRef } from 'react';

// Types
import type { ChatMessage } from '@/types';
import { ChatMessageSenderType } from '@/types';

// Components
import {
  endVisitorChatSession,
  startVisitorChatRealtime,
  stopVisitorChatRealtime,
} from '@/realtime/visitorChatRealtime';
import { useChatStore } from '@/store';
import { socketService } from '@/utils/socket';

const TYPING_DEBOUNCE_MS: number = 400;

/**
 * Hook for visitor chat UI on Live Lab.
 */
export const useChat = (): {
  sessionId: string | null;
  messages: ChatMessage[];
  isConnected: boolean;
  isAdminOnline: boolean;
  isTyping: boolean;
  startSession: (visitorName: string, visitorCompany?: string) => void;
  sendMessage: (content: string) => void;
  sendTyping: () => void;
  endSession: () => void;
} => {
  const sessionId: string | null = useChatStore((s) => s.sessionId);
  const messages = useChatStore((s) => s.messages);
  const isConnected: boolean = useChatStore((s) => s.isConnected);
  const isAdminOnline: boolean = useChatStore((s) => s.isAdminOnline);
  const isTyping: boolean = useChatStore((s) => s.isTyping);
  const addMessage = useChatStore((s) => s.addMessage);

  const typingDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    startVisitorChatRealtime();
    return () => {
      if (typingDebounceRef.current) {
        clearTimeout(typingDebounceRef.current);
      }
      stopVisitorChatRealtime();
    };
  }, []);

  const startSession = useCallback(
    (visitorName: string, visitorCompany?: string): void => {
      socketService.startSession(visitorName, visitorCompany);
    },
    [],
  );

  const sendMessage = useCallback(
    (content: string): void => {
      if (!sessionId || !content.trim()) {
        return;
      }
      const trimmed: string = content.trim();
      addMessage({
        id: -Date.now(),
        content: trimmed,
        sender_type: ChatMessageSenderType.Visitor,
        is_read: false,
        created_at: new Date().toISOString(),
      });
      socketService.sendMessage(sessionId, trimmed);
    },
    [sessionId, addMessage],
  );

  const sendTyping = useCallback((): void => {
    if (!sessionId) {
      return;
    }
    if (typingDebounceRef.current) {
      clearTimeout(typingDebounceRef.current);
    }
    typingDebounceRef.current = setTimeout(() => {
      socketService.sendTyping(sessionId);
      typingDebounceRef.current = null;
    }, TYPING_DEBOUNCE_MS);
  }, [sessionId]);

  const endSession = useCallback((): void => {
    endVisitorChatSession();
  }, []);

  return {
    sessionId,
    messages,
    isConnected,
    isAdminOnline,
    isTyping,
    startSession,
    sendMessage,
    sendTyping,
    endSession,
  };
};
