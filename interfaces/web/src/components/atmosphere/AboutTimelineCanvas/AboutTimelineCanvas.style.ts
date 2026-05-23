// Libraries
import styled from 'styled-components';

export const TimelineCanvasLayer = styled.div`
  position: absolute;
  inset: 0;
  left: 0;
  right: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.65;
  border-radius: inherit;
`;

export const TimelineCanvasElement = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;
