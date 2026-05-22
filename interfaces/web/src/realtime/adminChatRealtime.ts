/**
 * Admin chat realtime controller — single owner of socket lifecycle and listeners.
 * Started from AdminLayout when admin is authenticated.
 */

// Libraries
import type { Socket } from 'socket.io-client';

// Types
import type {
  ChatSocketNewMessagePayload,
  ChatSocketNewSessionPayload,
  ChatSocketSessionScopePayload,
  ChatSocketSessionUpdatedPayload,
} from '../types/chat-socket';
import { AdminChatEventType } from '../types/chat-socket';

// Components
import {
  fetchAdminChatSessions,
  fetchAdminSessionMessages,
} from '../services/adminChatApi';
import { recordEvent } from '../services/adminChatService';
import { useAdminChatStore } from '../store/adminChatStore';
import { socketService } from '../utils/socket';

enum AdminRealtimeStatus {
  Idle = 'idle',
  Active = 'active',
}

const TYPING_CLEAR_MS: number = 3000;

let status: AdminRealtimeStatus = AdminRealtimeStatus.Idle;
let accessToken: string | null = null;
let boundSocket: Socket | null = null;
const typingTimeouts: Map<string, ReturnType<typeof setTimeout>> = new Map();

let onConnectHandler: (() => void) | null = null;
let onDisconnectHandler: (() => void) | null = null;
let onNewSessionHandler: ((data: ChatSocketNewSessionPayload) => void) | null = null;
let onNewMessageHandler: ((data: ChatSocketNewMessagePayload) => void) | null = null;
let onVisitorTypingHandler: ((data: ChatSocketSessionScopePayload) => void) | null = null;
let onVisitorDisconnectedHandler: ((data: ChatSocketSessionScopePayload) => void) | null = null;
let onSessionUpdatedHandler: ((data: ChatSocketSessionUpdatedPayload) => void) | null = null;

const clearTypingTimeouts = (): void => {
  typingTimeouts.forEach((timeout: ReturnType<typeof setTimeout>) => {
    clearTimeout(timeout);
  });
  typingTimeouts.clear();
};

const syncSessionsFromApi = async (): Promise<void> => {
  if (!accessToken) {
    return;
  }
  const sessions = await fetchAdminChatSessions(accessToken);
  useAdminChatStore.getState().setSessions(sessions);
};

const rejoinActiveSessionRoom = (): void => {
  const { activeSessionId } = useAdminChatStore.getState();
  if (activeSessionId) {
    socketService.joinSession(activeSessionId);
  }
};

const handleConnect = (): void => {
  useAdminChatStore.getState().setConnected(true);
  recordEvent(AdminChatEventType.Connect, {});
  syncSessionsFromApi().catch(() => undefined);
  rejoinActiveSessionRoom();
};

const handleDisconnect = (): void => {
  useAdminChatStore.getState().setConnected(false);
  recordEvent(AdminChatEventType.Disconnect, {});
};

const detachSocketListeners = (socket: Socket): void => {
  if (onConnectHandler) {
    socket.off('connect', onConnectHandler);
  }
  if (onDisconnectHandler) {
    socket.off('disconnect', onDisconnectHandler);
  }
  if (onNewSessionHandler) {
    socket.off('new_session', onNewSessionHandler);
  }
  if (onNewMessageHandler) {
    socket.off('new_message', onNewMessageHandler);
  }
  if (onVisitorTypingHandler) {
    socket.off('visitor_typing', onVisitorTypingHandler);
  }
  if (onVisitorDisconnectedHandler) {
    socket.off('visitor_disconnected', onVisitorDisconnectedHandler);
  }
  if (onSessionUpdatedHandler) {
    socket.off('session_updated', onSessionUpdatedHandler);
  }
};

const attachSocketListeners = (socket: Socket): void => {
  detachSocketListeners(socket);

  onConnectHandler = handleConnect;
  onDisconnectHandler = handleDisconnect;

  onNewSessionHandler = (data: ChatSocketNewSessionPayload): void => {
    recordEvent(AdminChatEventType.NewSession, data);
    useAdminChatStore.getState().handleNewSession(data);
  };

  onNewMessageHandler = (data: ChatSocketNewMessagePayload): void => {
    recordEvent(AdminChatEventType.NewMessage, data);
    useAdminChatStore.getState().handleNewMessage(data);
  };

  onVisitorTypingHandler = (data: ChatSocketSessionScopePayload): void => {
    recordEvent(AdminChatEventType.VisitorTyping, data);
    const store = useAdminChatStore.getState();
    store.handleVisitorTyping(data);

    const existing: ReturnType<typeof setTimeout> | undefined = typingTimeouts.get(data.session_id);
    if (existing) {
      clearTimeout(existing);
    }

    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      store.clearVisitorTyping(data.session_id);
      typingTimeouts.delete(data.session_id);
    }, TYPING_CLEAR_MS);

    typingTimeouts.set(data.session_id, timeout);
  };

  onVisitorDisconnectedHandler = (data: ChatSocketSessionScopePayload): void => {
    recordEvent(AdminChatEventType.VisitorDisconnected, data);
    useAdminChatStore.getState().handleVisitorDisconnected(data);
  };

  onSessionUpdatedHandler = (data: ChatSocketSessionUpdatedPayload): void => {
    recordEvent(AdminChatEventType.SessionUpdated, data);
    useAdminChatStore.getState().handleSessionUpdated(data);
  };

  socket.on('connect', onConnectHandler);
  socket.on('disconnect', onDisconnectHandler);
  socket.on('new_session', onNewSessionHandler);
  socket.on('new_message', onNewMessageHandler);
  socket.on('session_updated', onSessionUpdatedHandler);
  socket.on('visitor_typing', onVisitorTypingHandler);
  socket.on('visitor_disconnected', onVisitorDisconnectedHandler);
};

/**
 * Stops admin realtime: removes listeners, disconnects, resets store.
 */
export const stopAdminChatRealtime = (): void => {
  if (boundSocket) {
    detachSocketListeners(boundSocket);
  }
  clearTypingTimeouts();
  socketService.disconnectAdmin();
  boundSocket = null;
  accessToken = null;
  status = AdminRealtimeStatus.Idle;
  useAdminChatStore.getState().reset();
};

/**
 * Starts admin realtime: connects socket and attaches listeners once.
 */
export const startAdminChatRealtime = (token: string): void => {
  if (
    status === AdminRealtimeStatus.Active
    && accessToken === token
    && boundSocket?.connected
  ) {
    return;
  }

  if (status === AdminRealtimeStatus.Active && boundSocket) {
    stopAdminChatRealtime();
  }

  accessToken = token;
  const socket: Socket = socketService.connectAdmin(token);
  boundSocket = socket;
  attachSocketListeners(socket);
  status = AdminRealtimeStatus.Active;

  if (socket.connected) {
    handleConnect();
  }
};

/**
 * Joins a session room, loads history from API, marks read on server.
 */
export const joinAdminChatSession = async (sessionId: string): Promise<void> => {
  const token: string | null = accessToken;
  if (!token) {
    return;
  }

  useAdminChatStore.getState().setActiveSessionId(sessionId);
  useAdminChatStore.getState().setActiveMessages([]);
  socketService.joinSession(sessionId);
  socketService.markRead(sessionId);
  useAdminChatStore.getState().markSessionRead(sessionId);

  const messages = await fetchAdminSessionMessages(token, sessionId);
  useAdminChatStore.getState().setActiveMessages(messages);
};

/**
 * Sends admin message to active session via socket.
 */
export const sendAdminChatMessage = (
  sessionId: string,
  content: string,
): void => {
  if (content.trim()) {
    socketService.adminSendMessage(sessionId, content.trim());
  }
};

/**
 * Emits admin typing for session.
 */
export const sendAdminChatTyping = (sessionId: string): void => {
  socketService.adminSendTyping(sessionId);
};

/**
 * Closes session on server and updates store.
 */
export const closeAdminChatSession = (sessionId: string): void => {
  socketService.closeSession(sessionId);
  useAdminChatStore.getState().removeSession(sessionId);
};

/**
 * Whether admin realtime controller is active.
 */
export const isAdminChatRealtimeActive = (): boolean => status === AdminRealtimeStatus.Active;
