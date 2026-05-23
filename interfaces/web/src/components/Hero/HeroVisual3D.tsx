/* eslint-disable react/no-unknown-property -- R3F / drei / postprocessing JSX intrinsics */
// Core
import React, {
  Suspense,
  useMemo,
  useRef,
  type RefObject,
} from 'react';

// Libraries
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { AdditiveBlending, type Group } from 'three';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '@/hooks/useWebGLAvailable';

// Types
import type { HeroVisual3DProps } from '@/components/Hero/HeroVisual3D.types';

// Components
import { HeroVisual3DCanvasWrap } from '@/components/Hero/HeroVisual3D.style';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const PARTICLE_COUNT: number = 1500;
const SPHERE_RADIUS: number = 3.4;
const AMBER_HEX: string = '#00E5FF';
/** Dev validation — set false before shipping; bypasses reduced-motion / WebGL gates. */
const FORCE_SHOW_3D: boolean = true;
/** Sized above body dot grid perceptual threshold (void-column read). */
const PARTICLE_SIZE: number = 0.052;
const PARTICLE_OPACITY: number = 0.92;
const Y_DRIFT_SPEED: number = 0.11;
const MAGNETIC_SPREAD: number = 1.25;
/** Follow rate — tuned for motionPresets.ease.out feel (no spring overshoot). */
const POINTER_EASE_RATE: number = 9;

/**
 * Cubic ease-out interpolation step — matches canonical [0.22, 1, 0.36, 1] curve.
 */
const cubicEaseOutStep = (
  current: number,
  target: number,
  delta: number,
  rate: number = POINTER_EASE_RATE,
): number => {
  const linearT: number = 1 - Math.exp(-rate * delta);
  const easedT: number = 1 - (1 - linearT) ** 3;
  return current + (target - current) * easedT;
};

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

/**
 * Fibonacci sphere distribution — even amber field without clumping.
 */
const buildParticlePositions = (count: number, radius: number): Float32Array => {
  const positions: Float32Array = new Float32Array(count * 3);
  const goldenAngle: number = Math.PI * (3 - Math.sqrt(5));

  for (let i: number = 0; i < count; i += 1) {
    const t: number = i / Math.max(1, count - 1);
    const y: number = 1 - t * 2;
    const ring: number = Math.sqrt(Math.max(0, 1 - y * y));
    const theta: number = goldenAngle * i;
    const shell: number = 0.55 + 0.45 * t ** 0.42;
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

const HeroParticleField: React.FC = (): React.ReactElement => {
  const groupRef = useRef<Group | null>(null);
  const positions: Float32Array = useMemo(
    (): Float32Array => buildParticlePositions(PARTICLE_COUNT, SPHERE_RADIUS),
    [],
  );

  useFrame((state, delta: number): void => {
    const group: Group | null = groupRef.current;
    if (!group) {
      return;
    }

    group.position.y += delta * Y_DRIFT_SPEED;

    const targetX: number = state.pointer.x * MAGNETIC_SPREAD;
    const targetZ: number = state.pointer.y * MAGNETIC_SPREAD;

    group.position.x = cubicEaseOutStep(group.position.x, targetX, delta);
    group.position.z = cubicEaseOutStep(group.position.z, targetZ, delta);
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          color={AMBER_HEX}
          size={PARTICLE_SIZE}
          opacity={PARTICLE_OPACITY}
          transparent
          depthWrite={false}
          sizeAttenuation
          blending={AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const HeroVisual3DBloom: React.FC = (): React.ReactElement => (
  <EffectComposer multisampling={0}>
    <Bloom
      intensity={1.5}
      luminanceThreshold={0.1}
      luminanceSmoothing={0.8}
      mipmapBlur
    />
  </EffectComposer>
);

const HeroVisual3DScene: React.FC<HeroVisual3DProps> = ({
  containerRef,
}): React.ReactElement => (
  <HeroVisual3DCanvasWrap aria-hidden>
    <Canvas
      eventSource={containerRef as RefObject<HTMLElement>}
      camera={{
        position: [0, 0, 7], fov: 50, near: 0.1, far: 40,
      }}
      dpr={[1, 1.75]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      }}
    >
      <HeroParticleField />
      <HeroVisual3DBloom />
    </Canvas>
  </HeroVisual3DCanvasWrap>
);

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Isolated Hero GPU layer — 1.5k amber particles, bloom glow, pointer magnetic inertia.
 */
export const HeroVisual3D: React.FC<HeroVisual3DProps> = ({
  containerRef,
}): React.ReactElement | null => {
  const reduced: boolean = usePrefersReducedMotion();
  const webglAvailable: boolean = useWebGLAvailable();

  if (!FORCE_SHOW_3D && (reduced || !webglAvailable)) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <HeroVisual3DScene containerRef={containerRef} />
    </Suspense>
  );
};
