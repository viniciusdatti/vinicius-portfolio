// Libraries
import styled, { keyframes } from 'styled-components';

// =================================================================================================
// ============================================= STYLES ============================================
// =================================================================================================

const observatoryScanline = keyframes`
  0% {
    transform: translate3d(0, -120%, 0);
    opacity: 0;
  };
  6% {
    opacity: 0.055;
  };
  94% {
    opacity: 0.055;
  };
  100% {
    transform: translate3d(0, 120vh, 0);
    opacity: 0;
  };
`;

export const ScanlineTrack = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.base};
  overflow: hidden;
  isolation: isolate;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 28vh;
    background: linear-gradient(
      180deg,
      transparent 0%,
      ${({ theme }) => theme.colors.primary}14 42%,
      transparent 100%
    );
    transform: translate3d(0, -120%, 0);
    opacity: 0;
    animation: ${observatoryScanline} 8s linear infinite;
    will-change: transform, opacity;
  };

  html[data-motion-paused='true'] &::after {
    animation-play-state: paused;
  };

  @media (prefers-reduced-motion: reduce) {
    display: none;
  };
`;
