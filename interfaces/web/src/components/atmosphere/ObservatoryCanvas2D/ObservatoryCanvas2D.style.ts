// Libraries
import styled from 'styled-components';

export const ObservatoryCanvasLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: inherit;
  opacity: 0.72;
`;

export const ObservatoryCanvasElement = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;
