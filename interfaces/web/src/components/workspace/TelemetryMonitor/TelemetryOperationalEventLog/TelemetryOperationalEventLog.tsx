// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Styles
import {
  EventLogHeader,
  EventLogLine,
  EventLogPrefix,
  EventLogRoot,
  EventLogScroll,
  EventLogTick,
  EventLogTime,
  EventLogTitle,
} from '../TelemetryMonitor.style';

// Types
import {
  TELEMETRY_EVENT_LOG_MAX,
  TelemetryEventType,
} from '../../../../types/telemetry';
import { OperationalEventLogProps } from '../TelemetryMonitor.types';

// TelemetryMonitor
import { TelemetryEventLogLine } from '../TelemetryEventLogLine';
import { TelemetryValueFlash } from '../TelemetryValueFlash';

const logPrefix = (type: TelemetryEventType): string => {
  if (type === TelemetryEventType.Critical) return 'CRT';
  if (type === TelemetryEventType.Warn) return 'WRN';
  return 'INF';
};

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
          <EventLogLine $type={TelemetryEventType.Info}>
            <EventLogTime>—</EventLogTime>
            <EventLogPrefix $type={TelemetryEventType.Info}>[INF]</EventLogPrefix>
            <span>{t('liveLab.monitor.noEvents')}</span>
          </EventLogLine>
        )}
      </EventLogScroll>
    </EventLogRoot>
  );
};
