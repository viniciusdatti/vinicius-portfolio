// Libraries
import styled, { keyframes } from 'styled-components';

const scanLine = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  };
  15% {
    opacity: 0.35;
  };
  100% {
    transform: translateY(220%);
    opacity: 0;
  };
`;

export const PreviewRoot = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(140px, 0.45fr);
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 220px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    min-height: auto;
  };
`;

export const ChatMock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`;

export const ChatMockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;

export const ChatMockDot = styled.span<{ $live: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $live, theme }) =>
    $live ? theme.colors.success : theme.colors.textMuted};
  box-shadow: ${({ $live, theme }) =>
    $live ? `0 0 8px ${theme.colors.success}` : 'none'};
`;

export const ChatMockBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

export const MockBubble = styled.div<{ $own?: boolean }>`
  align-self: ${({ $own }) => ($own ? 'flex-end' : 'flex-start')};
  max-width: 88%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  background: ${({ $own, theme }) =>
    $own ? theme.colors.primarySurface : theme.colors.mutedSurface};
  border: 1px solid
    ${({ $own, theme }) =>
      $own ? theme.colors.primaryBorderFaint : theme.colors.borderSubtle};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EventMock = styled.aside`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  position: relative;
  overflow: hidden;
`;

export const EventMockTitle = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const EventMockList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const EventMockItem = styled.li`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PreviewScan = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 0%,
    ${({ theme }) => theme.colors.primarySurface} 50%,
    transparent 100%
  );
  animation: ${scanLine} 4.5s ease-in-out infinite;
`;
