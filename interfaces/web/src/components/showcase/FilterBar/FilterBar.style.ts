/**
 * FilterBar — Retool-dense instrument filter strip (editorial showcase).
 */

// Libraries
import styled from 'styled-components';

// Components
import { scrollAnchorOffset } from '@/styles/sectionRhythm';

/* *************************************************************************************************
 ********************************************* STYLES **********************************************
 ************************************************************************************************ */

export const FilterBarWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.backdrop.glass};
  ${scrollAnchorOffset};

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1 1 auto;
    width: auto;
  };
`;

export interface FilterChipProps {
  $active: boolean;
}

export const FilterChip = styled.button<FilterChipProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing.xs};
  min-height: 44px;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  background: transparent;
  border: none;
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  cursor: pointer;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:last-child {
    border-right: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ $active }) => ($active ? '100%' : '0')};
    height: 2px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.gradientNavUnderline};
    transition: width ${({ theme }) => theme.transitions.normal};
  }

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

export const FilterCount = styled.span`
  opacity: 0.65;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
`;
