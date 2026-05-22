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
  display: grid;
  grid-template-columns: 260px 1fr;
  flex: 1;
  min-height: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  };
`;

export const SidebarColumn = styled.aside<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 0;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: fixed;
    inset: 0;
    z-index: ${({ theme }) => theme.zIndex.modal};
    border-right: none;
  };
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;
`;

export const SidebarTitle = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SidebarClose = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  padding: ${({ theme }) => theme.spacing.xs};
  line-height: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  };
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const ChatColumn = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

export const MobileSidebarTrigger = styled.button`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  white-space: nowrap;
  transition: border-color ${({ theme }) => theme.transitions.fast},
              color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primaryBorderFaint};
    color: ${({ theme }) => theme.colors.accent};
  };

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: inline-flex;
  };
`;

export const SidebarOverlay = styled.div<{ $visible: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: ${({ $visible }) => ($visible ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: ${({ theme }) => theme.colors.overlay};
    z-index: ${({ theme }) => theme.zIndex.modal - 1};
  };
`;

// Legacy exports mantidos para não quebrar imports existentes
export const WorkspaceSplit = WorkspaceBody;
export const ContextColumn = SidebarColumn;
export const LiveColumn = ChatColumn;
export const ContextInner = SidebarContent;
export const BootBanner = styled.div`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  flex-shrink: 0;
`;
export const BootTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.display};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.snug};
`;
export const BootLead = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  max-width: ${({ theme }) => theme.layout.prose};
`;
