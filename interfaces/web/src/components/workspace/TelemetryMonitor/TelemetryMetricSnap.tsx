// Core
import React from 'react';

// Components
import { TelemetryValueFlash } from '@/components/Workspace/TelemetryMonitor/TelemetryValueFlash';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface TelemetryMetricSnapProps {
  /** Changes trigger a throttled value flash (socket ticks, sensor values). */
  snapKey: string | number;
  className?: string;
  children: React.ReactNode;
}

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

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
