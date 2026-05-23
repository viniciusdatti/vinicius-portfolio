/* eslint-disable react/no-unknown-property -- R3F JSX intrinsic elements */
// Core
import React, { useRef } from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import type { Group } from 'three';

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

export interface LiveLabGridSceneProps {
  accentHex: string;
  backgroundHex: string;
}

/* *************************************************************************************************
 ******************************************** COMPONENT ********************************************
 ************************************************************************************************ */

/**
 * Rotating floor grid with fog — Live Lab WebGL atmosphere core.
 */
export const LiveLabGridScene = ({
  accentHex,
  backgroundHex,
}: LiveLabGridSceneProps): React.ReactElement => {
  const groupRef = useRef<Group | null>(null);

  useFrame((_, delta: number): void => {
    if (!groupRef.current) {
      return;
    }
    groupRef.current.rotation.z += delta * 0.04;
  });

  return (
    <>
      <color attach="background" args={[backgroundHex]} />
      <fog attach="fog" args={[backgroundHex, 6, 22]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 2]} intensity={0.55} color={accentHex} />
      <group ref={groupRef} position={[0, -1.2, 0]} rotation={[Math.PI / 2.15, 0, 0]}>
        <Grid
          args={[24, 24]}
          cellSize={0.55}
          cellThickness={0.6}
          sectionSize={2.2}
          sectionThickness={1}
          fadeDistance={20}
          fadeStrength={1.2}
          infiniteGrid
          cellColor={accentHex}
          sectionColor={accentHex}
        />
      </group>
    </>
  );
};
