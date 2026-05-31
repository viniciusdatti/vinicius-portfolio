// Core
import React from 'react';

// Libraries
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export const HeroVisual3DBloom: React.FC = (): React.ReactElement => (
  <EffectComposer multisampling={0}>
    <Bloom
      intensity={0.38}
      luminanceThreshold={0.42}
      luminanceSmoothing={0.92}
      mipmapBlur
    />
  </EffectComposer>
);
