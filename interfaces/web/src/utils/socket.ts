/**
 * Socket service for real-time chat communication.
 * Manages WebSocket connections for visitors and admin users.
 */

// Libraries
import { io, Socket } from 'socket.io-client';

// Components
import { env } from '../config/env';

// Types
import type {
  ChatSocketAdminStatusPayload,
  ChatSocketMessagePayload,
  ChatSocketSessionScopePayload,
  ChatSocketSessionStartedPayload,
} from '../types/chat-socket';

/** Base URL for Socket.IO (root, not /api/v1 - socket is mounted at server root) */
const SOCKET_URL: string = (() => {
  const apiUrl: string = env.apiUrl;
  return apiUrl.replace(/\/api\/v1\/?$/, '') || 'http://localhost:8000';
})();

/**
 * Singleton service for managing WebSocket connections.
 * Handles both visitor and admin chat namespaces.
 */
class SocketService {
  private socket: Socket | null = null;
  private adminSocket: Socket | null = null;

  // ============================================
  // Visitor Socket (Public Chat)
  // ============================================

  /**
   * Connects to the visitor chat namespace.
   * Creates a new connection if not already connected.
   */
  connectVisitor(): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(`${SOCKET_URL}/chat`, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from chat server:', reason);
    });

    this.socket.on('reconnect', () => {
      console.log('Reconnected to chat server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return this.socket;
  }

  /**
   * Rejoins an existing session after reconnect (keeps visitor in room).
   */
  rejoinSession(sessionId: string): void {
    if (this.socket?.connected && sessionId) {
      this.socket.emit('rejoin_session', { session_id: sessionId });
    }
  }

  /**
   * Disconnects the visitor socket connection.
   */
  disconnectVisitor(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  /**
   * Starts a new chat session with visitor information.
   */
  startSession(visitorName: string, visitorCompany?: string): void {
    if (this.socket) {
      this.socket.emit('start_session', {
        visitor_name: visitorName,
        visitor_company: visitorCompany,
      });
    }
  }

  /**
   * Sends a message from visitor to the session.
   */
  sendMessage(sessionId: string, content: string): void {
    if (this.socket) {
      this.socket.emit('send_message', {
        session_id: sessionId,
        content,
      });
    }
  }

  /**
   * Emits typing indicator for the session.
   */
  sendTyping(sessionId: string): void {
    if (this.socket) {
      this.socket.emit('typing', { session_id: sessionId });
    }
  }

  /**
   * Registers callback for incoming messages.
   */
  onMessage(callback: (data: ChatSocketMessagePayload) => void): void {
    if (this.socket) {
      this.socket.on('message', callback);
    }
  }

  /**
   * Registers callback for admin online status updates.
   */
  onAdminStatus(callback: (data: ChatSocketAdminStatusPayload) => void): void {
    if (this.socket) {
      this.socket.on('admin_status', callback);
    }
  }

  /**
   * Registers callback for admin typing indicator.
   */
  onAdminTyping(callback: (data: ChatSocketSessionScopePayload) => void): void {
    if (this.socket) {
      this.socket.on('admin_typing', callback);
    }
  }

  /**
   * Registers callback for session started event.
   */
  onSessionStarted(
    callback: (data: ChatSocketSessionStartedPayload) => void
  ): void {
    if (this.socket) {
      this.socket.on('session_started', callback);
    }
  }

  /**
   * Registers callback for session closed event.
   */
  onSessionClosed(callback: (data: ChatSocketSessionScopePayload) => void): void {
    if (this.socket) {
      this.socket.on('session_closed', callback);
    }
  }

  // ============================================
  // Admin Socket
  // ============================================

  /**
   * Connects to the admin chat namespace with authentication.
   */
  connectAdmin(token: string): Socket {
    if (this.adminSocket?.connected) {
      return this.adminSocket;
    }

    this.adminSocket = io(`${SOCKET_URL}/admin-chat`, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    this.adminSocket.on('connect', () => {
      console.log('Admin connected to chat server');
    });

    this.adminSocket.on('disconnect', (reason) => {
      console.log('Admin disconnected from chat server:', reason);
    });

    this.adminSocket.on('connect_error', (error) => {
      console.error('Admin connection error:', error);
    });

    return this.adminSocket;
  }

  /**
   * Disconnects the admin socket connection.
   */
  disconnectAdmin(): void {
    if (this.adminSocket) {
      this.adminSocket.disconnect();
      this.adminSocket = null;
    }
  }

  /**
   * Joins a chat session as admin.
   */
  joinSession(sessionId: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('join_session', { session_id: sessionId });
    }
  }

  /**
   * Sends a message from admin to the session.
   */
  adminSendMessage(sessionId: string, content: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('send_message', {
        session_id: sessionId,
        content,
      });
    }
  }

  /**
   * Emits admin typing indicator for the session.
   */
  adminSendTyping(sessionId: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('typing', { session_id: sessionId });
    }
  }

  /**
   * Marks all messages in a session as read.
   */
  markRead(sessionId: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('mark_read', { session_id: sessionId });
    }
  }

  /**
   * Closes a chat session.
   */
  closeSession(sessionId: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('close_session', { session_id: sessionId });
    }
  }

  // ============================================
  // Utility Methods
  // ============================================

  /**
   * Returns the visitor socket instance.
   */
  getVisitorSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Returns the admin socket instance.
   */
  getAdminSocket(): Socket | null {
    return this.adminSocket;
  }

  /**
   * Checks if visitor socket is connected.
   */
  isVisitorConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Checks if admin socket is connected.
   */
  isAdminConnected(): boolean {
    return this.adminSocket?.connected ?? false;
  }
}

// Export singleton instance
export const socketService = new SocketService();
