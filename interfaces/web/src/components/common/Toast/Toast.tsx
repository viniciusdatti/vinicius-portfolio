// Core
import React from 'react';

// Components
import { useToastStore } from '@/store/toastStore';
import { ToastHostRoot, ToastItemSurface } from '@/components/common/Toast/Toast.style';

export { showToast, ToastType } from '@/store/toastStore';

export function ToastHost(): React.ReactElement | null {
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
}
