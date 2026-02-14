// Libraries
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class SocketService {
  private socket: Socket | null = null;
  private adminSocket: Socket | null = null;

  // ============================================
  // Visitor Socket (Public Chat)
  // ============================================

  connectVisitor(): Socket {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(`${SOCKET_URL}/chat`, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from chat server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return this.socket;
  }

  disconnectVisitor(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  startSession(visitorName: string, visitorCompany?: string): void {
    if (this.socket) {
      this.socket.emit('start_session', {
        visitor_name: visitorName,
        visitor_company: visitorCompany,
      });
    }
  }

  sendMessage(sessionId: string, content: string): void {
    if (this.socket) {
      this.socket.emit('send_message', {
        session_id: sessionId,
        content,
      });
    }
  }

  sendTyping(sessionId: string): void {
    if (this.socket) {
      this.socket.emit('typing', { session_id: sessionId });
    }
  }

  onMessage(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('message', callback);
    }
  }

  onAdminStatus(callback: (data: { is_online: boolean }) => void): void {
    if (this.socket) {
      this.socket.on('admin_status', callback);
    }
  }

  onAdminTyping(callback: (data: { session_id: string }) => void): void {
    if (this.socket) {
      this.socket.on('admin_typing', callback);
    }
  }

  onSessionStarted(callback: (data: { session_id: string; visitor_name: string }) => void): void {
    if (this.socket) {
      this.socket.on('session_started', callback);
    }
  }

  onSessionClosed(callback: (data: { session_id: string }) => void): void {
    if (this.socket) {
      this.socket.on('session_closed', callback);
    }
  }

  // ============================================
  // Admin Socket
  // ============================================

  connectAdmin(token: string): Socket {
    if (this.adminSocket?.connected) {
      return this.adminSocket;
    }

    this.adminSocket = io(`${SOCKET_URL}/admin-chat`, {
      transports: ['websocket', 'polling'],
      autoConnect: true,
      auth: { token },
    });

    this.adminSocket.on('connect', () => {
      console.log('Admin connected to chat server');
    });

    this.adminSocket.on('disconnect', () => {
      console.log('Admin disconnected from chat server');
    });

    return this.adminSocket;
  }

  disconnectAdmin(): void {
    if (this.adminSocket) {
      this.adminSocket.disconnect();
      this.adminSocket = null;
    }
  }

  joinSession(sessionId: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('join_session', { session_id: sessionId });
    }
  }

  adminSendMessage(sessionId: string, content: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('send_message', {
        session_id: sessionId,
        content,
      });
    }
  }

  adminSendTyping(sessionId: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('typing', { session_id: sessionId });
    }
  }

  markRead(sessionId: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('mark_read', { session_id: sessionId });
    }
  }

  closeSession(sessionId: string): void {
    if (this.adminSocket) {
      this.adminSocket.emit('close_session', { session_id: sessionId });
    }
  }

  onNewSession(callback: (data: any) => void): void {
    if (this.adminSocket) {
      this.adminSocket.on('new_session', callback);
    }
  }

  onNewMessage(callback: (data: any) => void): void {
    if (this.adminSocket) {
      this.adminSocket.on('new_message', callback);
    }
  }

  onVisitorTyping(callback: (data: { session_id: string }) => void): void {
    if (this.adminSocket) {
      this.adminSocket.on('visitor_typing', callback);
    }
  }

  onVisitorDisconnected(callback: (data: { session_id: string }) => void): void {
    if (this.adminSocket) {
      this.adminSocket.on('visitor_disconnected', callback);
    }
  }

  // ============================================
  // Utility Methods
  // ============================================

  getVisitorSocket(): Socket | null {
    return this.socket;
  }

  getAdminSocket(): Socket | null {
    return this.adminSocket;
  }

  isVisitorConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  isAdminConnected(): boolean {
    return this.adminSocket?.connected ?? false;
  }
}

// Export singleton instance
export const socketService = new SocketService();
