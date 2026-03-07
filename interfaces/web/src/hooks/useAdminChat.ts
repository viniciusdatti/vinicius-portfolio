/**
 * Admin chat hook for managing real-time chat sessions.
 * Handles socket connections, message handling, and session management.
 * Loads existing sessions and messages from API so admin sees them even
 * when they weren't on the Chat page when the visitor sent messages.
 */

// Core
import { useEffect, useCallback, useRef, useState } from 'react';

// Types
import { ChatMessageSenderType } from '../types';

// Components
import { recordEvent } from '../services/adminChatService';
import { useAuthStore } from '../store';
import { socketService } from '../utils/socket';

const API_BASE: string = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

/**
 * Represents an active chat session with a visitor.
 */
export interface ChatSession {
  session_id: string;
  visitor_name: string;
  visitor_company?: string;
  started_at: string;
  unread_count: number;
  last_message?: string;
  is_typing?: boolean;
}

/**
 * Represents a single chat message.
 */
export interface ChatMessage {
  id: number;
  session_id: string;
  content: string;
  sender_type: ChatMessageSenderType;
  created_at: string;
}

/** Initial state shape for useAdminChat hook. */
interface UseAdminChatInitialState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  messages: ChatMessage[];
  isConnected: boolean;
}

/**
 * Hook for admin chat functionality.
 * Manages socket connection, sessions list, and message handling.
 */
export const useAdminChat = (): {
  sessions: ChatSession[];
  activeSessionId: string | null;
  activeSession: ChatSession | undefined;
  activeMessages: ChatMessage[];
  isConnected: boolean;
  joinSession: (sessionId: string) => Promise<void>;
  sendMessage: (content: string) => void;
  sendTyping: () => void;
  closeSession: (sessionId: string) => void;
} => {
  const { tokens } = useAuthStore();
  const typingTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  /* ***********************************************************************************************
   **************************************** INITIAL STATE *******************************************
   *********************************************************************************************** */

  const initialState: UseAdminChatInitialState = {
    sessions: [],
    activeSessionId: null,
    messages: [],
    isConnected: false,
  };

  const [sessions, setSessions] = useState<ChatSession[]>(initialState.sessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(
    initialState.activeSessionId
  );
  const [messages, setMessages] = useState<ChatMessage[]>(initialState.messages);
  const [isConnected, setIsConnected] = useState<boolean>(initialState.isConnected);

  /* ***********************************************************************************************
   ****************************************** EFFECTS **********************************************
   *********************************************************************************************** */

  // Connect to admin socket and load existing sessions from API
  useEffect(() => {
    if (!tokens?.access_token) return;

    const socket = socketService.connectAdmin(tokens.access_token);

    // Show connected if socket was already connected by AdminLayout
    if (socket.connected) {
      setIsConnected(true);
    }

    socket.on('connect', () => {
      console.log('Admin connected to chat server');
      setIsConnected(true);
      recordEvent('connect', {});
      loadSessions();
    });

    socket.on('disconnect', () => {
      console.log('Admin disconnected from chat server');
      setIsConnected(false);
      recordEvent('disconnect', {});
    });

    // Load existing sessions from API (so we see chats that started before we opened the page)
    const loadSessions = async () => {
      try {
        const res = await fetch(`${API_BASE}/chat/sessions`, {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setSessions(
          data.map((s: ChatSession & { status?: string }) => ({
            session_id: s.session_id,
            visitor_name: s.visitor_name,
            visitor_company: s.visitor_company,
            started_at: s.started_at,
            unread_count: s.unread_count ?? 0,
            last_message: s.last_message,
            is_typing: false,
          }))
        );
      } catch {
        // ignore
      }
    };
    loadSessions();

    socketService.onNewSession((data) => {
      recordEvent('new_session', data);
      setSessions((prev) => {
        const exists = prev.some((s) => s.session_id === data.session_id);
        if (exists) return prev;
        return [
          {
            session_id: data.session_id,
            visitor_name: data.visitor_name,
            visitor_company: data.visitor_company,
            started_at: data.started_at,
            unread_count: 1,
          },
          ...prev,
        ];
      });
    });

    socketService.onNewMessage((data: ChatMessage) => {
      recordEvent('new_message', data);
      // Update messages if this is the active session
      setMessages((prev) => {
        // Check if message already exists
        const exists = prev.some((m) => m.id === data.id);
        if (exists) return prev;
        return [...prev, data];
      });

      // Update unread count for the session
      setSessions((prev) =>
        prev.map((s) =>
          s.session_id === data.session_id && data.sender_type === ChatMessageSenderType.Visitor
            ? { ...s, unread_count: s.unread_count + 1, last_message: data.content }
            : s
        )
      );
    });

    // Listen for visitor typing
    socketService.onVisitorTyping((data) => {
      recordEvent('visitor_typing', data);
      setSessions((prev) =>
        prev.map((s) =>
          s.session_id === data.session_id ? { ...s, is_typing: true } : s
        )
      );

      // Clear existing timeout for this session
      const existingTimeout = typingTimeoutRef.current.get(data.session_id);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      // Set new timeout
      const timeout = setTimeout(() => {
        setSessions((prev) =>
          prev.map((s) =>
            s.session_id === data.session_id ? { ...s, is_typing: false } : s
          )
        );
      }, 3000);

      typingTimeoutRef.current.set(data.session_id, timeout);
    });

    // Listen for visitor disconnect
    socketService.onVisitorDisconnected((data) => {
      recordEvent('visitor_disconnected', data);
      setSessions((prev) =>
        prev.map((s) =>
          s.session_id === data.session_id
            ? { ...s, visitor_name: `${s.visitor_name} (desconectado)` }
            : s
        )
      );
    });

    // Copy ref to variable for cleanup
    const timeoutMap = typingTimeoutRef.current;

    return () => {
      // Remove listeners to avoid duplicates when re-entering Chat; do not disconnect.
      socketService.removeAdminListeners();
      timeoutMap.forEach((timeout) => clearTimeout(timeout));
      timeoutMap.clear();
    };
  }, [tokens?.access_token]);

  /* ***********************************************************************************************
   ****************************************** METHODS ***********************************************
   *********************************************************************************************** */

  /**
   * Joins a chat session, loads messages from API, and marks as read.
   */
  const joinSession = useCallback(
    async (sessionId: string) => {
      setActiveSessionId(sessionId);
      setMessages([]);
      socketService.joinSession(sessionId);
      socketService.markRead(sessionId);
      setSessions((prev) =>
        prev.map((s) =>
          s.session_id === sessionId ? { ...s, unread_count: 0 } : s
        )
      );

      const token = useAuthStore.getState().tokens?.access_token;
      if (!token) return;
      try {
        const res = await fetch(
          `${API_BASE}/chat/sessions/${sessionId}/messages`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) return;
        const data = await res.json();
        setMessages(
          data.map((m: ChatMessage) => ({
            id: m.id,
            session_id: m.session_id,
            content: m.content,
            sender_type: m.sender_type,
            created_at:
              typeof m.created_at === 'string'
                ? m.created_at
                : (m.created_at as { toISOString?: () => string })?.toISOString?.() ?? '',
          }))
        );
      } catch {
        setMessages([]);
      }
    },
    []
  );

  /**
   * Sends a message to the active session.
   */
  const sendMessage = useCallback(
    (content: string) => {
      if (activeSessionId && content.trim()) {
        socketService.adminSendMessage(activeSessionId, content);
      }
    },
    [activeSessionId]
  );

  /**
   * Sends typing indicator to the active session.
   */
  const sendTyping = useCallback(() => {
    if (activeSessionId) {
      socketService.adminSendTyping(activeSessionId);
    }
  }, [activeSessionId]);

  /**
   * Closes a chat session and removes it from the list.
   */
  const closeSession = useCallback((sessionId: string) => {
    socketService.closeSession(sessionId);
    setSessions((prev) => prev.filter((s) => s.session_id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
      setMessages([]);
    }
  }, [activeSessionId]);

  /* ***********************************************************************************************
   *************************************** DERIVED STATE ********************************************
   *********************************************************************************************** */

  const activeMessages = messages.filter(
    (m) => m.session_id === activeSessionId
  );

  // Get active session info
  const activeSession = sessions.find((s) => s.session_id === activeSessionId);

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
