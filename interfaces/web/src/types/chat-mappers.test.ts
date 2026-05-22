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

/* ***********************************************************************************************
 *************************************** parseSocketSenderType ***********************************
 *********************************************************************************************** */

describe('parseSocketSenderType', () => {
  it('returns Visitor for "visitor"', () => {
    expect(parseSocketSenderType('visitor')).toBe(ChatMessageSenderType.Visitor);
  });

  it('returns Admin for "admin"', () => {
    expect(parseSocketSenderType('admin')).toBe(ChatMessageSenderType.Admin);
  });

  it('returns null for unknown values', () => {
    expect(parseSocketSenderType('unknown')).toBeNull();
    expect(parseSocketSenderType('')).toBeNull();
    expect(parseSocketSenderType('system')).toBeNull();
  });
});

/* ***********************************************************************************************
 *************************************** mapChatApiDateToIso *************************************
 *********************************************************************************************** */

describe('mapChatApiDateToIso', () => {
  it('passes through ISO strings unchanged', () => {
    const iso = '2024-01-01T12:00:00Z';
    expect(mapChatApiDateToIso(iso)).toBe(iso);
  });

  it('calls toISOString on date-like objects', () => {
    const obj = { toISOString: () => '2024-06-01T00:00:00.000Z' };
    expect(mapChatApiDateToIso(obj)).toBe('2024-06-01T00:00:00.000Z');
  });

  it('returns empty string when object has no toISOString', () => {
    expect(mapChatApiDateToIso({})).toBe('');
  });
});

/* ***********************************************************************************************
 *************************************** mapApiSessionToAdminChatSession ************************
 *********************************************************************************************** */

describe('mapApiSessionToAdminChatSession', () => {
  const dto: ChatApiSessionDto = {
    session_id: 'sess-abc',
    visitor_name: 'Alice',
    visitor_company: 'ACME',
    started_at: '2024-01-01T10:00:00Z',
    unread_count: 3,
    last_message: 'Hello',
  };

  it('maps all fields correctly', () => {
    const result = mapApiSessionToAdminChatSession(dto);
    expect(result.session_id).toBe('sess-abc');
    expect(result.visitor_name).toBe('Alice');
    expect(result.visitor_company).toBe('ACME');
    expect(result.unread_count).toBe(3);
    expect(result.last_message).toBe('Hello');
    expect(result.is_typing).toBe(false);
  });

  it('defaults unread_count to 0 when absent', () => {
    const result = mapApiSessionToAdminChatSession({
      ...dto,
      unread_count: undefined,
    });
    expect(result.unread_count).toBe(0);
  });
});

/* ***********************************************************************************************
 *************************************** mapApiVisitorMessageToChatMessage **********************
 *********************************************************************************************** */

describe('mapApiVisitorMessageToChatMessage', () => {
  const dto: ChatApiVisitorMessageDto = {
    id: 42,
    content: 'Hi there',
    sender_type: 'visitor',
    is_read: false,
    created_at: '2024-01-01T12:00:00Z',
  };

  it('maps visitor message correctly', () => {
    const result = mapApiVisitorMessageToChatMessage(dto);
    expect(result).not.toBeNull();
    expect(result!.id).toBe(42);
    expect(result!.content).toBe('Hi there');
    expect(result!.sender_type).toBe(ChatMessageSenderType.Visitor);
    expect(result!.is_read).toBe(false);
  });

  it('maps admin message correctly', () => {
    const result = mapApiVisitorMessageToChatMessage({
      ...dto,
      sender_type: 'admin',
    });
    expect(result!.sender_type).toBe(ChatMessageSenderType.Admin);
  });

  it('returns null for unknown sender_type', () => {
    const result = mapApiVisitorMessageToChatMessage({
      ...dto,
      sender_type: 'system',
    });
    expect(result).toBeNull();
  });
});
