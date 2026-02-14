/**
 * Hook para a admin page consumir a lista de eventos recebidos via socket
 * e receber novos eventos em tempo real enquanto a conexão estiver ativa.
 */

import { useEffect, useState } from 'react';
import {
  getReceivedEvents,
  subscribeToAdminEvents,
  type AdminChatReceivedEvent,
} from '../services/adminChatService';

/**
 * Retorna a lista de eventos recebidos e mantém atualizada quando
 * chegam novos eventos (conexão ativa).
 */
export function useAdminChatEvents(): AdminChatReceivedEvent[] {
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
}
