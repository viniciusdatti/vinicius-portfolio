/**
 * Visitor chat hook for real-time messaging with admin.
 * Handles socket connection, session management, and message handling.
 */

// Core
import { useEffect, useCallback, useRef } from 'react';

// Store
import { useChatStore } from '../store';

// Utils
import { socketService } from '../utils/socket';

// Types
import type { ChatMessage } from '../types';

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
    setConnected,
    setAdminOnline,
    setTyping,
    reset,
  } = useChatStore();

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

    // Listen for messages
    socket.on('message', (data: { id: number; content: string; sender_type: string; created_at: string }) => {
      const message: ChatMessage = {
        id: data.id,
        content: data.content,
        sender_type: data.sender_type as 'visitor' | 'admin',
        is_read: false,
        created_at: data.created_at,
      };
      addMessage(message);
    });

    // Listen for admin typing
    socket.on('admin_typing', () => {
      setTyping(true);
      
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Stop typing indicator after 3 seconds
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false);
      }, 3000);
    });

    // Listen for session closed
    socket.on('session_closed', () => {
      // Could show a notification here
      console.log('Session was closed by admin');
    });

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('admin_status');
      socket.off('session_started');
      socket.off('message');
      socket.off('admin_typing');
      socket.off('session_closed');
      socketService.disconnectVisitor();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [setConnected, setAdminOnline, setSessionId, addMessage, setTyping]);

  /**
   * Starts a new chat session with visitor information.
   */
  const startSession = useCallback((visitorName: string, visitorCompany?: string) => {
    socketService.startSession(visitorName, visitorCompany);
  }, []);

  /**
   * Sends a message to the current session.
   */
  const sendMessage = useCallback((content: string) => {
    if (sessionId && content.trim()) {
      socketService.sendMessage(sessionId, content);
    }
  }, [sessionId]);

  /**
   * Sends typing indicator to the server.
   */
  const sendTyping = useCallback(() => {
    if (sessionId) {
      socketService.sendTyping(sessionId);
    }
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
