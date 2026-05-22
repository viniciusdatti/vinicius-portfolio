// Core
import { describe, it, expect, beforeEach } from 'vitest';

// Store
import { useChatStore } from './chatStore';

// Types
import type { ChatMessage } from '../types';

// Fixtures
import { mockChatMessage } from '../test/fixtures';

/* ***********************************************************************************************
 *************************************** Setup ***************************************************
 *********************************************************************************************** */

beforeEach((): void => {
  useChatStore.getState().reset();
});

/* ***********************************************************************************************
 *************************************** Tests ***************************************************
 *********************************************************************************************** */

describe('chatStore', () => {
  describe('initial state', () => {
    it('starts with correct defaults', (): void => {
      const state = useChatStore.getState();
      expect(state.sessionId).toBeNull();
      expect(state.messages).toHaveLength(0);
      expect(state.isConnected).toBe(false);
      expect(state.isAdminOnline).toBe(false);
      expect(state.isTyping).toBe(false);
    });
  });

  describe('setSessionId', () => {
    it('sets the session ID', (): void => {
      useChatStore.getState().setSessionId('sess-123');
      expect(useChatStore.getState().sessionId).toBe('sess-123');
    });
  });

  describe('addMessage', () => {
    it('appends messages to the list', (): void => {
      const msg: ChatMessage = mockChatMessage({ id: 1 });
      useChatStore.getState().addMessage(msg);
      expect(useChatStore.getState().messages).toHaveLength(1);
      expect(useChatStore.getState().messages[0].content).toBe(msg.content);
    });

    it('preserves order of multiple messages', (): void => {
      const m1: ChatMessage = mockChatMessage({ id: 1, content: 'first' });
      const m2: ChatMessage = mockChatMessage({ id: 2, content: 'second' });
      useChatStore.getState().addMessage(m1);
      useChatStore.getState().addMessage(m2);
      const { messages } = useChatStore.getState();
      expect(messages[0].content).toBe('first');
      expect(messages[1].content).toBe('second');
    });
  });

  describe('setMessages', () => {
    it('replaces the messages array', (): void => {
      useChatStore.getState().addMessage(mockChatMessage({ id: 1 }));
      const newMessages: ChatMessage[] = [
        mockChatMessage({ id: 10, content: 'replaced' }),
      ];
      useChatStore.getState().setMessages(newMessages);
      expect(useChatStore.getState().messages).toHaveLength(1);
      expect(useChatStore.getState().messages[0].id).toBe(10);
    });
  });

  describe('setConnected / setAdminOnline / setTyping', () => {
    it('updates connection state', (): void => {
      useChatStore.getState().setConnected(true);
      expect(useChatStore.getState().isConnected).toBe(true);
      useChatStore.getState().setConnected(false);
      expect(useChatStore.getState().isConnected).toBe(false);
    });

    it('updates admin online state', (): void => {
      useChatStore.getState().setAdminOnline(true);
      expect(useChatStore.getState().isAdminOnline).toBe(true);
    });

    it('updates typing state', (): void => {
      useChatStore.getState().setTyping(true);
      expect(useChatStore.getState().isTyping).toBe(true);
    });
  });

  describe('toggleSound', () => {
    it('toggles soundEnabled', (): void => {
      const initial: boolean = useChatStore.getState().soundEnabled;
      useChatStore.getState().toggleSound();
      expect(useChatStore.getState().soundEnabled).toBe(!initial);
      useChatStore.getState().toggleSound();
      expect(useChatStore.getState().soundEnabled).toBe(initial);
    });
  });

  describe('reset', () => {
    it('clears session, messages and connection state', (): void => {
      useChatStore.getState().setSessionId('sess-abc');
      useChatStore.getState().addMessage(mockChatMessage());
      useChatStore.getState().setConnected(true);
      useChatStore.getState().reset();

      const state = useChatStore.getState();
      expect(state.sessionId).toBeNull();
      expect(state.messages).toHaveLength(0);
      expect(state.isConnected).toBe(false);
    });
  });
});
