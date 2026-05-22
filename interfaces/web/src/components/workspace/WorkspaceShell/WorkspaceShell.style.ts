// Libraries
import styled from 'styled-components';

export const WorkspaceRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  width: 100%;
  overflow: hidden;
`;

export const WorkspaceBody = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ChatColumn = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  min-height: 0;
  min-width: 0;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

// Legacy aliases — kept for any external imports that may reference these
export const WorkspaceSplit = WorkspaceBody;
export const LiveColumn = ChatColumn;
