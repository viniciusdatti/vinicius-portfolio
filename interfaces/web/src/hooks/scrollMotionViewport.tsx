/**
 * @fileoverview Scroll root for Framer Motion `whileInView` when layout uses a nested scroller.
 */

// Core
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface ScrollMotionViewportContextValue {
  scrollRootRef: React.RefObject<HTMLElement | null>;
  attachCustomRoot: boolean;
  bindScrollRoot: (node: HTMLElement | null) => void;
}

/* *************************************************************************************************
 ********************************************* CONTEXT *********************************************
 ************************************************************************************************ */

const defaultScrollRootRef: React.RefObject<HTMLElement | null> = { current: null };

const defaultContextValue: ScrollMotionViewportContextValue = {
  scrollRootRef: defaultScrollRootRef,
  attachCustomRoot: false,
  bindScrollRoot: (): void => undefined,
};

const ScrollMotionViewportContext = createContext<ScrollMotionViewportContextValue>(
  defaultContextValue,
);

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

/**
 * True when `element` is the active vertical scroll container (not document/body scroll).
 */
const isNestedScrollContainer = (element: HTMLElement): boolean => {
  const { overflowY } = window.getComputedStyle(element);
  const allowsScroll: boolean = overflowY === 'auto'
    || overflowY === 'scroll'
    || overflowY === 'overlay';
  if (!allowsScroll) {
    return false;
  }
  return element.scrollHeight > element.clientHeight + 1;
};

const bodyUsesDocumentScroll = (): boolean => (
  document.body.classList.contains('live-lab-immersive')
  || document.body.classList.contains('menu-scroll-locked')
  || document.body.classList.contains('drawer-scroll-locked')
);

/* *************************************************************************************************
 ******************************************** PROVIDER *********************************************
 ************************************************************************************************ */

export interface ScrollMotionViewportProviderProps {
  children: React.ReactNode;
}

export const ScrollMotionViewportProvider: React.FC<ScrollMotionViewportProviderProps> = ({
  children,
}): React.ReactElement => {
  const scrollRootRef = useRef<HTMLElement | null>(null);
  const [attachCustomRoot, setAttachCustomRoot] = useState<boolean>(false);

  const evaluateScrollRoot = useCallback((): void => {
    const node: HTMLElement | null = scrollRootRef.current;
    if (!node) {
      setAttachCustomRoot(false);
      return;
    }
    const nestedScroll: boolean = isNestedScrollContainer(node);
    setAttachCustomRoot(nestedScroll && !bodyUsesDocumentScroll());
  }, []);

  const bindScrollRoot = useCallback((node: HTMLElement | null): void => {
    scrollRootRef.current = node;
    evaluateScrollRoot();
  }, [evaluateScrollRoot]);

  useEffect((): (() => void) => {
    evaluateScrollRoot();
    const observer: MutationObserver = new MutationObserver(() => {
      evaluateScrollRoot();
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
    const onResize = (): void => {
      evaluateScrollRoot();
    };
    window.addEventListener('resize', onResize);
    return (): void => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [evaluateScrollRoot]);

  const value = useMemo(
    (): ScrollMotionViewportContextValue => ({
      scrollRootRef,
      attachCustomRoot,
      bindScrollRoot,
    }),
    [attachCustomRoot, bindScrollRoot],
  );

  return (
    <ScrollMotionViewportContext.Provider value={value}>
      {children}
    </ScrollMotionViewportContext.Provider>
  );
};

/* *************************************************************************************************
 ********************************************** HOOK ***********************************************
 ************************************************************************************************ */

export const useScrollMotionViewport = (): ScrollMotionViewportContextValue => (
  useContext(ScrollMotionViewportContext)
);
