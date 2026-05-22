// Core
import React from 'react';

// Libraries
import { motion } from 'framer-motion';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import { telemetryMicroSnapTransition } from '@/styles/animations';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface TelemetryMetricSnapProps {
  /** Changes trigger a scale spring micro-snap (socket ticks, sensor values). */
  snapKey: string | number;
  className?: string;
  children: React.ReactNode;
}

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Fast scale spring on telemetry value changes — emphasizes socket causality.
 */
export const TelemetryMetricSnap: React.FC<TelemetryMetricSnapProps> = ({
  snapKey,
  className,
  children,
}): React.ReactElement => {
  const reduced: boolean = usePrefersReducedMotion();

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      key={String(snapKey)}
      className={className}
      initial={{ scale: 1.07 }}
      animate={{ scale: 1 }}
      transition={telemetryMicroSnapTransition}
    >
      {children}
    </motion.span>
  );
};
