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
 * Drawer uses `position: fixed` + negative `top` (iOS-safe). Menu only toggles overflow
 * so the document scroll position is preserved without a programmatic restore.
 */
const usesFixedScrollCompensation = (lockClass: BodyScrollLockClass): boolean => (
  lockClass === BodyScrollLockClass.Drawer
);

/**
 * Restores document scroll without animating (overrides `html { scroll-behavior: smooth }`).
 */
const restoreDocumentScrollY = (scrollY: number): void => {
  const html: HTMLElement = document.documentElement;
  const previousHtmlScrollBehavior: string = html.style.scrollBehavior;

  html.style.scrollBehavior = 'auto';
  window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
  html.scrollTop = scrollY;
  document.body.scrollTop = scrollY;
  html.style.scrollBehavior = previousHtmlScrollBehavior;
};

/**
 * Restores body scroll and returns to the saved scroll position.
 */
export const unlockBodyScroll = (lockClass: BodyScrollLockClass): void => {
  const rawY: string | null = document.body.getAttribute(SCROLL_LOCK_Y_ATTR);
  const parsedY: number = rawY !== null ? Number(rawY) : 0;
  const scrollY: number = Number.isFinite(parsedY) ? Math.max(0, parsedY) : 0;
  const hadFixedCompensation: boolean = usesFixedScrollCompensation(lockClass)
    && document.body.style.top !== '';

  document.body.classList.remove(lockClass);
  document.body.style.top = '';
  document.body.removeAttribute(SCROLL_LOCK_Y_ATTR);

  if (hadFixedCompensation) {
    restoreDocumentScrollY(scrollY);
  }
};

/**
 * Locks body scroll and keeps the current viewport position visually fixed.
 */
export const lockBodyScroll = (lockClass: BodyScrollLockClass): (() => void) => {
  const scrollY: number = getDocumentScrollY();
  document.body.setAttribute(SCROLL_LOCK_Y_ATTR, String(scrollY));
  document.body.classList.add(lockClass);

  if (usesFixedScrollCompensation(lockClass)) {
    document.body.style.top = `-${scrollY}px`;
  }

  return (): void => {
    unlockBodyScroll(lockClass);
  };
};
