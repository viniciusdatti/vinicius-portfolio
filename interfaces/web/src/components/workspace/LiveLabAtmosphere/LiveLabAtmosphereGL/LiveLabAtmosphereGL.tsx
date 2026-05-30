// Core
import React, { Suspense } from 'react';

// Libraries
import { Canvas } from '@react-three/fiber';
import { useTheme } from 'styled-components';

// Styles
import { Theme } from '../../../../styles/theme';
import {
  AtmosphereDepthVeil,
  AtmosphereRoot,
  GlCanvasWrap,
  NoiseVeil,
} from '../LiveLabAtmosphere.style';

// LiveLabAtmosphere
import { LiveLabGridScene } from '../LiveLabGridScene';
import { LiveLabPostEffects } from '../LiveLabPostEffects';

export const LiveLabAtmosphereGL = (): React.ReactElement => {
  const theme = useTheme() as Theme;
  const accentHex: string = theme.colors.primary;
  const backgroundHex: string = theme.colors.background;

  return (
    <AtmosphereRoot aria-hidden>
      <GlCanvasWrap>
        <Canvas
          camera={{
            position: [0, 3.2, 7.5], fov: 48, near: 0.1, far: 40,
          }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <LiveLabGridScene
              accentHex={accentHex}
              backgroundHex={backgroundHex}
            />
            <LiveLabPostEffects />
          </Suspense>
        </Canvas>
      </GlCanvasWrap>
      <NoiseVeil />
      <AtmosphereDepthVeil />
    </AtmosphereRoot>
  );
};
