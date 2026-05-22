// Libraries
import styled from 'styled-components';

export const MonitorFieldLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.72;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 90% 70% at 50% 110%, rgba(0, 0, 0, 0.55) 0%, transparent 62%),
      radial-gradient(ellipse 55% 40% at 12% 8%, rgba(245, 158, 11, 0.06) 0%, transparent 55%),
      linear-gradient(180deg, transparent 0%, rgba(7, 8, 10, 0.35) 100%);
    z-index: 1;
  }
`;

export const MonitorFieldCanvas = styled.canvas`
  position: relative;
  z-index: 0;
  display: block;
  width: 100%;
  height: 100%;
`;
