// Libraries
import styled from 'styled-components';

export const WorkPreviewLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.72;
`;

export const WorkPreviewCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;
