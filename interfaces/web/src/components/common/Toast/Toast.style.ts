import styled from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import { ToastType } from '../../../store/toastStore';

const toneColor = (type: ToastType, theme: DefaultTheme): string => {
  if (type === ToastType.Success) {
    return theme.colors.success;
  }
  if (type === ToastType.Warning) {
    return theme.colors.warning;
  }
  return theme.colors.error;
};

export const ToastHostRoot = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.sizes.layout.headerOffset};
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.toast};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  pointer-events: none;
  width: min(420px, calc(100vw - 2rem));
`;

export const ToastItemSurface = styled.div<{ $type: ToastType }>`
  pointer-events: auto;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ $type, theme }) => toneColor($type, theme)};
  background: ${({ theme }) => theme.colors.surfaceElevated};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
