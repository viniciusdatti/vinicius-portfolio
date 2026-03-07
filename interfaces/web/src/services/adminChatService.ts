/**
 * Admin Chat Service – centraliza os dados/eventos recebidos via socket
 * e expõe para a página admin. Quando a conexão está ativa, todos os
 * eventos do cliente (visitante) chegam aqui e podem ser listados e
 * consumidos pela admin page.
 *
 * Uso:
 * - getReceivedEvents() → listar todos os eventos já recebidos
 * - subscribeToAdminEvents(cb) → receber cada novo evento em tempo real
 * - recordEvent(type, data) → chamado pelos listeners do socket (useAdminChat)
 */

import { socketService } from '../utils/socket';

// ============================================
// Types
// ============================================

export type AdminChatEventType =
  | 'new_session'
  | 'new_message'
  | 'visitor_typing'
  | 'visitor_disconnected'
  | 'connect'
  | 'disconnect';

export interface AdminChatReceivedEvent {
  type: AdminChatEventType;
  data: unknown;
  at: string; // ISO timestamp
}

type EventCallback = (event: AdminChatReceivedEvent) => void;

// ============================================
// Service state
// ============================================

const receivedEvents: AdminChatReceivedEvent[] = [];
const maxStoredEvents = 500;
const subscribers = new Set<EventCallback>();

// ============================================
// Public API
// ============================================

/**
 * Registers a socket event. Must be called by listeners (e.g. useAdminChat)
 * when an event arrives, so the service keeps the list and notifies subscribers.
 */
export const recordEvent = (
  type: AdminChatEventType,
  data: unknown
): void => {
  const event: AdminChatReceivedEvent = {
    type,
    data,
    at: new Date().toISOString(),
  };
  receivedEvents.push(event);
  if (receivedEvents.length > maxStoredEvents) {
    receivedEvents.shift();
  }
  subscribers.forEach((cb) => cb(event));
};

/**
 * Returns all received socket events.
 * Use on admin page to show real-time event history.
 */
export const getReceivedEvents = (): AdminChatReceivedEvent[] => [
  ...receivedEvents,
];

/**
 * Subscribes to each new event in real time.
 * While connection is active, admin page receives events here.
 * @returns Unsubscribe function (e.g. in useEffect cleanup)
 */
export const subscribeToAdminEvents = (
  callback: EventCallback
): (() => void) => {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
};

/**
 * Clears the stored events list (optional).
 */
export const clearReceivedEvents = (): void => {
  receivedEvents.length = 0;
};

/**
 * Returns whether the admin socket is connected.
 */
export const isAdminChatConnected = (): boolean =>
  socketService.isAdminConnected();

/**
 * Ações do admin (delegam ao socketService).
 */
export const adminChatActions = {
  joinSession: (sessionId: string) => socketService.joinSession(sessionId),
  sendMessage: (sessionId: string, content: string) =>
    socketService.adminSendMessage(sessionId, content),
  sendTyping: (sessionId: string) => socketService.adminSendTyping(sessionId),
  markRead: (sessionId: string) => socketService.markRead(sessionId),
  closeSession: (sessionId: string) => socketService.closeSession(sessionId),
};
