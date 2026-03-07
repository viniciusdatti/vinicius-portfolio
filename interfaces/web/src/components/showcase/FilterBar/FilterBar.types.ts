/**
 * Types for FilterBar component.
 */

export interface FilterItem {
  /** Unique key for the filter */
  key: string;
  /** Display label */
  label: string;
  /** Optional count badge */
  count?: number;
}

export interface FilterBarProps {
  /** List of filter options */
  filters: FilterItem[];
  /** Currently selected filter key */
  selectedKey: string;
  /** Callback when a filter is clicked */
  onSelect: (key: string) => void;
}
