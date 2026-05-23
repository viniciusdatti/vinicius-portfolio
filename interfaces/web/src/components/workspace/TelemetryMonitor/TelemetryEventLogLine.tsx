/**
 * @fileoverview Single operational log line — typewriter reveal for the latest live entry.
 */

// Core
import React from 'react';

// Hooks
import { useTypewriterReveal } from '@/hooks/useTypewriterReveal';

// Types
import type { TelemetryEventLogEntry } from '@/types/telemetry';

// Components
import {
  EventLogLine,
  EventLogPrefix,
  EventLogTime,
} from '@/components/workspace/TelemetryMonitor/TelemetryMonitor.style';
import { formatClockTime } from '@/lib/i18nDisplay';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

interface TelemetryEventLogLineProps {
  entry: TelemetryEventLogEntry;
  index: number;
  connected: boolean;
  language: string;
  logPrefix: (type: TelemetryEventLogEntry['type']) => string;
}

// =================================================================================================
// ========================================== COMPONENT ============================================
// =================================================================================================

export const TelemetryEventLogLine: React.FC<TelemetryEventLogLineProps> = ({
  entry,
  index,
  connected,
  language,
  logPrefix,
}): React.ReactElement => {
  const isLatest: boolean = index === 0 && connected;
  const { displayedText } = useTypewriterReveal({
    text: entry.message,
    enabled: isLatest,
    speedMs: 16,
  });

  return (
    <EventLogLine
      $type={entry.type}
      $isLatest={isLatest}
    >
      <EventLogTime>{formatClockTime(entry.ts, language)}</EventLogTime>
      <EventLogPrefix $type={entry.type}>
        [
        {logPrefix(entry.type)}
        ]
      </EventLogPrefix>
      <span>{displayedText}</span>
    </EventLogLine>
  );
};
