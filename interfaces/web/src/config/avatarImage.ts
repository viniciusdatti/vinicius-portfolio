// Lib
import { CoverFocalPoint, computeObjectFitCoverPosition, formatObjectFitCoverPosition } from '../lib/dom';

export const AVATAR_IMAGE_NATURAL_WIDTH: number = 768;

export const AVATAR_IMAGE_NATURAL_HEIGHT: number = 1344;

export const ABOUT_AVATAR_CONTENT_PX: number = 196;

export const AVATAR_PORTRAIT_FRAME_ASPECT_RATIO: string = '5 / 6';

const AVATAR_PORTRAIT_FRAME_REF_WIDTH_PX: number = 240;

const AVATAR_PORTRAIT_FRAME_REF_HEIGHT_PX: number = 288;

export const AVATAR_IMAGE_FOCAL_POINT: CoverFocalPoint = {
  x: 0.5,
  y: 0.42,
  containerX: 0.5,
  containerY: 0.5,
};

export const AVATAR_PORTRAIT_OBJECT_POSITION: string = formatObjectFitCoverPosition(
  computeObjectFitCoverPosition(
    AVATAR_IMAGE_NATURAL_WIDTH,
    AVATAR_IMAGE_NATURAL_HEIGHT,
    AVATAR_PORTRAIT_FRAME_REF_WIDTH_PX,
    AVATAR_PORTRAIT_FRAME_REF_HEIGHT_PX,
    AVATAR_IMAGE_FOCAL_POINT,
  ),
);

export const computeAvatarPortraitObjectPosition = (
  containerWidth: number,
  containerHeight: number,
): string => {
  if (containerWidth <= 0 || containerHeight <= 0) {
    return AVATAR_PORTRAIT_OBJECT_POSITION;
  }

  return formatObjectFitCoverPosition(
    computeObjectFitCoverPosition(
      AVATAR_IMAGE_NATURAL_WIDTH,
      AVATAR_IMAGE_NATURAL_HEIGHT,
      containerWidth,
      containerHeight,
      AVATAR_IMAGE_FOCAL_POINT,
    ),
  );
};

export const AVATAR_CIRCULAR_COVER_POSITION: string = formatObjectFitCoverPosition(
  computeObjectFitCoverPosition(
    AVATAR_IMAGE_NATURAL_WIDTH,
    AVATAR_IMAGE_NATURAL_HEIGHT,
    ABOUT_AVATAR_CONTENT_PX,
    ABOUT_AVATAR_CONTENT_PX,
    AVATAR_IMAGE_FOCAL_POINT,
  ),
);
