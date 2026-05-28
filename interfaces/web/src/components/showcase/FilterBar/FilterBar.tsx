/**
 * @fileoverview Dense instrument-style filter rail for editorial showcase pages.
 */

// Core
import React from 'react';

// Component
import type { FilterBarProps } from './FilterBar.types';
import {
  FilterBarWrapper,
  FilterChip,
  FilterCount,
} from './FilterBar.style';

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  selectedKey,
  onSelect,
}): React.ReactElement => (
  <FilterBarWrapper role="toolbar" aria-label="Project filters">
    {filters.map((filter) => {
      const isActive: boolean = selectedKey === filter.key;
      return (
        <FilterChip
          key={filter.key}
          type="button"
          $active={isActive}
          aria-pressed={isActive}
          onClick={(): void => onSelect(filter.key)}
        >
          {filter.label}
          {filter.count != null ? (
            <FilterCount>
              (
              {filter.count}
              )
            </FilterCount>
          ) : null}
        </FilterChip>
      );
    })}
  </FilterBarWrapper>
);
