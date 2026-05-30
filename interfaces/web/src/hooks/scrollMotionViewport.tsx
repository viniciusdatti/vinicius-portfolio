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

// Utils
import {
  BodyScrollLockClass,
  LIVE_LAB_IMMERSIVE_CLASS,
} from '../utils/bodyScrollLock';

export interface ScrollMotionViewportContextValue {
  scrollRootRef: React.RefObject<HTMLElement | null>;
  attachCustomRoot: boolean;
  bindScrollRoot: (node: HTMLElement | null) => void;
}

const defaultScrollRootRef: React.RefObject<HTMLElement | null> = { current: null };

const defaultContextValue: ScrollMotionViewportContextValue = {
  scrollRootRef: defaultScrollRootRef,
  attachCustomRoot: false,
  bindScrollRoot: (): void => undefined,
};

const ScrollMotionViewportContext = createContext<ScrollMotionViewportContextValue>(
  defaultContextValue,
);

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
  document.body.classList.contains(LIVE_LAB_IMMERSIVE_CLASS)
  || document.body.classList.contains(BodyScrollLockClass.Menu)
  || document.body.classList.contains(BodyScrollLockClass.Drawer)
  || document.body.classList.contains(BodyScrollLockClass.Modal)
);

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
    // Attach Framer viewport.root only when the shell scrolls inside Layout, not document.
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

export const useScrollMotionViewport = (): ScrollMotionViewportContextValue => (
  useContext(ScrollMotionViewportContext)
);
