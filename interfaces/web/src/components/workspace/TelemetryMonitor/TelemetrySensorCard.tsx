/**
 * @fileoverview Single sensor card with sparkline and threshold bar.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { SensorReading } from '@/types/telemetry';
import { SensorStatus } from '@/types/telemetry';
import type { SensorProps } from '@/components/workspace/TelemetryMonitor/TelemetryMonitor.types';

// Components
import { resolveI18nKeyOrFallback } from '@/lib/i18nDisplay';
import { resolveTelemetrySensorLabel } from '@/lib/telemetrySensorDisplay';
import { telemetryMicroSnapTransition } from '@/styles/animations';
import { useTelemetry } from '@/components/workspace/TelemetryProvider';
import { TelemetryValueFlash } from '@/components/workspace/TelemetryMonitor/TelemetryValueFlash';
import { SensorSparkline } from '@/components/workspace/TelemetryMonitor/SensorSparkline';
import {
  SensorCard,
  SensorCardInner,
  SensorHeader,
  SensorLabel,
  SensorStatusBadge,
  SensorUnit,
  SensorValue,
  SensorValueRow,
  ThresholdBar,
  ThresholdCritMarker,
  ThresholdFill,
  ThresholdLimit,
} from '@/components/workspace/TelemetryMonitor/TelemetryMonitor.style';

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

const resolveSensorStatusLabel = (
  status: SensorStatus,
  translate: (key: string) => string,
): string => resolveI18nKeyOrFallback(
  `liveLab.monitor.statusLabels.${status}`,
  status,
  translate,
);

const calcPct = (r: SensorReading): number => {
  const range: number = r.threshold_critical * 1.1;
  return Math.min((r.value / range) * 100, 100);
};

const critMarkerPct = (r: SensorReading): number => {
  const range: number = r.threshold_critical * 1.1;
  return (r.threshold_critical / range) * 100;
};

const formatReading = (value: number): string => value.toFixed(2);

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

export const TelemetrySensorCard: React.FC<SensorProps> = ({
  reading: r,
  index,
  compact = false,
}): React.ReactElement => {
  const { t } = useTranslation();
  const { history } = useTelemetry();
  const samples: number[] = history[r.id] ?? [];
  const sensorLabel: string = resolveTelemetrySensorLabel(r, t);
  const statusLabel: string = resolveSensorStatusLabel(r.status, t);

  return (
    <SensorCard
      $status={r.status}
      $sweepDelay={index * 1.4}
      $compact={compact}
      aria-label={`${sensorLabel}, ${formatReading(r.value)} ${r.unit}, ${statusLabel}`}
    >
      <SensorCardInner>
        <SensorHeader>
          <SensorLabel>{sensorLabel}</SensorLabel>
          <SensorStatusBadge $status={r.status}>{statusLabel}</SensorStatusBadge>
        </SensorHeader>
        <SensorValueRow>
          <TelemetryValueFlash cellId={`sensor-${r.id}`} valueKey={r.value}>
            <SensorValue $status={r.status}>
              {formatReading(r.value)}
            </SensorValue>
          </TelemetryValueFlash>
          <SensorUnit>{r.unit}</SensorUnit>
        </SensorValueRow>
        {!compact ? <SensorSparkline values={samples} status={r.status} /> : null}
        <ThresholdBar>
          <ThresholdFill
            $status={r.status}
            animate={{ width: `${calcPct(r)}%` }}
            transition={telemetryMicroSnapTransition}
          />
          <ThresholdCritMarker $pct={critMarkerPct(r)} aria-hidden />
        </ThresholdBar>
        <ThresholdLimit>
          {t('liveLab.monitor.critLimit', {
            value: r.threshold_critical,
            unit: r.unit,
          })}
        </ThresholdLimit>
      </SensorCardInner>
    </SensorCard>
  );
};
