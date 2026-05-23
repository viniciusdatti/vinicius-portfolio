/* eslint-disable react/no-unknown-property -- R3F JSX intrinsics */
// Core
import React, { Suspense } from 'react';

// Libraries
import { Canvas } from '@react-three/fiber';
import { useTheme } from 'styled-components';

// Types
import type { Theme } from '@/styles/theme';
import type { PortraitSceneR3DProps } from '@/components/atmosphere/PortraitSceneR3D/PortraitSceneR3D.types';
import type { HeroCanvasPointer } from '@/hooks/useHeroCanvasPointer.types';

// Components
import { PortraitMesh } from '@/components/atmosphere/PortraitSceneR3D/PortraitMesh';
import { PortraitCanvasWrap } from '@/components/atmosphere/PortraitSceneR3D/PortraitSceneR3D.style';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const IDLE_POINTER: HeroCanvasPointer = {
  x: 0.5,
  y: 0.5,
  active: false,
  pulse: 0,
};

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * WebGL portrait bust — lit plane with texture (lazy chunk).
 */
export const PortraitSceneR3DInner = ({
  imageSrc,
  pointer = IDLE_POINTER,
}: PortraitSceneR3DProps): React.ReactElement => {
  const theme = useTheme() as Theme;

  return (
    <PortraitCanvasWrap>
      <Canvas
        camera={{
          position: [0, 0, 3.8], fov: 42, near: 0.1, far: 20,
        }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <PortraitMesh
            imageSrc={imageSrc}
            pointer={pointer}
            accentHex={theme.colors.primary}
          />
        </Suspense>
      </Canvas>
    </PortraitCanvasWrap>
  );
};
