const FOCUSABLE_SELECTOR: string = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const nodes: NodeListOf<HTMLElement> = container.querySelectorAll(FOCUSABLE_SELECTOR);
  return Array.from(nodes);
};

export const trapTabKey = (container: HTMLElement, event: KeyboardEvent): boolean => {
  if (event.key !== 'Tab') {
    return false;
  }

  const focusables: HTMLElement[] = getFocusableElements(container);
  if (focusables.length === 0) {
    return false;
  }

  const first: HTMLElement = focusables[0];
  const last: HTMLElement = focusables[focusables.length - 1];
  const active: Element | null = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
    return true;
  }

  if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
    return true;
  }

  return false;
};
