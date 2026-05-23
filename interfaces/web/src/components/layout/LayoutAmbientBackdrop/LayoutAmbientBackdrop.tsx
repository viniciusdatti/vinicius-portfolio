/**
 * @fileoverview Route-aware full-viewport Canvas2D ambient — visible on all public pages.
 */

// Core
import React, { useEffect, useState } from 'react';

// Libraries
import { useLocation } from 'react-router-dom';

// Types
import {
  PageAmbientFieldKind,
  resolveAmbientKindFromPath,
} from '@/components/atmosphere/PageAmbientField/PageAmbientField.types';

// Components
import { PageAmbientField } from '@/components/atmosphere/PageAmbientField';

/* *************************************************************************************************
 ******************************************** COMPONENT ********************************************
 ************************************************************************************************ */

/**
 * Fixed ambient canvas behind page content — one instance per route, no per-page stacking traps.
 * Always mounted on public routes; motion is forced via FORCE_AMBIENT_MOTION (all browsers).
 */
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
