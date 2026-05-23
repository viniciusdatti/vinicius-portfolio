/**
 * @fileoverview Animated mini sparkline for home observatory sensor tiles.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React, { useEffect, useState } from 'react';

// Libraries
import { motion } from 'framer-motion';

// Types
import type { LiveLabObservatorySparklineProps } from '@/components/Home/LiveLabObservatory/LiveLabObservatory.types';

// Components
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  buildObservatorySparkline,
  sparkPathFromValues,
} from '@/components/Home/LiveLabObservatory/LiveLabObservatory.helpers';
import { SparklineSvg } from '@/components/Home/LiveLabObservatory/LiveLabObservatory.style';

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

export const LiveLabObservatorySparkline: React.FC<LiveLabObservatorySparklineProps> = ({
  seed,
  strokeColor,
}): React.ReactElement => {
  const reduced: boolean = usePrefersReducedMotion();
  const [values, setValues] = useState<number[]>(() => buildObservatorySparkline(seed, 24));

  useEffect(() => {
    if (reduced) return undefined;
    const id: number = window.setInterval(() => {
      setValues((prev: number[]) => {
        const tail: number = prev[prev.length - 1] + (Math.random() - 0.5) * 0.1;
        const next: number[] = [...prev.slice(1), tail];
        return next;
      });
    }, 1200);
    return (): void => window.clearInterval(id);
  }, [reduced, seed]);

  const d: string = sparkPathFromValues(values, 120, 28);

  return (
    <SparklineSvg viewBox="0 0 120 28" aria-hidden>
      <motion.path
        d={d}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={false}
        animate={{ d }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </SparklineSvg>
  );
};
