/**
 * @fileoverview Types for socket-driven telemetry value flash cells.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import type React from 'react';

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

export interface TelemetryValueFlashProps {
  /** Unique cell id for throttle (M1 — one flash per cell per 100ms). */
  cellId: string;
  /** Value key that changes on socket ticks. */
  valueKey: string | number;
  className?: string;
  children: React.ReactNode;
}

export interface TelemetryValueFlashWrapProps {
  $flashing: boolean;
}
