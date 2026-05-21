/**
 * Chat Socket.IO event payloads and realtime event log types.
 */

/** Visitor namespace: admin presence broadcast. */
export interface ChatSocketAdminStatusPayload {
  is_online: boolean;
  admin_count: number;
}

/** Visitor namespace: session created. */
export interface ChatSocketSessionStartedPayload {
  session_id: string;
  visitor_name: string;
}

/** Visitor/admin namespaces: message delivered over the wire. */
export interface ChatSocketMessagePayload {
  id: number;
  session_id?: string;
  content: string;
  sender_type: string;
  is_read?: boolean;
  created_at: string;
}

/** Admin namespace: new visitor session. */
export interface ChatSocketNewSessionPayload {
  session_id: string;
  visitor_name: string;
  visitor_company?: string;
  started_at: string;
  unread_count: number;
}

/** Admin namespace: new message (includes session_id). */
export interface ChatSocketNewMessagePayload {
  id: number;
  session_id: string;
  content: string;
  sender_type: string;
  is_read?: boolean;
  created_at: string;
  unread_count: number;
}

/** Admin namespace: session counters synced from server. */
export interface ChatSocketSessionUpdatedPayload {
  session_id: string;
  unread_count: number;
}

/** Events scoped by session_id (typing, disconnect). */
export interface ChatSocketSessionScopePayload {
  session_id: string;
}

/** Payload stored in admin event log. */
export type AdminChatEventLogData =
  | ChatSocketNewSessionPayload
  | ChatSocketNewMessagePayload
  | ChatSocketSessionScopePayload
  | ChatSocketSessionUpdatedPayload
  | Record<string, never>;

export enum AdminChatEventType {
  NewSession = 'new_session',
  NewMessage = 'new_message',
  SessionUpdated = 'session_updated',
  VisitorTyping = 'visitor_typing',
  VisitorDisconnected = 'visitor_disconnected',
  Connect = 'connect',
  Disconnect = 'disconnect',
}

export interface AdminChatReceivedEvent {
  type: AdminChatEventType;
  data: AdminChatEventLogData;
  at: string;
}
