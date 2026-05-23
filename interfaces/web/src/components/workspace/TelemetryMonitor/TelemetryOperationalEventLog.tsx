/**
 * @fileoverview Scrollable operational event log for the telemetry monitor.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import {
  TELEMETRY_EVENT_LOG_MAX,
} from '@/types/telemetry';
import type { OperationalEventLogProps } from '@/components/Workspace/TelemetryMonitor/TelemetryMonitor.types';

// Components
import { formatClockTime } from '@/lib/i18nDisplay';
import { TelemetryValueFlash } from '@/components/Workspace/TelemetryMonitor/TelemetryValueFlash';
import {
  EventLogHeader,
  EventLogLine,
  EventLogPrefix,
  EventLogRoot,
  EventLogScroll,
  EventLogTick,
  EventLogTime,
  EventLogTitle,
} from '@/components/Workspace/TelemetryMonitor/TelemetryMonitor.style';

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

const logPrefix = (type: 'info' | 'warn' | 'critical'): string => {
  if (type === 'critical') return 'CRT';
  if (type === 'warn') return 'WRN';
  return 'INF';
};

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

export const TelemetryOperationalEventLog: React.FC<OperationalEventLogProps> = ({
  logRef,
  connected,
  eventLog,
  tickCount,
}): React.ReactElement => {
  const { t, i18n } = useTranslation();

  return (
    <EventLogRoot aria-label={t('liveLab.monitor.eventLog')}>
      <EventLogHeader>
        <EventLogTitle>
          {t('liveLab.monitor.eventLog')}
        </EventLogTitle>
        <EventLogTick>
          {eventLog.length}
          /
          {TELEMETRY_EVENT_LOG_MAX}
          {' · '}
          {t('liveLab.monitor.tick')}
          {' '}
          <TelemetryValueFlash cellId="tick-counter" valueKey={tickCount}>
            #
            {tickCount}
          </TelemetryValueFlash>
        </EventLogTick>
      </EventLogHeader>
      <EventLogScroll
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {eventLog.map((entry, idx) => (
          <EventLogLine
            key={`${entry.ts}-${entry.message}`}
            $type={entry.type}
            $isLatest={idx === 0 && connected}
          >
            <EventLogTime>{formatClockTime(entry.ts, i18n.language)}</EventLogTime>
            <EventLogPrefix $type={entry.type}>
              [
              {logPrefix(entry.type)}
              ]
            </EventLogPrefix>
            <span>{entry.message}</span>
          </EventLogLine>
        ))}
        {eventLog.length === 0 && (
          <EventLogLine $type="info">
            <EventLogTime>—</EventLogTime>
            <EventLogPrefix $type="info">[INF]</EventLogPrefix>
            <span>{t('liveLab.monitor.noEvents')}</span>
          </EventLogLine>
        )}
      </EventLogScroll>
    </EventLogRoot>
  );
};
