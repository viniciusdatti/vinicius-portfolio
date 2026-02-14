// Core
import { useEffect, useCallback, useRef, useState } from 'react';

// Utils
import { socketService } from '../utils/socket';

// Store
import { useAuthStore } from '../store';

// Types
export interface ChatSession {
  session_id: string;
  visitor_name: string;
  visitor_company?: string;
  started_at: string;
  unread_count: number;
  last_message?: string;
  is_typing?: boolean;
}

export interface ChatMessage {
  id: number;
  session_id: string;
  content: string;
  sender_type: 'visitor' | 'admin';
  created_at: string;
}

export const useAdminChat = () => {
  const { tokens } = useAuthStore();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const typingTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Connect to admin socket
  useEffect(() => {
    if (!tokens?.access_token) return;

    const socket = socketService.connectAdmin(tokens.access_token);

    socket.on('connect', () => {
      console.log('Admin connected to chat server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Admin disconnected from chat server');
      setIsConnected(false);
    });

    // Listen for new sessions
    socketService.onNewSession((data) => {
      setSessions((prev) => {
        // Check if session already exists
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

    // Listen for new messages
    socketService.onNewMessage((data: ChatMessage) => {
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
          s.session_id === data.session_id && data.sender_type === 'visitor'
            ? { ...s, unread_count: s.unread_count + 1, last_message: data.content }
            : s
        )
      );
    });

    // Listen for visitor typing
    socketService.onVisitorTyping((data) => {
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
      socketService.disconnectAdmin();
      // Clear all typing timeouts
      timeoutMap.forEach((timeout) => clearTimeout(timeout));
      timeoutMap.clear();
    };
  }, [tokens?.access_token]);

  // Join a session
  const joinSession = useCallback((sessionId: string) => {
    setActiveSessionId(sessionId);
    socketService.joinSession(sessionId);
    
    // Mark messages as read
    socketService.markRead(sessionId);
    
    // Update unread count locally
    setSessions((prev) =>
      prev.map((s) =>
        s.session_id === sessionId ? { ...s, unread_count: 0 } : s
      )
    );
  }, []);

  // Send a message
  const sendMessage = useCallback(
    (content: string) => {
      if (activeSessionId && content.trim()) {
        socketService.adminSendMessage(activeSessionId, content);
      }
    },
    [activeSessionId]
  );

  // Send typing indicator
  const sendTyping = useCallback(() => {
    if (activeSessionId) {
      socketService.adminSendTyping(activeSessionId);
    }
  }, [activeSessionId]);

  // Close a session
  const closeSession = useCallback((sessionId: string) => {
    socketService.closeSession(sessionId);
    setSessions((prev) => prev.filter((s) => s.session_id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
      setMessages([]);
    }
  }, [activeSessionId]);

  // Get messages for active session
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
