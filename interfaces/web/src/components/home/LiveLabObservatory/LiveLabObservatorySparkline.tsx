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

// Hooks
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

// Components
import { motionEase } from '../../../styles/animations';
import { motionPresets } from '../../../styles/motionPresets';

// Component
import type { LiveLabObservatorySparklineProps } from './LiveLabObservatory.types';
import {
  buildObservatorySparkline,
  sparkPathFromValues,
} from './LiveLabObservatory.helpers';
import { SparklineSvg } from './LiveLabObservatory.style';

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
        transition={{
          duration: reduced ? 0 : motionPresets.duration.slow,
          ease: motionEase,
        }}
      />
    </SparklineSvg>
  );
};
