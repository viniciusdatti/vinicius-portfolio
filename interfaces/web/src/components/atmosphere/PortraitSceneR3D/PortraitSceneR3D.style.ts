// Libraries
import styled from 'styled-components';

export const PortraitSceneRoot = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const PortraitCanvasWrap = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
`;

export const PortraitFallbackImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 12%;
  display: block;
`;
