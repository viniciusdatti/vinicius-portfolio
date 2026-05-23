/**
 * @fileoverview Deprecated snap wrapper — delegates to TelemetryValueFlash.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React from 'react';

// Types
import type { TelemetryMetricSnapProps } from '@/components/workspace/TelemetryMonitor/TelemetryMetricSnap/TelemetryMetricSnap.types';

// Components
import { TelemetryValueFlash } from '@/components/workspace/TelemetryMonitor/TelemetryValueFlash';

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

/**
 * @deprecated Use TelemetryValueFlash — scale snap removed per realtime-dashboard-motion M1.
 */
export const TelemetryMetricSnap: React.FC<TelemetryMetricSnapProps> = ({
  snapKey,
  className,
  children,
}): React.ReactElement => (
  <TelemetryValueFlash cellId={`snap-${String(snapKey)}`} valueKey={snapKey} className={className}>
    {children}
  </TelemetryValueFlash>
);
