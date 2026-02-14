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
 * Registra um evento recebido via socket. Deve ser chamado pelos
 * listeners (ex.: useAdminChat) quando um evento chega, para que
 * o serviço mantenha a lista e notifique inscritos.
 */
export function recordEvent(type: AdminChatEventType, data: unknown): void {
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
}

/**
 * Lista todos os dados/eventos recebidos via socket.
 * Use na admin page para exibir o histórico de eventos em tempo real.
 */
export function getReceivedEvents(): AdminChatReceivedEvent[] {
  return [...receivedEvents];
}

/**
 * Inscreve para receber cada novo evento em tempo real.
 * Enquanto a conexão estiver ativa, a admin page recebe os eventos aqui.
 * @returns função para cancelar a inscrição (ex.: no cleanup do useEffect)
 */
export function subscribeToAdminEvents(callback: EventCallback): () => void {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

/**
 * Limpa a lista de eventos armazenados (opcional).
 */
export function clearReceivedEvents(): void {
  receivedEvents.length = 0;
}

/**
 * Indica se o socket do admin está conectado.
 */
export function isAdminChatConnected(): boolean {
  return socketService.isAdminConnected();
}

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
