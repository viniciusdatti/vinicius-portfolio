// Libraries
import styled from 'styled-components';

export const PageAmbientShell = styled.div`
  position: relative;
  width: 100%;
`;

export const PageAmbientLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.ambient};
  opacity: ${({ theme }) => theme.effects.opacity.decoGrid};
  pointer-events: none;
  overflow: hidden;
`;

export const PageAmbientCanvas = styled.canvas`
  display: block;
  width: 100%;
  height: 100%;
`;

export const PageAmbientContent = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.content};
`;
