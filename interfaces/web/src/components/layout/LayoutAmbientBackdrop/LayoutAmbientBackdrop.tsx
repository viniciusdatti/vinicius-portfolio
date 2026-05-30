// Core
import React, { useEffect, useState } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';

// Types
import {
  PageAmbientFieldKind,
  resolveAmbientKindFromPath,
} from '../../atmosphere/PageAmbientField/PageAmbientField.types';

// Atmosphere
import { PageAmbientField } from '../../atmosphere/PageAmbientField';

export const LayoutAmbientBackdrop: React.FC = (): React.ReactElement | null => {
  const { pathname } = useLocation();
  const kind: PageAmbientFieldKind | null = resolveAmbientKindFromPath(pathname);
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  useEffect(() => {
    if (kind !== PageAmbientFieldKind.ProjectsWireframe) {
      setScrollOffset(0);
      return undefined;
    }

    const updateScrollOffset = (): void => {
      const maxScroll: number = document.documentElement.scrollHeight - window.innerHeight;
      const next: number = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollOffset(next);
    };

    updateScrollOffset();
    window.addEventListener('scroll', updateScrollOffset, { passive: true });
    window.addEventListener('resize', updateScrollOffset, { passive: true });

    return (): void => {
      window.removeEventListener('scroll', updateScrollOffset);
      window.removeEventListener('resize', updateScrollOffset);
    };
  }, [kind, pathname]);

  if (kind === null) {
    return null;
  }

  return (
    <PageAmbientField kind={kind} scrollOffset={scrollOffset} />
  );
};
