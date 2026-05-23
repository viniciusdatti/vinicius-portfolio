// Core
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import { ValueFlashWrap } from '@/components/Workspace/TelemetryMonitor/TelemetryMonitor.style';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface TelemetryValueFlashProps {
  /** Unique cell id for throttle (M1 — one flash per cell per 100ms). */
  cellId: string;
  /** Value key that changes on socket ticks. */
  valueKey: string | number;
  className?: string;
  children: React.ReactNode;
}

// =================================================================================================
// ============================================ CONSTANTS ==========================================
// =================================================================================================

const FLASH_THROTTLE_MS: number = 100;
const FLASH_DURATION_MS: number = 380;

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Socket-driven value flash — opacity/background only (no scale/bounce).
 */
export const TelemetryValueFlash: React.FC<TelemetryValueFlashProps> = ({
  cellId,
  valueKey,
  className,
  children,
}): React.ReactElement => {
  const reduced: boolean = usePrefersReducedMotion();
  const [flashing, setFlashing] = useState<boolean>(false);
  const lastFlashRef = useRef<Record<string, number>>({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    if (reduced) return undefined;

    const now: number = Date.now();
    const last: number = lastFlashRef.current[cellId] ?? 0;
    if (now - last < FLASH_THROTTLE_MS) return undefined;

    lastFlashRef.current[cellId] = now;
    setFlashing(true);

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout((): void => {
      setFlashing(false);
      timerRef.current = null;
    }, FLASH_DURATION_MS);

    return (): void => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [cellId, valueKey, reduced]);

  if (reduced) {
    return <span className={className}>{children}</span>;
  }

  return (
    <ValueFlashWrap className={className} $flashing={flashing}>
      {children}
    </ValueFlashWrap>
  );
};
