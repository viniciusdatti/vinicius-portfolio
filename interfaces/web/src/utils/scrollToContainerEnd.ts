/**
 * Scrolls within a scrollable parent instead of the document (avoids page jump).
 */
export const scrollToContainerEnd = (
  element: HTMLElement | null,
  behavior: ScrollBehavior = 'smooth'
): void => {
  if (!element) {
    return;
  }
  const scrollParent: HTMLElement | null = findScrollParent(element);
  if (scrollParent) {
    scrollParent.scrollTo({
      top: scrollParent.scrollHeight,
      behavior,
    });
    return;
  }
  element.scrollIntoView({ behavior, block: 'nearest' });
};

const findScrollParent = (node: HTMLElement): HTMLElement | null => {
  let parent: HTMLElement | null = node.parentElement;
  while (parent) {
    const style: CSSStyleDeclaration = window.getComputedStyle(parent);
    const overflowY: string = style.overflowY;
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      parent.scrollHeight > parent.clientHeight
    ) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return null;
};
