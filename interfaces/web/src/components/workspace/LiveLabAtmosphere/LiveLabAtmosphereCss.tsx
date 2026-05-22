// Core
import React from 'react';

// Components
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
} from '@/components/workspace/LiveLabAtmosphere/LiveLabAtmosphere.style';

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * CSS 3D operational atmosphere — perspective grid, horizon glow, scan beam (perf-safe fallback).
 */
export function LiveLabAtmosphereCss(): React.ReactElement {
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
      <AtmosphereDepthVeil />
    </AtmosphereRoot>
  );
}
