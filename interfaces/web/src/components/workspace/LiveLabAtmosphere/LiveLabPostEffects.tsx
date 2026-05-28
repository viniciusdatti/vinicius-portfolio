// Core
import React from 'react';

// Libraries
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export const LiveLabPostEffects = (): React.ReactElement => (
  <EffectComposer multisampling={0}>
    <Bloom
      intensity={0.22}
      luminanceThreshold={0.52}
      luminanceSmoothing={0.38}
      mipmapBlur
    />
    <ChromaticAberration
      blendFunction={BlendFunction.NORMAL}
      offset={[0.0006, 0.0004] as [number, number]}
      radialModulation={false}
      modulationOffset={0}
    />
  </EffectComposer>
);
