/**
 * Visitor chat REST integration (public resume endpoint).
 */

// Components
import { env } from '../config/env';

// Types
import type { ChatMessage } from '../types';
import type { ChatApiVisitorMessageDto } from '../types/chat-api';
import { mapApiVisitorMessageToChatMessage } from '../types/chat-mappers';

const API_BASE: string = env.apiUrl;

/**
 * Loads message history for an active visitor session (no auth).
 */
export const fetchVisitorSessionMessages = async (
  sessionId: string
): Promise<ChatMessage[]> => {
  const res: Response = await fetch(
    `${API_BASE}/chat/sessions/${sessionId}/visitor-messages`
  );
  if (!res.ok) {
    return [];
  }
  const data: ChatApiVisitorMessageDto[] = await res.json();
  return data
    .map(mapApiVisitorMessageToChatMessage)
    .filter((m): m is ChatMessage => m !== null);
};
