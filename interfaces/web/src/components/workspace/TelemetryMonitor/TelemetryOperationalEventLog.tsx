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
import type { OperationalEventLogProps } from '@/components/workspace/TelemetryMonitor/TelemetryMonitor.types';

// Components
import { TelemetryEventLogLine } from '@/components/workspace/TelemetryMonitor/TelemetryEventLogLine';
import { TelemetryValueFlash } from '@/components/workspace/TelemetryMonitor/TelemetryValueFlash';
import {
  EventLogHeader,
  EventLogLine,
  EventLogPrefix,
  EventLogRoot,
  EventLogScroll,
  EventLogTick,
  EventLogTime,
  EventLogTitle,
} from '@/components/workspace/TelemetryMonitor/TelemetryMonitor.style';

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
          <TelemetryEventLogLine
            key={`${entry.ts}-${entry.message}`}
            entry={entry}
            index={idx}
            connected={connected}
            language={i18n.language}
            logPrefix={logPrefix}
          />
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
