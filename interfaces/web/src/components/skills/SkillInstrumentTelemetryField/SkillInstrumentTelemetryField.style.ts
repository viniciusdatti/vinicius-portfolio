// Libraries
import styled from 'styled-components';

export const SkillInstrumentFieldLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 46%;
  min-height: 4.25rem;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.78;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 85% 80% at 50% 100%, rgba(0, 0, 0, 0.5) 0%, transparent 58%),
      linear-gradient(180deg, transparent 0%, rgba(7, 8, 10, 0.28) 100%);
    z-index: 1;
  };
`;

export const SkillInstrumentFieldCanvas = styled.canvas`
  position: relative;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
`;
