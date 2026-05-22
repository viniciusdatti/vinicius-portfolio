/**
 * FilterBar component. Horizontal filter chips with optional count badges.
 */

// Core
import React from 'react';

// Types
import type { FilterBarProps } from './FilterBar.types';

// Components
import {
  FilterBarWrapper,
  FilterChip,
  FilterCount,
} from './FilterBar.style';

export function FilterBar({
  filters,
  selectedKey,
  onSelect,
}: FilterBarProps): React.ReactElement {
  return (
    <FilterBarWrapper>
      {filters.map((filter) => (
        <FilterChip
          key={filter.key}
          type="button"
          $active={selectedKey === filter.key}
          onClick={() => onSelect(filter.key)}
        >
          {filter.label}
          {filter.count != null && (
            <FilterCount>
              (
              {filter.count}
              )
            </FilterCount>
          )}
        </FilterChip>
      ))}
    </FilterBarWrapper>
  );
}
