// Types
import { HighlightCardStatus } from '../../../types';

export interface StatusCardProps {
  title: string;
  value: string;
  unit?: string;
  status: HighlightCardStatus;
}
