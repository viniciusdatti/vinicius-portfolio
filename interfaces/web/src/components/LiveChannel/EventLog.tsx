// Core
import React, { useEffect, useRef } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { SystemEvent } from '@/types/system-events';
import { SystemEventLevel } from '@/types/system-events';

// Components
import { useSystemEventStore } from '@/store';
import {
  EventLogPanel,
  EventLogHeader,
  EventLogList,
  EventLogItem,
  EventLogTime,
  EventLogMessage,
} from '@/components/LiveChannel/EventLog.style';

/* ***********************************************************************************************
 ****************************************** METHODS ***********************************************
 *********************************************************************************************** */

const levelFromEvent = (
  level: SystemEventLevel,
): 'info' | 'success' | 'warning' | 'error' => {
  if (level === SystemEventLevel.Success) {
    return 'success';
  }
  if (level === SystemEventLevel.Warning) {
    return 'warning';
  }
  if (level === SystemEventLevel.Error) {
    return 'error';
  }
  return 'info';
};

const formatTime = (iso: string): string => {
  const date: Date = new Date(iso);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export function EventLog(): React.ReactElement {
  const { t } = useTranslation();
  const events: SystemEvent[] = useSystemEventStore((s) => s.events);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [events]);

  return (
    <EventLogPanel aria-label={t('workspace.channel.events')}>
      <EventLogHeader>{t('workspace.channel.events')}</EventLogHeader>
      <EventLogList ref={listRef}>
        {events.map((event: SystemEvent) => (
          <EventLogItem key={event.id} $level={levelFromEvent(event.level)}>
            <EventLogTime>{formatTime(event.at)}</EventLogTime>
            <EventLogMessage>
              {t(event.messageKey, event.messageParams)}
            </EventLogMessage>
          </EventLogItem>
        ))}
      </EventLogList>
    </EventLogPanel>
  );
}
