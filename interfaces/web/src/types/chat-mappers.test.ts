// Core
import { describe, it, expect } from 'vitest';

// Utils
import {
  mapChatApiDateToIso,
  mapApiSessionToAdminChatSession,
  mapApiVisitorMessageToChatMessage,
  parseSocketSenderType,
} from './chat-mappers';

// Types
import { ChatMessageSenderType } from './index';
import type { ChatApiSessionDto, ChatApiVisitorMessageDto } from './chat-api';

/* *************** TEST SUPPORT VARS *************** */

const sessionDto: ChatApiSessionDto = {
  session_id: 'sess-abc',
  visitor_name: 'Alice',
  visitor_company: 'ACME',
  started_at: '2024-01-01T10:00:00Z',
  unread_count: 3,
  last_message: 'Hello',
};

const visitorMessageDto: ChatApiVisitorMessageDto = {
  id: 42,
  content: 'Hi there',
  sender_type: 'visitor',
  is_read: false,
  created_at: '2024-01-01T12:00:00Z',
};

/* *************** TEST EXECUTION *************** */

describe('chat-mappers', (): void => {
  // METHOD: parseSocketSenderType *******************************

  describe('parseSocketSenderType', (): void => {
    it('should return Visitor for "visitor"', (): void => {
      expect(parseSocketSenderType('visitor')).toBe(ChatMessageSenderType.Visitor);
    });

    it('should return Admin for "admin"', (): void => {
      expect(parseSocketSenderType('admin')).toBe(ChatMessageSenderType.Admin);
    });

    it('should return null for unknown values', (): void => {
      expect(parseSocketSenderType('unknown')).toBeNull();
      expect(parseSocketSenderType('')).toBeNull();
      expect(parseSocketSenderType('system')).toBeNull();
    });
  });

  // METHOD: mapChatApiDateToIso *******************************

  describe('mapChatApiDateToIso', (): void => {
    it('should pass through ISO strings unchanged', (): void => {
      const iso: string = '2024-01-01T12:00:00Z';
      expect(mapChatApiDateToIso(iso)).toBe(iso);
    });

    it('should call toISOString on date-like objects', (): void => {
      const obj = { toISOString: (): string => '2024-06-01T00:00:00.000Z' };
      expect(mapChatApiDateToIso(obj)).toBe('2024-06-01T00:00:00.000Z');
    });

    it('should return empty string when object has no toISOString', (): void => {
      expect(mapChatApiDateToIso({})).toBe('');
    });
  });

  // METHOD: mapApiSessionToAdminChatSession *******************************

  describe('mapApiSessionToAdminChatSession', (): void => {
    it('should map all fields correctly', (): void => {
      const result = mapApiSessionToAdminChatSession(sessionDto);
      expect(result.session_id).toBe('sess-abc');
      expect(result.visitor_name).toBe('Alice');
      expect(result.visitor_company).toBe('ACME');
      expect(result.unread_count).toBe(3);
      expect(result.last_message).toBe('Hello');
      expect(result.is_typing).toBe(false);
    });

    it('should default unread_count to 0 when absent', (): void => {
      const result = mapApiSessionToAdminChatSession({
        ...sessionDto,
        unread_count: undefined,
      });
      expect(result.unread_count).toBe(0);
    });
  });

  // METHOD: mapApiVisitorMessageToChatMessage *******************************

  describe('mapApiVisitorMessageToChatMessage', (): void => {
    it('should map visitor message correctly', (): void => {
      const result = mapApiVisitorMessageToChatMessage(visitorMessageDto);
      expect(result).not.toBeNull();
      if (result === null) {
        return;
      }
      expect(result.id).toBe(42);
      expect(result.content).toBe('Hi there');
      expect(result.sender_type).toBe(ChatMessageSenderType.Visitor);
      expect(result.is_read).toBe(false);
    });

    it('should map admin message correctly', (): void => {
      const result = mapApiVisitorMessageToChatMessage({
        ...visitorMessageDto,
        sender_type: 'admin',
      });
      expect(result).not.toBeNull();
      if (result === null) {
        return;
      }
      expect(result.sender_type).toBe(ChatMessageSenderType.Admin);
    });

    it('should return null for unknown sender_type', (): void => {
      const result = mapApiVisitorMessageToChatMessage({
        ...visitorMessageDto,
        sender_type: 'system',
      });
      expect(result).toBeNull();
    });
  });
});
