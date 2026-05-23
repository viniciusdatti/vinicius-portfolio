/**
 * @deprecated DEAD CODE — zero usos no codebase.
 * Duplica funcionalidade de `cardInteractive` + `pointerSpotlight` em surfaces.ts.
 * Skill `frontend-architecture` P1: deletar este diretório.
 * Substituir qualquer uso futuro por `cardInteractive` mixin de surfaces.ts.
 *
 * Para deletar: rm -rf src/components/Primitives/SpotlightSurface
 */

// Core
import React from 'react';

/** @deprecated Use cardInteractive mixin from surfaces.ts instead. */
export const SpotlightSurface = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => children as React.ReactElement;
