// Libraries
import styled from 'styled-components';

export const HeroVisual3DCanvasWrap = styled.div`
  position: absolute;
  inset: -14% -10%;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.base};
  opacity: ${({ theme }) => theme.effects.opacity.heroGlowMin};

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  };
`;
