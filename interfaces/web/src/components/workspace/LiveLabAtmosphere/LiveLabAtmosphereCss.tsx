// Core
import React from 'react';

// Component
import {
  AtmosphereDepthVeil,
  AtmosphereOrb,
  AtmosphereOrbSecondary,
  AtmosphereRoot,
  GridFloor,
  HorizonLine,
  NoiseVeil,
  PerspectiveStage,
  ScanBeam,
} from './LiveLabAtmosphere.style';

export const LiveLabAtmosphereCss = (): React.ReactElement => (
  <AtmosphereRoot aria-hidden>
    <AtmosphereOrb />
    <AtmosphereOrbSecondary />
    <PerspectiveStage>
      <GridFloor />
      <HorizonLine />
    </PerspectiveStage>
    <ScanBeam />
    <NoiseVeil />
    <AtmosphereDepthVeil />
  </AtmosphereRoot>
);
