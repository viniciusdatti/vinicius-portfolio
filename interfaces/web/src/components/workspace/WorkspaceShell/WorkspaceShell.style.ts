// Libraries
import styled from 'styled-components';

export const WorkspaceRoot = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;

export const TelemetryWorkspace = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;
