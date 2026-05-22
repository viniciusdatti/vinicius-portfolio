/* eslint-disable react/no-unknown-property -- R3F JSX intrinsics */
// Core
import React, { useRef } from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import type { Mesh } from 'three';

// Types
import type { HeroCanvasPointer } from '@/hooks/useHeroCanvasPointer.types';

// Components
import {
  PHYSICAL_SPRING_DAMPING,
  PHYSICAL_SPRING_MASS,
  PHYSICAL_SPRING_STIFFNESS,
  stepPhysicalSpring,
} from '@/lib/motionPhysics';

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface PortraitMeshProps {
  imageSrc: string;
  pointer: HeroCanvasPointer;
  accentHex: string;
}

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Textured portrait plane with pointer-driven spring tilt (meshStandard, no external glTF).
 */
export function PortraitMesh({
  imageSrc,
  pointer,
  accentHex,
}: PortraitMeshProps): React.ReactElement {
  const meshRef = useRef<Mesh | null>(null);
  const texture = useTexture(imageSrc);
  const rotXVelocity = useRef<number>(0);
  const rotYVelocity = useRef<number>(0);

  useFrame((_, delta: number): void => {
    if (!meshRef.current) {
      return;
    }
    const tiltStrength: number = pointer.active ? 0.22 : 0.08;
    const targetRotX: number = (pointer.y - 0.5) * -tiltStrength;
    const targetRotY: number = (pointer.x - 0.5) * tiltStrength;

    const nextRotX = stepPhysicalSpring(
      meshRef.current.rotation.x,
      rotXVelocity.current,
      targetRotX,
      delta,
      PHYSICAL_SPRING_STIFFNESS,
      PHYSICAL_SPRING_DAMPING,
      PHYSICAL_SPRING_MASS,
    );
    const nextRotY = stepPhysicalSpring(
      meshRef.current.rotation.y,
      rotYVelocity.current,
      targetRotY,
      delta,
      PHYSICAL_SPRING_STIFFNESS,
      PHYSICAL_SPRING_DAMPING,
      PHYSICAL_SPRING_MASS,
    );

    meshRef.current.rotation.x = nextRotX.value;
    meshRef.current.rotation.y = nextRotY.value;
    rotXVelocity.current = nextRotX.velocity;
    rotYVelocity.current = nextRotY.velocity;
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[2.5, 2, 4]} intensity={0.75} color={accentHex} />
      <directionalLight position={[-2, 0.5, 2]} intensity={0.25} />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[2.4, 3]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.18}
          roughness={0.62}
          toneMapped
        />
      </mesh>
    </>
  );
}
