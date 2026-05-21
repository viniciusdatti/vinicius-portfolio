/**
 * Hook for admin page to consume received socket events list
 * and receive new events in real time while connection is active.
 */

// Core
import { useEffect, useState } from 'react';

// Types
import type { AdminChatReceivedEvent } from '../types/chat-socket';

// Components
import {
  getReceivedEvents,
  subscribeToAdminEvents,
} from '../services/adminChatService';

/**
 * Returns the list of received events and keeps it updated when
 * new events arrive (active connection).
 */
export const useAdminChatEvents = (): AdminChatReceivedEvent[] => {
  const [events, setEvents] = useState<AdminChatReceivedEvent[]>(() =>
    getReceivedEvents()
  );

  useEffect(() => {
    setEvents(getReceivedEvents());
    const unsubscribe = subscribeToAdminEvents(() => {
      setEvents(getReceivedEvents());
    });
    return unsubscribe;
  }, []);

  return events;
};
