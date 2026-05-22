/**
 * Maps chat API DTOs to domain/UI models.
 */

// Types
import type { AdminChatMessage, AdminChatSession } from '@/types/admin-chat';
import type {
  ChatApiDateField,
  ChatApiMessageDto,
  ChatApiSessionDto,
  ChatApiVisitorMessageDto,
} from '@/types/chat-api';
import type { ChatMessage } from '@/types/chat-domain';
import { ChatMessageSenderType } from '@/types/chat-domain';

/**
 * Normalizes API date fields to ISO strings.
 */
export const mapChatApiDateToIso = (value: ChatApiDateField): string => {
  if (typeof value === 'string') {
    return value;
  }
  return value.toISOString?.() ?? '';
};

/**
 * Parses socket sender_type string into enum (server contract).
 */
export const parseSocketSenderType = (
  value: string,
): ChatMessageSenderType | null => {
  if (value === ChatMessageSenderType.Visitor) {
    return ChatMessageSenderType.Visitor;
  }
  if (value === ChatMessageSenderType.Admin) {
    return ChatMessageSenderType.Admin;
  }
  return null;
};

/**
 * Maps admin sessions list DTO to sidebar models.
 */
export const mapApiSessionToAdminChatSession = (
  dto: ChatApiSessionDto,
): AdminChatSession => ({
  session_id: dto.session_id,
  visitor_name: dto.visitor_name,
  visitor_company: dto.visitor_company,
  started_at: dto.started_at,
  unread_count: dto.unread_count ?? 0,
  last_message: dto.last_message,
  is_typing: false,
});

/**
 * Maps admin message DTO to panel message model.
 */
export const mapApiMessageToAdminChatMessage = (
  dto: ChatApiMessageDto,
): AdminChatMessage | null => {
  const senderType: ChatMessageSenderType | null = parseSocketSenderType(
    dto.sender_type,
  );
  if (!senderType) {
    return null;
  }
  return {
    id: dto.id,
    session_id: dto.session_id,
    content: dto.content,
    sender_type: senderType,
    is_read: dto.is_read,
    created_at: mapChatApiDateToIso(dto.created_at),
  };
};

/**
 * Maps public visitor history DTO to visitor ChatMessage.
 */
export const mapApiVisitorMessageToChatMessage = (
  dto: ChatApiVisitorMessageDto,
): ChatMessage | null => {
  const senderType: ChatMessageSenderType | null = parseSocketSenderType(
    dto.sender_type,
  );
  if (!senderType) {
    return null;
  }
  return {
    id: dto.id,
    content: dto.content,
    sender_type: senderType,
    is_read: dto.is_read,
    created_at: dto.created_at,
  };
};
