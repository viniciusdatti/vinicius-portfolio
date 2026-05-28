// Core
import React from 'react';

// Libraries
import {
  resolvePhysicalTilt,
} from '../../../lib/motionPhysics';

// Components
import { PortraitSceneR3D } from '../../atmosphere/PortraitSceneR3D';
import { motionPresets } from '../../../styles/motionPresets';

// Component
import type { HeroPortraitBustProps } from './HeroPortraitBust.types';
import { HeroPortraitBustRoot } from './HeroPortraitBust.style';

const PORTRAIT_FRAME_MAX_TILT_DEG: number = 3;

/**
 * Desktop hero void — lit portrait bust overlay (lazy WebGL) with spring frame tilt.
 */
export const HeroPortraitBust: React.FC<HeroPortraitBustProps> = ({
  imageSrc,
  pointer,
}): React.ReactElement => {
  const { rotateX, rotateY } = resolvePhysicalTilt(
    pointer.x,
    pointer.y,
    PORTRAIT_FRAME_MAX_TILT_DEG,
  );

  return (
    <HeroPortraitBustRoot
      aria-hidden
      animate={{
        rotateX: pointer.active ? rotateX : 0,
        rotateY: pointer.active ? rotateY : 0,
      }}
      transition={motionPresets.spring.physical}
    >
      <PortraitSceneR3D imageSrc={imageSrc} pointer={pointer} />
    </HeroPortraitBustRoot>
  );
};
