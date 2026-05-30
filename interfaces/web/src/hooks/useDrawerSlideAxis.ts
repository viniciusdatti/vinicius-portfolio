// Core
import { useSyncExternalStore } from 'react';

const DRAWER_MOBILE_MQ: string = '(max-width: 768px)';

const getDrawerSlideAxis = (): 'x' | 'y' => {
  if (typeof window === 'undefined') {
    return 'x';
  }
  return window.matchMedia(DRAWER_MOBILE_MQ).matches ? 'y' : 'x';
};

export const useDrawerSlideAxis = (): 'x' | 'y' => useSyncExternalStore(
  (onStoreChange: () => void): (() => void) => {
    const media: MediaQueryList = window.matchMedia(DRAWER_MOBILE_MQ);
    media.addEventListener('change', onStoreChange);
    return (): void => {
      media.removeEventListener('change', onStoreChange);
    };
  },
  getDrawerSlideAxis,
  (): 'x' | 'y' => 'x',
);
