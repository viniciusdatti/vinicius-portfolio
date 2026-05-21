/**
 * Admin chat UI models and store data shape.
 */

// Types
import type { ChatMessage } from './index';

/** Sidebar session row in admin Chat page. */
export interface AdminChatSession {
  session_id: string;
  visitor_name: string;
  visitor_company?: string;
  started_at: string;
  unread_count: number;
  last_message?: string;
  is_typing: boolean;
}

/** Message in the active conversation panel. */
export interface AdminChatMessage extends ChatMessage {
  session_id: string;
}

/** Admin chat store state (data fields only). */
export interface AdminChatStoreData {
  sessions: AdminChatSession[];
  activeSessionId: string | null;
  activeMessages: AdminChatMessage[];
  isConnected: boolean;
}

export const initialAdminChatStoreData: AdminChatStoreData = {
  sessions: [],
  activeSessionId: null,
  activeMessages: [],
  isConnected: false,
};
