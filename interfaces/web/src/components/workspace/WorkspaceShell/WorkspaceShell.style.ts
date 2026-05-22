// Libraries
import styled from 'styled-components';

export const WorkspaceRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;

export const WorkspaceChrome = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  overflow: hidden;
`;

export const TelemetryWorkspace = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md} 0;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.surfaceGlass};
  backdrop-filter: ${({ theme }) => theme.effects.backdrop.panel};
  box-shadow: ${({ theme }) => theme.elevation.md};
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.sm};
  }
`;
