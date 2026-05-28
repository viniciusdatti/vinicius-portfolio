// Core
import React from 'react';

// Store
import { useToastStore } from '../../../store/toastStore';

// Component
import { ToastHostRoot, ToastItemSurface } from './Toast.style';

export { showToast, ToastType } from '../../../store/toastStore';

export const ToastHost = (): React.ReactElement | null => {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <ToastHostRoot role="status" aria-live="polite" data-testid="toast-host">
      {toasts.map((toast) => (
        <ToastItemSurface key={toast.id} $type={toast.type}>
          {toast.text}
        </ToastItemSurface>
      ))}
    </ToastHostRoot>
  );
};
