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

export const WorkspaceSplit = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
    overflow-y: auto;
  };
`;

export const ContextColumn = styled.div`
  display: flex;
  flex: 0 0 42%;
  min-width: 0;
  max-width: 52%;
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: none;
    max-width: none;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    min-height: min(50vh, 480px);
  };
`;

export const LiveColumn = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  min-height: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex: none;
    min-height: min(58vh, 560px);
    order: -1;
  };
`;

export const ContextInner = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;

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
