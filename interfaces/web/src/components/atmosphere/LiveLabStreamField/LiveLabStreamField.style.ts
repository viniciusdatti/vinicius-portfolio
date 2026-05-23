// Libraries
import styled from 'styled-components';

/* *************************************************************************************************
 ********************************************* STYLES **********************************************
 ************************************************************************************************ */

export const LiveLabStreamLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 1;
`;

export const LiveLabStreamCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;
