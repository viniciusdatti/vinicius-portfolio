// Core
import { useEffect, useCallback, useRef } from 'react';

// Store
import { useChatStore } from '../store';

// Utils
import { socketService } from '../utils/socket';

// Types
import type { ChatMessage } from '../types';

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

    socket.on('connect', () => {
      setConnected(true);
    });

    socket.on('disconnect', () => {
      setConnected(false);
    });

    // Listen for admin status
    socketService.onAdminStatus((data) => {
      setAdminOnline(data.is_online);
    });

    // Listen for session started
    socketService.onSessionStarted((data) => {
      setSessionId(data.session_id);
    });

    // Listen for messages
    socketService.onMessage((data) => {
      const message: ChatMessage = {
        id: data.id,
        content: data.content,
        sender_type: data.sender_type,
        is_read: false,
        created_at: data.created_at,
      };
      addMessage(message);
    });

    // Listen for admin typing
    socketService.onAdminTyping(() => {
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
    socketService.onSessionClosed(() => {
      // Could show a notification here
      console.log('Session was closed by admin');
    });

    return () => {
      socketService.disconnectVisitor();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [setConnected, setAdminOnline, setSessionId, addMessage, setTyping]);

  // Start a new chat session
  const startSession = useCallback((visitorName: string, visitorCompany?: string) => {
    socketService.startSession(visitorName, visitorCompany);
  }, []);

  // Send a message
  const sendMessage = useCallback((content: string) => {
    if (sessionId && content.trim()) {
      socketService.sendMessage(sessionId, content);
    }
  }, [sessionId]);

  // Send typing indicator
  const sendTyping = useCallback(() => {
    if (sessionId) {
      socketService.sendTyping(sessionId);
    }
  }, [sessionId]);

  // End chat session
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
