/**
 * Admin chat REST integration.
 */

// Components
import { env } from '../config/env';

// Types
import type { AdminChatMessage, AdminChatSession } from '../types/admin-chat';
import type { ChatApiMessageDto, ChatApiSessionDto } from '../types/chat-api';
import {
  mapApiMessageToAdminChatMessage,
  mapApiSessionToAdminChatSession,
} from '../types/chat-mappers';

const API_BASE: string = env.apiUrl;

/**
 * Fetches all chat sessions for the authenticated admin.
 */
export const fetchAdminChatSessions = async (
  accessToken: string,
): Promise<AdminChatSession[]> => {
  const res: Response = await fetch(`${API_BASE}/chat/sessions`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    return [];
  }
  const data: ChatApiSessionDto[] = await res.json();
  return data.map(mapApiSessionToAdminChatSession);
};

/**
 * Fetches message history for a session.
 */
export const fetchAdminSessionMessages = async (
  accessToken: string,
  sessionId: string,
): Promise<AdminChatMessage[]> => {
  const res: Response = await fetch(
    `${API_BASE}/chat/sessions/${sessionId}/messages`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!res.ok) {
    return [];
  }
  const data: ChatApiMessageDto[] = await res.json();
  return data
    .map(mapApiMessageToAdminChatMessage)
    .filter((m): m is AdminChatMessage => m !== null);
};
