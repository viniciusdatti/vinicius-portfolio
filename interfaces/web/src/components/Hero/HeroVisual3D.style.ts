// Libraries
import styled from 'styled-components';

// =================================================================================================
// ============================================= STYLES ============================================
// =================================================================================================

/** Absolute baseline WebGL layer — no pointer capture, sits under narrative stack. */
export const HeroVisual3DCanvasWrap = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.85;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  };
`;
