// Core
import {
  describe, it, expect, beforeEach,
} from 'vitest';

// =================================================================================================
// ============================================ PLUGINS ============================================
// =================================================================================================
import { buildFakeChatMessage } from '@/plugins/testUtils';

// Store
import { useChatStore } from '@/store/chatStore';

// Types
import type { ChatMessage } from '@/types';

// =================================================================================================
// ============================================= SETUP =============================================
// =================================================================================================

beforeEach((): void => {
  useChatStore.getState().reset();
});

// =================================================================================================
// ======================================== TEST EXECUTION =========================================
// =================================================================================================

describe('chatStore', (): void => {
  // STATE: initial *******************************

  describe('initial state', (): void => {
    it('should start with correct defaults', (): void => {
      const state = useChatStore.getState();
      expect(state.sessionId).toBeNull();
      expect(state.messages).toHaveLength(0);
      expect(state.isConnected).toBe(false);
      expect(state.isAdminOnline).toBe(false);
      expect(state.isTyping).toBe(false);
    });
  });

  // METHOD: setSessionId *******************************

  describe('setSessionId', (): void => {
    it('should set the session ID', (): void => {
      useChatStore.getState().setSessionId('sess-123');
      expect(useChatStore.getState().sessionId).toBe('sess-123');
    });
  });

  // METHOD: addMessage *******************************

  describe('addMessage', (): void => {
    it('should append messages to the list', (): void => {
      const msg: ChatMessage = buildFakeChatMessage({ id: 1 });
      useChatStore.getState().addMessage(msg);
      expect(useChatStore.getState().messages).toHaveLength(1);
      expect(useChatStore.getState().messages[0].content).toBe(msg.content);
    });

    it('should preserve order of multiple messages', (): void => {
      const first: ChatMessage = buildFakeChatMessage({ id: 1, content: 'first' });
      const second: ChatMessage = buildFakeChatMessage({ id: 2, content: 'second' });
      useChatStore.getState().addMessage(first);
      useChatStore.getState().addMessage(second);
      const { messages } = useChatStore.getState();
      expect(messages[0].content).toBe('first');
      expect(messages[1].content).toBe('second');
    });
  });

  // METHOD: setMessages *******************************

  describe('setMessages', (): void => {
    it('should replace the messages array', (): void => {
      useChatStore.getState().addMessage(buildFakeChatMessage({ id: 1 }));
      const newMessages: ChatMessage[] = [
        buildFakeChatMessage({ id: 10, content: 'replaced' }),
      ];
      useChatStore.getState().setMessages(newMessages);
      expect(useChatStore.getState().messages).toHaveLength(1);
      expect(useChatStore.getState().messages[0].id).toBe(10);
    });
  });

  // METHOD: connection flags *******************************

  describe('setConnected / setAdminOnline / setTyping', (): void => {
    it('should update connection state', (): void => {
      useChatStore.getState().setConnected(true);
      expect(useChatStore.getState().isConnected).toBe(true);
      useChatStore.getState().setConnected(false);
      expect(useChatStore.getState().isConnected).toBe(false);
    });

    it('should update admin online state', (): void => {
      useChatStore.getState().setAdminOnline(true);
      expect(useChatStore.getState().isAdminOnline).toBe(true);
    });

    it('should update typing state', (): void => {
      useChatStore.getState().setTyping(true);
      expect(useChatStore.getState().isTyping).toBe(true);
    });
  });

  // METHOD: toggleSound *******************************

  describe('toggleSound', (): void => {
    it('should toggle soundEnabled', (): void => {
      const initial: boolean = useChatStore.getState().soundEnabled;
      useChatStore.getState().toggleSound();
      expect(useChatStore.getState().soundEnabled).toBe(!initial);
      useChatStore.getState().toggleSound();
      expect(useChatStore.getState().soundEnabled).toBe(initial);
    });
  });

  // METHOD: reset *******************************

  describe('reset', (): void => {
    it('should clear session, messages and connection state', (): void => {
      useChatStore.getState().setSessionId('sess-abc');
      useChatStore.getState().addMessage(buildFakeChatMessage());
      useChatStore.getState().setConnected(true);
      useChatStore.getState().reset();

      const state = useChatStore.getState();
      expect(state.sessionId).toBeNull();
      expect(state.messages).toHaveLength(0);
      expect(state.isConnected).toBe(false);
    });
  });
});
