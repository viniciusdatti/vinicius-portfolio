// Core
import React from 'react';

// Components
import {
  AtmosphereOrb,
  AtmosphereOrbSecondary,
  AtmosphereRoot,
  GridFloor,
  HorizonLine,
  NoiseVeil,
  PerspectiveStage,
  ScanBeam,
} from '@/components/workspace/LiveLabAtmosphere/LiveLabAtmosphere.style';

/**
 * 3D operational atmosphere — perspective grid, horizon glow, scan beam (CSS 3D, perf-safe).
 */
export function LiveLabAtmosphere(): React.ReactElement {
  return (
    <AtmosphereRoot aria-hidden>
      <AtmosphereOrb />
      <AtmosphereOrbSecondary />
      <PerspectiveStage>
        <GridFloor />
        <HorizonLine />
      </PerspectiveStage>
      <ScanBeam />
      <NoiseVeil />
    </AtmosphereRoot>
  );
}
