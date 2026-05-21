/**
 * Visitor chat realtime controller — owns socket listeners and session resume.
 */

// Libraries
import type { Socket } from 'socket.io-client';

// Types
import type { ChatMessage } from '../types';
import type {
  ChatSocketAdminStatusPayload,
  ChatSocketMessagePayload,
  ChatSocketSessionStartedPayload,
} from '../types/chat-socket';
import { ChatMessageSenderType } from '../types';
import {
  SystemEventLevel,
  SystemEventType,
} from '../types/system-events';
import { parseSocketSenderType } from '../types/chat-mappers';

// Components
import { fetchVisitorSessionMessages } from '../services/visitorChatApi';
import { useChatStore } from '../store/chatStore';
import { useSystemEventStore } from '../store/systemEventStore';
import { socketService } from '../utils/socket';
import {
  clearStoredVisitorSessionId,
  getStoredVisitorSessionId,
  setStoredVisitorSessionId,
} from '../utils/visitorChatStorage';

const logEvent = (
  type: SystemEventType,
  level: SystemEventLevel,
  messageKey: string,
  messageParams?: Record<string, string>
): void => {
  useSystemEventStore
    .getState()
    .push(type, level, messageKey, messageParams);
};

enum VisitorRealtimeStatus {
  Idle = 'idle',
  Active = 'active',
}

const TYPING_CLEAR_MS: number = 3000;

let status: VisitorRealtimeStatus = VisitorRealtimeStatus.Idle;
let boundSocket: Socket | null = null;
let typingClearTimeout: ReturnType<typeof setTimeout> | null = null;

let onConnectHandler: (() => void) | null = null;
let onDisconnectHandler: (() => void) | null = null;
let onReconnectHandler: (() => void) | null = null;
let onAdminStatusHandler: ((data: ChatSocketAdminStatusPayload) => void) | null = null;
let onSessionStartedHandler:
  | ((data: ChatSocketSessionStartedPayload) => void)
  | null = null;
let onMessageHandler: ((data: ChatSocketMessagePayload) => void) | null = null;
let onAdminTypingHandler: (() => void) | null = null;
let onSessionClosedHandler: (() => void) | null = null;
let onRejoinOkHandler: (() => void) | null = null;

const resumeStoredSession = async (sessionId: string): Promise<void> => {
  const store = useChatStore.getState();
  store.setSessionId(sessionId);
  const messages: ChatMessage[] = await fetchVisitorSessionMessages(sessionId);
  store.setMessages(messages);
  socketService.rejoinSession(sessionId);
  logEvent(
    SystemEventType.SessionResume,
    SystemEventLevel.Info,
    'workspace.events.sessionResume',
    { id: sessionId.slice(-6).toUpperCase() }
  );
};

const handleReconnect = (): void => {
  useChatStore.getState().setConnected(true);
  logEvent(
    SystemEventType.TransportReconnect,
    SystemEventLevel.Warning,
    'workspace.events.transportReconnect'
  );
  const sessionId: string | null = useChatStore.getState().sessionId;
  if (sessionId) {
    socketService.rejoinSession(sessionId);
  }
};

const handleConnect = (): void => {
  useChatStore.getState().setConnected(true);
  logEvent(
    SystemEventType.TransportLive,
    SystemEventLevel.Success,
    'workspace.events.transportLive'
  );
  const storedId: string | null = getStoredVisitorSessionId();
  const currentId: string | null = useChatStore.getState().sessionId;
  const resumeId: string | null = currentId ?? storedId;
  if (resumeId && !currentId) {
    void resumeStoredSession(resumeId);
  } else if (resumeId) {
    socketService.rejoinSession(resumeId);
    logEvent(
      SystemEventType.SessionResume,
      SystemEventLevel.Info,
      'workspace.events.sessionResume',
      { id: resumeId.slice(-6).toUpperCase() }
    );
  }
};

const mapSocketMessageToChatMessage = (
  data: ChatSocketMessagePayload
): ChatMessage | null => {
  const senderType = parseSocketSenderType(data.sender_type);
  if (!senderType) {
    return null;
  }
  return {
    id: data.id,
    content: data.content,
    sender_type: senderType,
    is_read: false,
    created_at: data.created_at,
  };
};

const detachSocketListeners = (socket: Socket): void => {
  if (onConnectHandler) {
    socket.off('connect', onConnectHandler);
  }
  if (onDisconnectHandler) {
    socket.off('disconnect', onDisconnectHandler);
  }
  if (onReconnectHandler) {
    socket.off('reconnect', onReconnectHandler);
  }
  if (onAdminStatusHandler) {
    socket.off('admin_status', onAdminStatusHandler);
  }
  if (onSessionStartedHandler) {
    socket.off('session_started', onSessionStartedHandler);
  }
  if (onMessageHandler) {
    socket.off('message', onMessageHandler);
  }
  if (onAdminTypingHandler) {
    socket.off('admin_typing', onAdminTypingHandler);
  }
  if (onSessionClosedHandler) {
    socket.off('session_closed', onSessionClosedHandler);
  }
  if (onRejoinOkHandler) {
    socket.off('rejoin_ok', onRejoinOkHandler);
  }
};

const attachSocketListeners = (socket: Socket): void => {
  detachSocketListeners(socket);

  const store = useChatStore.getState;

  onConnectHandler = handleConnect;
  onDisconnectHandler = (): void => {
    store().setConnected(false);
    logEvent(
      SystemEventType.TransportDown,
      SystemEventLevel.Error,
      'workspace.events.transportDown'
    );
  };
  onReconnectHandler = handleReconnect;

  onAdminStatusHandler = (data: ChatSocketAdminStatusPayload): void => {
    const adminCount: number =
      typeof data.admin_count === 'number' ? data.admin_count : 0;
    const online: boolean = data.is_online && adminCount > 0;
    store().setAdminOnline(online);
    logEvent(
      SystemEventType.PresenceChange,
      online ? SystemEventLevel.Success : SystemEventLevel.Info,
      online
        ? 'workspace.events.presenceOnline'
        : 'workspace.events.presenceOffline'
    );
  };

  onSessionStartedHandler = (data: ChatSocketSessionStartedPayload): void => {
    store().setSessionId(data.session_id);
    setStoredVisitorSessionId(data.session_id);
    logEvent(
      SystemEventType.SessionOpen,
      SystemEventLevel.Success,
      'workspace.events.sessionOpen',
      { id: data.session_id.slice(-6).toUpperCase() }
    );
  };

  onMessageHandler = (data: ChatSocketMessagePayload): void => {
    const message: ChatMessage | null = mapSocketMessageToChatMessage(data);
    if (!message) {
      return;
    }
    if (message.sender_type === ChatMessageSenderType.Visitor) {
      const state = store();
      const idx: number = state.messages.findIndex(
        (m) => m.id < 0 && m.content === data.content
      );
      if (idx >= 0) {
        const next: ChatMessage[] = [...state.messages];
        next.splice(idx, 1, message);
        store().setMessages(next);
        return;
      }
    }
    store().addMessage(message);
    if (message.sender_type === ChatMessageSenderType.Admin) {
      logEvent(
        SystemEventType.MessageIn,
        SystemEventLevel.Info,
        'workspace.events.messageIn'
      );
    }
  };

  onAdminTypingHandler = (): void => {
    store().setTyping(true);
    logEvent(SystemEventType.Typing, SystemEventLevel.Info, 'workspace.events.typing');
    if (typingClearTimeout) {
      clearTimeout(typingClearTimeout);
    }
    typingClearTimeout = setTimeout(() => {
      store().setTyping(false);
      typingClearTimeout = null;
    }, TYPING_CLEAR_MS);
  };

  onSessionClosedHandler = (): void => {
    store().reset();
    clearStoredVisitorSessionId();
    logEvent(
      SystemEventType.SessionClosed,
      SystemEventLevel.Warning,
      'workspace.events.sessionClosed'
    );
  };

  onRejoinOkHandler = (): void => {
    const sessionId: string | null = store().sessionId;
    if (sessionId) {
      setStoredVisitorSessionId(sessionId);
    }
  };

  socket.on('connect', onConnectHandler);
  socket.on('disconnect', onDisconnectHandler);
  socket.on('reconnect', onReconnectHandler);
  socket.on('admin_status', onAdminStatusHandler);
  socket.on('session_started', onSessionStartedHandler);
  socket.on('message', onMessageHandler);
  socket.on('admin_typing', onAdminTypingHandler);
  socket.on('session_closed', onSessionClosedHandler);
  socket.on('rejoin_ok', onRejoinOkHandler);
};

/**
 * Starts visitor realtime (Live Lab mount).
 */
export const startVisitorChatRealtime = (): void => {
  if (status === VisitorRealtimeStatus.Active && boundSocket?.connected) {
    return;
  }

  logEvent(
    SystemEventType.TransportInit,
    SystemEventLevel.Info,
    'workspace.events.transportInit'
  );

  const socket: Socket = socketService.connectVisitor();
  boundSocket = socket;
  attachSocketListeners(socket);
  status = VisitorRealtimeStatus.Active;

  if (socket.connected) {
    void handleConnect();
  }
};

/**
 * Stops visitor realtime and disconnects socket.
 */
export const stopVisitorChatRealtime = (): void => {
  if (boundSocket) {
    detachSocketListeners(boundSocket);
  }
  if (typingClearTimeout) {
    clearTimeout(typingClearTimeout);
    typingClearTimeout = null;
  }
  socketService.disconnectVisitor();
  boundSocket = null;
  status = VisitorRealtimeStatus.Idle;
};

/**
 * Clears visitor session locally and on storage.
 */
export const endVisitorChatSession = (): void => {
  useChatStore.getState().reset();
  clearStoredVisitorSessionId();
  stopVisitorChatRealtime();
};
