// Core
import React, {
  Suspense,
  useEffect,
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
import { useMotionLifecycle } from '@/hooks/useMotionLifecycle';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useWebGLAvailable } from '@/hooks/useWebGLAvailable';

// Types
import type { HeroVisual3DProps } from '@/components/Hero/HeroVisual3D.types';

// Components
import { HeroVisual3DCanvasWrap } from '@/components/Hero/HeroVisual3D.style';
import { stepPhysicalSpring } from '@/lib/motionPhysics';

/* *************************************************************************************************
 ******************************************** CONSTANTS ********************************************
 ************************************************************************************************ */

const PARTICLE_COUNT: number = 2600;
const SPHERE_RADIUS: number = 5.4;
const SPHERE_WIDTH_STRETCH: number = 1.22;
const SPHERE_HEIGHT_STRETCH: number = 0.94;
const AMBER_HEX: string = '#00E5FF';
/** Hard cap — fine star-dust; must not compete with headline or portrait. */
const PARTICLE_SIZE: number = 0.028;
const PARTICLE_OPACITY: number = 0.52;
const POINTER_SPREAD: number = 1.75;
const IDLE_DRIFT_X: number = 0.18;
const IDLE_DRIFT_Z: number = 0.14;
const FLOAT_AMPLITUDE_Y: number = 0.22;
const FLOAT_SPEED_Y: number = 0.38;
const DESKTOP_BREAKPOINT_PX: number = 1024;
const DESKTOP_BASE_OFFSET_X: number = 1.15;
const MOBILE_BASE_OFFSET_X: number = 0.15;
const POINTER_SPRING_STIFFNESS: number = 88;
const POINTER_SPRING_DAMPING: number = 18;
/** Subtle breathe — avoids collapsing the field to center (was 0.22–1.08). */
const BURST_CYCLE_S: number = 6.2;
const BURST_MIN_SCALE: number = 0.96;
const BURST_MAX_SCALE: number = 1.06;
const TAU: number = Math.PI * 2;

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

/**
 * Gentle idle orbit when the cursor is outside the hero (no snap to world origin).
 */
const resolveIdleOffset = (elapsedS: number): { x: number; z: number } => ({
  x: IDLE_DRIFT_X * Math.sin(elapsedS * 0.42),
  z: IDLE_DRIFT_Z * Math.cos(elapsedS * 0.36),
});

/**
 * Maps normalized hero coords (0–1) to magnetic X/Z offsets.
 */
const mapHeroPointerToOffset = (
  normX: number,
  normY: number,
): { x: number; z: number } => ({
  x: (normX - 0.5) * 2 * POINTER_SPREAD,
  z: (normY - 0.5) * 2 * POINTER_SPREAD,
});

const isPointerInsideHero = (
  clientX: number,
  clientY: number,
  rect: DOMRect,
): boolean => (
  clientX >= rect.left
  && clientX <= rect.right
  && clientY >= rect.top
  && clientY <= rect.bottom
);

/**
 * Subtle breathe scale — keeps the cloud readable without collapsing to center.
 */
const resolveBurstScale = (elapsedS: number): number => {
  const wave: number = 0.5 + 0.5 * Math.sin((elapsedS / BURST_CYCLE_S) * TAU);
  return BURST_MIN_SCALE + (BURST_MAX_SCALE - BURST_MIN_SCALE) * wave;
};

/**
 * Uniform volumetric sphere — avoids inner-shell clumping that reads as glowing orbs.
 */
const buildParticlePositions = (count: number, radius: number): Float32Array => {
  const positions: Float32Array = new Float32Array(count * 3);
  const goldenAngle: number = Math.PI * (3 - Math.sqrt(5));

  for (let i: number = 0; i < count; i += 1) {
    const t: number = (i + 0.5) / count;
    const y: number = 1 - t * 2;
    const ring: number = Math.sqrt(Math.max(0, 1 - y * y));
    const theta: number = goldenAngle * i;
    const shell: number = Math.cbrt(t);
    const dist: number = radius * shell;

    positions[i * 3] = Math.cos(theta) * ring * dist * SPHERE_WIDTH_STRETCH;
    positions[i * 3 + 1] = y * dist * SPHERE_HEIGHT_STRETCH;
    positions[i * 3 + 2] = Math.sin(theta) * ring * dist;
  }

  return positions;
};

/* *************************************************************************************************
 ****************************************** SUBCOMPONENTS ******************************************
 ************************************************************************************************ */

interface HeroPointerTarget {
  x: number;
  z: number;
  active: boolean;
}

interface HeroParticleSpringState {
  posX: number;
  posZ: number;
  velX: number;
  velZ: number;
}

interface HeroParticleFieldProps {
  burstEnabled: boolean;
  floatEnabled: boolean;
  interactionEnabled: boolean;
  loopActive: boolean;
  containerRef: RefObject<HTMLElement | null>;
}

const HeroParticleField: React.FC<HeroParticleFieldProps> = ({
  burstEnabled,
  floatEnabled,
  interactionEnabled,
  loopActive,
  containerRef,
}): React.ReactElement => {
  const groupRef = useRef<Group | null>(null);
  const pointerTargetRef = useRef<HeroPointerTarget>({ x: 0, z: 0, active: false });
  const springRef = useRef<HeroParticleSpringState>({
    posX: 0,
    posZ: 0,
    velX: 0,
    velZ: 0,
  });
  const positions: Float32Array = useMemo(
    (): Float32Array => buildParticlePositions(PARTICLE_COUNT, SPHERE_RADIUS),
    [],
  );

  useEffect((): (() => void) | undefined => {
    if (!interactionEnabled) {
      pointerTargetRef.current = { x: 0, z: 0, active: false };
      return undefined;
    }

    const onPointerMove = (event: PointerEvent): void => {
      const heroEl: HTMLElement | null = containerRef.current;
      if (!heroEl) {
        return;
      }
      const rect: DOMRect = heroEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }

      if (!isPointerInsideHero(event.clientX, event.clientY, rect)) {
        pointerTargetRef.current.active = false;
        return;
      }

      const normX: number = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      const normY: number = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
      const offset = mapHeroPointerToOffset(normX, normY);
      pointerTargetRef.current = {
        x: offset.x,
        z: offset.z,
        active: true,
      };
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return (): void => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [containerRef, interactionEnabled]);

  useFrame((state, delta: number): void => {
    if (!loopActive) {
      return;
    }

    const group: Group | null = groupRef.current;
    if (!group) {
      return;
    }

    if (burstEnabled) {
      const burstScale: number = resolveBurstScale(state.clock.elapsedTime);
      group.scale.setScalar(burstScale);
    } else {
      group.scale.setScalar(1);
    }

    group.position.y = floatEnabled
      ? Math.sin(state.clock.elapsedTime * FLOAT_SPEED_Y) * FLOAT_AMPLITUDE_Y
      : 0;

    const idle = resolveIdleOffset(state.clock.elapsedTime);
    const pointerTarget: HeroPointerTarget = pointerTargetRef.current;
    const targetX: number = interactionEnabled && pointerTarget.active
      ? pointerTarget.x
      : idle.x;
    const targetZ: number = interactionEnabled && pointerTarget.active
      ? pointerTarget.z
      : idle.z;

    const spring: HeroParticleSpringState = springRef.current;
    const nextX = stepPhysicalSpring(
      spring.posX,
      spring.velX,
      targetX,
      delta,
      POINTER_SPRING_STIFFNESS,
      POINTER_SPRING_DAMPING,
    );
    const nextZ = stepPhysicalSpring(
      spring.posZ,
      spring.velZ,
      targetZ,
      delta,
      POINTER_SPRING_STIFFNESS,
      POINTER_SPRING_DAMPING,
    );
    springRef.current = {
      posX: nextX.value,
      posZ: nextZ.value,
      velX: nextX.velocity,
      velZ: nextZ.velocity,
    };

    group.position.x = (
      state.size.width >= DESKTOP_BREAKPOINT_PX
        ? DESKTOP_BASE_OFFSET_X
        : MOBILE_BASE_OFFSET_X
    ) + nextX.value;
    group.position.z = nextZ.value;
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
      intensity={0.38}
      luminanceThreshold={0.42}
      luminanceSmoothing={0.92}
      mipmapBlur
    />
  </EffectComposer>
);

interface HeroVisual3DSceneProps extends HeroVisual3DProps {
  burstEnabled: boolean;
  floatEnabled: boolean;
  interactionEnabled: boolean;
  loopActive: boolean;
}

const HeroVisual3DScene: React.FC<HeroVisual3DSceneProps> = ({
  containerRef,
  burstEnabled,
  floatEnabled,
  interactionEnabled,
  loopActive,
}): React.ReactElement => (
  <HeroVisual3DCanvasWrap aria-hidden data-testid="hero-visual-3d">
    <Canvas
      camera={{
        position: [0.45, 0.1, 5.4], fov: 58, near: 0.1, far: 48,
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
        burstEnabled={burstEnabled}
        floatEnabled={floatEnabled}
        interactionEnabled={interactionEnabled}
        loopActive={loopActive}
        containerRef={containerRef}
      />
      <HeroVisual3DBloom />
    </Canvas>
  </HeroVisual3DCanvasWrap>
);

/* *************************************************************************************************
 ******************************************** COMPONENT ********************************************
 ************************************************************************************************ */

/**
 * Isolated Hero GPU layer — fine cyan star-dust, subtle bloom, breathe + pointer inertia.
 */
export const HeroVisual3D: React.FC<HeroVisual3DProps> = ({
  containerRef,
}): React.ReactElement | null => {
  const reduced: boolean = usePrefersReducedMotion();
  const webglAvailable: boolean = useWebGLAvailable();
  const { isActive } = useMotionLifecycle(containerRef, {
    observeIntersection: true,
  });

  if (!webglAvailable) {
    return null;
  }

  const burstEnabled: boolean = !reduced;
  const floatEnabled: boolean = !reduced;
  const interactionEnabled: boolean = !reduced;
  const loopActive: boolean = isActive && !reduced;

  return (
    <Suspense fallback={null}>
      <HeroVisual3DScene
        containerRef={containerRef}
        burstEnabled={burstEnabled}
        floatEnabled={floatEnabled}
        interactionEnabled={interactionEnabled}
        loopActive={loopActive}
      />
    </Suspense>
  );
};
