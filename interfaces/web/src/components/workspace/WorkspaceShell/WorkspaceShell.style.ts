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

export const WorkspaceBody = styled.div`
  display: grid;
  flex: 1;
  min-height: 0;
  grid-template-columns:
    ${({ theme }) => theme.sizes.layout.moduleRailWidth}
    minmax(0, 1fr)
    minmax(0, 1.05fr)
    minmax(0, 0.95fr);
  gap: ${({ theme }) => theme.sizes.layout.workspaceGap};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto minmax(280px, 1fr) minmax(240px, 1fr);
    overflow-y: auto;
  }
`;

export const WorkspaceColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  &:last-child {
    border-right: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    min-height: 240px;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const ChannelColumn = styled(WorkspaceColumn)`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

export const TelemetryColumn = styled(WorkspaceColumn)`
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const PanelColumn = styled(WorkspaceColumn)`
  background: ${({ theme }) => theme.colors.surface};
`;
