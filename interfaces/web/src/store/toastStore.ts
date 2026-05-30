// Libraries
import { create } from 'zustand';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export interface ToastItem {
  id: string;
  text: string;
  type: ToastType;
}

interface ToastState {
  toasts: ToastItem[];
  push: (text: string, type: ToastType) => void;
  dismiss: (id: string) => void;
}

const AUTO_DISMISS_MS: number = 4000;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  push: (text: string, type: ToastType): void => {
    const id: string = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    set({ toasts: [...get().toasts, { id, text, type }] });
    window.setTimeout(() => {
      get().dismiss(id);
    }, AUTO_DISMISS_MS);
  },
  dismiss: (id: string): void => {
    set({ toasts: get().toasts.filter((item: ToastItem) => item.id !== id) });
  },
}));

export const showToast = (text: string, type: ToastType = ToastType.Success): void => {
  useToastStore.getState().push(text, type);
};
