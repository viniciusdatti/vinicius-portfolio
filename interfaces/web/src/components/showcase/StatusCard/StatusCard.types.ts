/**
 * Types for StatusCard (HighlightCard-style) component.
 */

// Types
import type { HighlightCardStatus } from '@/types';

export interface StatusCardProps {
  /** Card title/label */
  title: string;
  /** Main value to display */
  value: string;
  /** Optional unit (e.g. "%", "°C") */
  unit?: string;
  /** Status driving color (dot and border) */
  status: HighlightCardStatus;
}
