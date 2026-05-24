/**
 * @fileoverview Preserves scroll position while locking document scroll for overlays.
 */

export enum BodyScrollLockClass {
  Menu = 'menu-scroll-locked',
  Drawer = 'drawer-scroll-locked',
}

const SCROLL_LOCK_Y_ATTR: string = 'data-scroll-lock-y';

const getDocumentScrollY = (): number => (
  window.scrollY || document.documentElement.scrollTop || 0
);

/**
 * Restores body scroll and returns to the saved scroll position.
 */
export const unlockBodyScroll = (lockClass: BodyScrollLockClass): void => {
  const rawY: string | null = document.body.getAttribute(SCROLL_LOCK_Y_ATTR);
  const scrollY: number = rawY !== null ? Number(rawY) : 0;

  document.body.classList.remove(lockClass);
  document.body.style.top = '';
  document.body.removeAttribute(SCROLL_LOCK_Y_ATTR);
  window.scrollTo(0, scrollY);
};

/**
 * Locks body scroll and keeps the current viewport position visually fixed.
 */
export const lockBodyScroll = (lockClass: BodyScrollLockClass): (() => void) => {
  const scrollY: number = getDocumentScrollY();
  document.body.setAttribute(SCROLL_LOCK_Y_ATTR, String(scrollY));
  document.body.style.top = `-${scrollY}px`;
  document.body.classList.add(lockClass);

  return (): void => {
    unlockBodyScroll(lockClass);
  };
};
