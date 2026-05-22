/* eslint-disable react/no-unknown-property -- R3F / postprocessing JSX intrinsics */
// Core
import React, { useMemo, useRef } from 'react';

// Libraries
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { AdditiveBlending, type Group } from 'three';

// Types
import type {
  HeroPointerTarget,
  HeroVisual3DSceneProps,
} from '@/components/Hero/HeroVisual3D.types';

// Components
import { HeroVisual3DCanvasWrap } from '@/components/Hero/HeroVisual3D.style';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const PARTICLE_COUNT: number = 2000;
const SPHERE_RADIUS: number = 3.6;
const AMBER_HEX: string = '#f59e0b';
const POINTER_LERP: number = 0.05;
const Y_DRIFT_SPEED: number = 0.14;
const MAGNETIC_SPREAD: number = 1.35;
const DESKTOP_FIELD_OFFSET_X: number = 1.65;

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

/**
 * Fibonacci sphere — even, wide shell distribution for 2k void particles.
 */
const buildSphericalPositions = (count: number, radius: number): Float32Array => {
  const positions: Float32Array = new Float32Array(count * 3);
  const goldenAngle: number = Math.PI * (3 - Math.sqrt(5));

  for (let i: number = 0; i < count; i += 1) {
    const t: number = i / Math.max(1, count - 1);
    const y: number = 1 - t * 2;
    const ring: number = Math.sqrt(Math.max(0, 1 - y * y));
    const theta: number = goldenAngle * i;
    const shell: number = 0.52 + 0.48 * Math.pow(t, 0.38);
    const dist: number = radius * shell;

    positions[i * 3] = Math.cos(theta) * ring * dist;
    positions[i * 3 + 1] = y * dist;
    positions[i * 3 + 2] = Math.sin(theta) * ring * dist;
  }

  return positions;
};

// =================================================================================================
// ============================================ SUBCOMPONENTS ======================================
// =================================================================================================

const HeroVisual3DBloom: React.FC = (): React.ReactElement => (
  <EffectComposer multisampling={0}>
    <Bloom
      intensity={1.2}
      luminanceThreshold={0.1}
      luminanceSmoothing={0.9}
      mipmapBlur
    />
  </EffectComposer>
);

const ParticleStorm: React.FC<HeroVisual3DSceneProps> = ({
  pointerTargetRef,
  desktopBias,
}): React.ReactElement => {
  const groupRef = useRef<Group | null>(null);
  const smoothedRef = useRef<HeroPointerTarget>({ x: 0.5, y: 0.5 });
  const positions: Float32Array = useMemo(
    (): Float32Array => buildSphericalPositions(PARTICLE_COUNT, SPHERE_RADIUS),
    [],
  );

  useFrame((_, delta: number): void => {
    const group: Group | null = groupRef.current;
    if (!group) {
      return;
    }

    const target: HeroPointerTarget = pointerTargetRef.current ?? { x: 0.5, y: 0.5 };
    const smoothed: HeroPointerTarget = smoothedRef.current;

    smoothed.x += (target.x - smoothed.x) * POINTER_LERP;
    smoothed.y += (target.y - smoothed.y) * POINTER_LERP;

    const nx: number = (smoothed.x - 0.5) * MAGNETIC_SPREAD;
    const ny: number = (smoothed.y - 0.5) * MAGNETIC_SPREAD;
    const biasX: number = desktopBias ? DESKTOP_FIELD_OFFSET_X : 0;

    group.rotation.y += delta * Y_DRIFT_SPEED;
    group.rotation.x += (-ny * 0.22 - group.rotation.x) * POINTER_LERP;
    group.rotation.z += (nx * 0.16 - group.rotation.z) * POINTER_LERP;
    group.position.x += (nx * 0.55 + biasX - group.position.x) * POINTER_LERP;
    group.position.y += (-ny * 0.42 - group.position.y) * POINTER_LERP;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          color={AMBER_HEX}
          size={0.028}
          sizeAttenuation
          transparent
          opacity={0.92}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
};

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * WebGL particle void — 2k amber field, GPU drift, bloom, pointer magnetism.
 */
export const HeroVisual3DInner: React.FC<HeroVisual3DSceneProps> = ({
  pointerTargetRef,
  desktopBias,
}): React.ReactElement => (
  <HeroVisual3DCanvasWrap aria-hidden>
    <Canvas
      camera={{ position: [0, 0, 7.2], fov: 48, near: 0.1, far: 40 }}
      dpr={[1, 1.75]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
    >
      <ambientLight intensity={0.12} />
      <ParticleStorm
        pointerTargetRef={pointerTargetRef}
        desktopBias={desktopBias}
      />
      <HeroVisual3DBloom />
    </Canvas>
  </HeroVisual3DCanvasWrap>
);
