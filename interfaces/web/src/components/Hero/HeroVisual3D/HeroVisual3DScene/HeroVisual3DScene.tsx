// Core
import React from 'react';

// Libraries
import { Canvas } from '@react-three/fiber';

// Styles
import { HeroVisual3DCanvasWrap } from '../HeroVisual3D.style';

// Types
import { HeroVisual3DSceneProps } from './HeroVisual3DScene.types';

// HeroVisual3D
import { HeroParticleField } from '../HeroParticleField';
import { HeroVisual3DBloom } from '../HeroVisual3DBloom';
import { CAMERA_Z } from '../HeroVisual3D.constants';

export const HeroVisual3DScene: React.FC<HeroVisual3DSceneProps> = ({
  containerRef,
  motionEnabled,
  loopActive,
}): React.ReactElement => (
  <HeroVisual3DCanvasWrap aria-hidden data-testid="hero-visual-3d">
    <Canvas
      camera={{
        position: [0.45, 0.1, CAMERA_Z], fov: 58, near: 0.1, far: 48,
      }}
      dpr={[1, 1.75]}
      frameloop={loopActive ? 'always' : 'never'}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
    >
      <HeroParticleField
        motionEnabled={motionEnabled}
        loopActive={loopActive}
        containerRef={containerRef}
      />
      <HeroVisual3DBloom />
    </Canvas>
  </HeroVisual3DCanvasWrap>
);
