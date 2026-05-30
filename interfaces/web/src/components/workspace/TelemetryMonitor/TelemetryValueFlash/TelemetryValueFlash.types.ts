// Core
import React from 'react';

export interface TelemetryValueFlashProps {
  cellId: string;
  valueKey: string | number;
  className?: string;
  children: React.ReactNode;
}

export interface TelemetryValueFlashWrapProps {
  $flashing: boolean;
}
