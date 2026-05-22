// Libraries
import styled from 'styled-components';

export const SystemBarRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky + 1};
  height: ${({ theme }) => theme.sizes.layout.systemBarHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.pageX};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;

export const SystemBarInner = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.contentWide};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SystemBarCluster = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`;

export const SystemId = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  white-space: nowrap;
`;

export const SystemDivider = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: ${({ theme }) => theme.effects.opacity.subtle};
`;

export const SystemModule = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StatusCluster = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  flex-wrap: nowrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
    display: none;
  };

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    max-width: 380px;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; };
  };
`;

export const SystemBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`;

export const StatusPill = styled.span<{ $tone: 'ok' | 'warn' | 'idle' }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 2px ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid
    ${({ $tone, theme }) =>
      $tone === 'ok'
        ? theme.colors.success
        : $tone === 'warn'
          ? theme.colors.warning
          : theme.colors.borderSubtle};
  color: ${({ $tone, theme }) =>
    $tone === 'ok'
      ? theme.colors.success
      : $tone === 'warn'
        ? theme.colors.warning
        : theme.colors.textMuted};
  background: ${({ $tone, theme }) =>
    $tone === 'ok'
      ? theme.colors.successSurface
      : $tone === 'warn'
        ? theme.colors.warningSurface
        : theme.colors.mutedSurface};
  white-space: nowrap;
`;

export const StatusDot = styled.span<{ $tone: 'ok' | 'warn' | 'idle' }>`
  width: 6px;
  height: 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ $tone, theme }) =>
    $tone === 'ok'
      ? theme.colors.success
      : $tone === 'warn'
        ? theme.colors.warning
        : theme.colors.textMuted};
`;
