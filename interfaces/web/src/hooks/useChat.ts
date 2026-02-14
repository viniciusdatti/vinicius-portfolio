/**
 * Visitor chat hook for real-time messaging with admin.
 * Handles socket connection, session management, and message handling.
 * Uses optimistic updates and debounced typing for performance.
 */

// Core
import { useEffect, useCallback, useRef } from 'react';

// Store
import { useChatStore } from '../store';

// Utils
import { socketService } from '../utils/socket';

// Types
import type { ChatMessage } from '../types';

const TYPING_DEBOUNCE_MS = 400;

/**
 * Hook for visitor chat functionality.
 * Manages socket connection, session state, and messaging.
 */
export const useChat = () => {
  const {
    sessionId,
    messages,
    isConnected,
    isAdminOnline,
    isTyping,
    setSessionId,
    addMessage,
    setMessages,
    setConnected,
    setAdminOnline,
    setTyping,
    reset,
  } = useChatStore();

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Connect to socket on mount
  useEffect(() => {
    const socket = socketService.connectVisitor();

    // Handle connection state
    const handleConnect = (): void => {
      setConnected(true);
    };

    const handleDisconnect = (): void => {
      setConnected(false);
    };

    // Register connection listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    const handleReconnect = (): void => {
      setConnected(true);
      const currentSessionId = useChatStore.getState().sessionId;
      if (currentSessionId) {
        socketService.rejoinSession(currentSessionId);
      }
    };
    socket.on('reconnect', handleReconnect);

    // Check if already connected (in case socket was reused)
    if (socket.connected) {
      setConnected(true);
    }

    // Listen for admin status
    socket.on('admin_status', (data: { is_online: boolean }) => {
      setAdminOnline(data.is_online);
    });

    // Listen for session started
    socket.on('session_started', (data: { session_id: string; visitor_name: string }) => {
      setSessionId(data.session_id);
    });

    // Listen for messages (replace optimistic temp message when server echoes visitor message)
    socket.on('message', (data: { id: number; content: string; sender_type: string; created_at: string }) => {
      const message: ChatMessage = {
        id: data.id,
        content: data.content,
        sender_type: data.sender_type as 'visitor' | 'admin',
        is_read: false,
        created_at: data.created_at,
      };
      if (data.sender_type === 'visitor') {
        const state = useChatStore.getState();
        const idx = state.messages.findIndex((m) => m.id < 0 && m.content === data.content);
        if (idx >= 0) {
          const next = [...state.messages];
          next.splice(idx, 1, message);
          setMessages(next);
          return;
        }
      }
      addMessage(message);
    });

    // Listen for admin typing (debounced display off after 3s)
    socket.on('admin_typing', () => {
      setTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setTyping(false), 3000);
    });

    // Listen for session closed
    socket.on('session_closed', () => {
      // Could show a notification here
      console.log('Session was closed by admin');
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('reconnect', handleReconnect);
      socket.off('admin_status');
      socket.off('session_started');
      socket.off('message');
      socket.off('admin_typing');
      socket.off('session_closed');
      socketService.disconnectVisitor();
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (typingDebounceRef.current) clearTimeout(typingDebounceRef.current);
    };
  }, [setConnected, setAdminOnline, setSessionId, addMessage, setMessages, setTyping]);

  /**
   * Starts a new chat session with visitor information.
   */
  const startSession = useCallback((visitorName: string, visitorCompany?: string) => {
    socketService.startSession(visitorName, visitorCompany);
  }, []);

  /**
   * Sends a message to the current session (optimistic update for instant UI).
   */
  const sendMessage = useCallback(
    (content: string) => {
      if (!sessionId || !content.trim()) return;
      const trimmed = content.trim();
      addMessage({
        id: -Date.now(),
        content: trimmed,
        sender_type: 'visitor',
        is_read: false,
        created_at: new Date().toISOString(),
      });
      socketService.sendMessage(sessionId, trimmed);
    },
    [sessionId, addMessage]
  );

  /**
   * Sends typing indicator (debounced to avoid flooding the socket).
   */
  const sendTyping = useCallback(() => {
    if (!sessionId) return;
    if (typingDebounceRef.current) clearTimeout(typingDebounceRef.current);
    typingDebounceRef.current = setTimeout(() => {
      socketService.sendTyping(sessionId);
      typingDebounceRef.current = null;
    }, TYPING_DEBOUNCE_MS);
  }, [sessionId]);

  /**
   * Ends the current chat session and disconnects.
   */
  const endSession = useCallback(() => {
    reset();
    socketService.disconnectVisitor();
  }, [reset]);

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
