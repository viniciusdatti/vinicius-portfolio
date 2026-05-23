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
} from '@/components/Workspace/LiveLabAtmosphere/LiveLabAtmosphere.style';

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * CSS 3D operational atmosphere — perspective grid, horizon glow, scan beam (perf-safe fallback).
 */
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
