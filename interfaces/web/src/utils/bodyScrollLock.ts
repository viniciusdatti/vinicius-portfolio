export enum BodyScrollLockClass {
  Menu = 'menu-scroll-locked',
  Drawer = 'drawer-scroll-locked',
  Modal = 'modal-scroll-locked',
}

/** Body class toggled when Live Lab immersive pin mode uses document scroll. */
export const LIVE_LAB_IMMERSIVE_CLASS: string = 'live-lab-immersive';

const SCROLL_LOCK_Y_ATTR: string = 'data-scroll-lock-y';

const getDocumentScrollY = (): number => (
  window.scrollY || document.documentElement.scrollTop || 0
);

const usesFixedScrollCompensation = (lockClass: BodyScrollLockClass): boolean => (
  lockClass === BodyScrollLockClass.Drawer
  || lockClass === BodyScrollLockClass.Modal
);

const restoreDocumentScrollY = (scrollY: number): void => {
  const html: HTMLElement = document.documentElement;
  const previousHtmlScrollBehavior: string = html.style.scrollBehavior;

  html.style.scrollBehavior = 'auto';
  window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' });
  html.scrollTop = scrollY;
  document.body.scrollTop = scrollY;
  html.style.scrollBehavior = previousHtmlScrollBehavior;
};

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
