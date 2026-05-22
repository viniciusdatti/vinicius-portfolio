// Libraries
import styled from 'styled-components';

export const HeroVoidCanvasLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 1;
  touch-action: none;
  cursor: default;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    pointer-events: auto;
    cursor: crosshair;
    opacity: 0.9;
  };
`;

export const HeroVoidCanvasElement = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;
