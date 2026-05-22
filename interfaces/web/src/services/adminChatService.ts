/**
 * Admin chat event log — records socket events for the admin debug panel.
 */

import { useAdminChatStore } from '../store/adminChatStore';
import { socketService } from '../utils/socket';

// Types
import type {
  AdminChatEventLogData,
  AdminChatReceivedEvent,
} from '../types/chat-socket';
import { AdminChatEventType } from '../types/chat-socket';

type EventCallback = (event: AdminChatReceivedEvent) => void;

const receivedEvents: AdminChatReceivedEvent[] = [];
const maxStoredEvents: number = 500;
const subscribers: Set<EventCallback> = new Set();

/**
 * Registers a socket event for the admin event log and notifies subscribers.
 */
export const recordEvent = (
  type: AdminChatEventType,
  data: AdminChatEventLogData,
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
  subscribers.forEach((cb: EventCallback) => cb(event));
};

/**
 * Returns all received socket events.
 */
export const getReceivedEvents = (): AdminChatReceivedEvent[] => [
  ...receivedEvents,
];

/**
 * Subscribes to each new event in real time.
 */
export const subscribeToAdminEvents = (
  callback: EventCallback,
): (() => void) => {
  subscribers.add(callback);
  return (): boolean => subscribers.delete(callback);
};

/**
 * Clears the stored events list.
 */
export const clearReceivedEvents = (): void => {
  receivedEvents.length = 0;
};

/**
 * Returns whether the admin chat socket is connected (from store).
 */
export const isAdminChatConnected = (): boolean => useAdminChatStore.getState().isConnected;

/**
 * Admin socket actions (transport only).
 */
export const adminChatActions = {
  joinSession: (sessionId: string): void => socketService.joinSession(sessionId),
  sendMessage: (sessionId: string, content: string): void => (
    socketService.adminSendMessage(sessionId, content)
  ),
  sendTyping: (sessionId: string): void => socketService.adminSendTyping(sessionId),
  markRead: (sessionId: string): void => socketService.markRead(sessionId),
  closeSession: (sessionId: string): void => socketService.closeSession(sessionId),
};
