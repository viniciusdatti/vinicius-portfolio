// Libraries
import styled from 'styled-components';

// Components
import { glassSurface, livingSurface } from '@/styles/surfaces';

export const SpotlightRoot = styled.div<{
  $glowX: number;
  $glowY: number;
  $active: boolean;
  $intensity?: number;
}>`
  position: relative;
  border-radius: inherit;
  ${livingSurface};
  ${glassSurface};
  overflow: hidden;
  transform-style: preserve-3d;
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.28s ease;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      520px circle at ${({ $glowX }) => $glowX * 100}% ${({ $glowY }) => $glowY * 100}%,
      ${({ theme }) => theme.colors.primary}22,
      transparent 58%
    );
    opacity: ${({ $active, $intensity = 1 }) => ($active ? $intensity : 0)};
    transition: opacity 0.35s ease;
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.gradientSurfaceRim};
    pointer-events: none;
    z-index: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
`;

export const SpotlightContent = styled.div`
  position: relative;
  z-index: 2;
  border-radius: inherit;
`;
