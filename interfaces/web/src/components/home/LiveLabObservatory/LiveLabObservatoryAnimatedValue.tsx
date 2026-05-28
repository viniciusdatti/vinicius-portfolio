/**
 * @fileoverview Animated numeric readout for home observatory sensor tiles.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React, { useEffect, useState } from 'react';

// Hooks
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// Component
import type { LiveLabObservatoryAnimatedValueProps } from './LiveLabObservatory.types';
import { SensorTileValue } from './LiveLabObservatory.style';

export const LiveLabObservatoryAnimatedValue: React.FC<LiveLabObservatoryAnimatedValueProps> = ({
  base,
  variance,
  unit,
  status,
}): React.ReactElement => {
  const reduced: boolean = usePrefersReducedMotion();
  const [val, setVal] = useState<number>(base);

  useEffect(() => {
    if (reduced) return undefined;
    const id: number = window.setInterval(() => {
      setVal(base + (Math.random() - 0.5) * variance * 2);
    }, 1800 + Math.random() * 800);
    return (): void => window.clearInterval(id);
  }, [base, variance, reduced]);

  const formatted: string = val.toFixed(1);

  return (
    <SensorTileValue $status={status}>
      {formatted}
      {' '}
      {unit}
    </SensorTileValue>
  );
};
