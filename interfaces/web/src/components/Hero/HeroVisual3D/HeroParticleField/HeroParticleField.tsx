// Core
import React, {
  useEffect,
  useMemo,
  useRef,
} from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import { AdditiveBlending, Group } from 'three';

// Types
import {
  HeroParticleFieldProps,
  HeroParticleSpringState,
  HeroPointerTarget,
} from './HeroParticleField.types';

// HeroVisual3D
import {
  AMBER_HEX,
  DESKTOP_BASE_OFFSET_X,
  DESKTOP_BREAKPOINT_PX,
  FLOAT_AMPLITUDE_Y,
  FLOAT_SPEED_Y,
  MOBILE_BASE_OFFSET_X,
  PARTICLE_COUNT,
  PARTICLE_OPACITY,
  PARTICLE_SIZE,
  POINTER_SPRING_DAMPING,
  POINTER_SPRING_STIFFNESS,
  SPHERE_RADIUS,
} from '../HeroVisual3D.constants';
import {
  buildParticlePositions,
  isPointerInsideHero,
  mapHeroPointerToOffset,
  resolveBurstScale,
  resolveIdleOffset,
} from '../HeroVisual3D.helpers';

// Lib
import { stepPhysicalSpring } from '../../../../lib/motion';

export const HeroParticleField: React.FC<HeroParticleFieldProps> = ({
  motionEnabled,
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
    if (!motionEnabled) {
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
  }, [containerRef, motionEnabled]);

  // Per-frame: burst scale, float Y, pointer spring toward hero cursor or idle drift.
  useFrame((state, delta: number): void => {
    if (!loopActive) {
      return;
    }

    const group: Group | null = groupRef.current;
    if (!group) {
      return;
    }

    if (motionEnabled) {
      const burstScale: number = resolveBurstScale(state.clock.elapsedTime);
      group.scale.setScalar(burstScale);
    } else {
      group.scale.setScalar(1);
    }

    group.position.y = motionEnabled
      ? Math.sin(state.clock.elapsedTime * FLOAT_SPEED_Y) * FLOAT_AMPLITUDE_Y
      : 0;

    const idle = resolveIdleOffset(state.clock.elapsedTime);
    const pointerTarget: HeroPointerTarget = pointerTargetRef.current;
    const targetX: number = motionEnabled && pointerTarget.active
      ? pointerTarget.x
      : idle.x;
    const targetZ: number = motionEnabled && pointerTarget.active
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
      <Points
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
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
