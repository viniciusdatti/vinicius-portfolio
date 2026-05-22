/**
 * Visitor chat domain models and store data shape.
 */

// Types
import type { ChatMessage } from '@/types/chat-domain';

/** Visitor chat store state (data fields only). */
export interface VisitorChatStoreData {
  sessionId: string | null;
  messages: ChatMessage[];
  isConnected: boolean;
  isAdminOnline: boolean;
  isTyping: boolean;
  soundEnabled: boolean;
}

export const initialVisitorChatStoreData: VisitorChatStoreData = {
  sessionId: null,
  messages: [],
  isConnected: false,
  isAdminOnline: false,
  isTyping: false,
  soundEnabled: false,
};
