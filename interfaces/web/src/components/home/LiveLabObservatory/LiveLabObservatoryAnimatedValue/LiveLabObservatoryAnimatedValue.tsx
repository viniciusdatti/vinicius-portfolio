// Core
import React, { useEffect, useState } from 'react';

// Hooks
import { usePrefersReducedMotion } from '../../../../hooks/usePrefersReducedMotion';

// Styles
import { SensorTileValue } from '../LiveLabObservatory.style';

// Types
import { LiveLabObservatoryAnimatedValueProps } from '../LiveLabObservatory.types';

export const LiveLabObservatoryAnimatedValue: React.FC<
LiveLabObservatoryAnimatedValueProps
> = ({
  base,
  variance,
  unit,
  status,
  liveValue,
}): React.ReactElement => {
  const reduced: boolean = usePrefersReducedMotion();
  const [val, setVal] = useState<number>(liveValue ?? base);

  useEffect(() => {
    if (typeof liveValue === 'number') {
      setVal(liveValue);
      return undefined;
    }
    if (reduced) return undefined;
    const id: number = window.setInterval(() => {
      setVal(base + (Math.random() - 0.5) * variance * 2);
    }, 1800 + Math.random() * 800);
    return (): void => window.clearInterval(id);
  }, [base, variance, reduced, liveValue]);

  const formatted: string = val.toFixed(1);

  return (
    <SensorTileValue $status={status}>
      {formatted}
      {' '}
      {unit}
    </SensorTileValue>
  );
};
