// Libraries
import type { CoverFocalPoint } from '../lib/objectFitCover.types';
import {
  computeObjectFitCoverPosition,
  formatObjectFitCoverPosition,
} from '../lib/objectFitCover';

export const AVATAR_IMAGE_NATURAL_WIDTH: number = 768;

export const AVATAR_IMAGE_NATURAL_HEIGHT: number = 1344;

/** theme.sizes.avatar.about (200px) minus 2px border on each side. */
export const ABOUT_AVATAR_CONTENT_PX: number = 196;

/**
 * Display frame for Hero / About — 5:6 bust crop (face-forward, calibrated via browser MCP).
 */
export const AVATAR_PORTRAIT_FRAME_ASPECT_RATIO: string = '5 / 6';

/** Reference width (px) for SSR/fallback object-position before ResizeObserver runs. */
const AVATAR_PORTRAIT_FRAME_REF_WIDTH_PX: number = 240;

/** Reference height (px) for 5:6 frame at {@link AVATAR_PORTRAIT_FRAME_REF_WIDTH_PX}. */
const AVATAR_PORTRAIT_FRAME_REF_HEIGHT_PX: number = 288;

/**
 * Face centroid in public/avatar.png (768×1344).
 * Calibrated via browser MCP — eyes sit ~42% from the top of the source frame.
 */
export const AVATAR_IMAGE_FOCAL_POINT: CoverFocalPoint = {
  x: 0.5,
  y: 0.42,
  containerX: 0.5,
  containerY: 0.5,
};

/** Fallback object-position (3:4 @ 240×320) before frame measurement. */
export const AVATAR_PORTRAIT_OBJECT_POSITION: string = formatObjectFitCoverPosition(
  computeObjectFitCoverPosition(
    AVATAR_IMAGE_NATURAL_WIDTH,
    AVATAR_IMAGE_NATURAL_HEIGHT,
    AVATAR_PORTRAIT_FRAME_REF_WIDTH_PX,
    AVATAR_PORTRAIT_FRAME_REF_HEIGHT_PX,
    AVATAR_IMAGE_FOCAL_POINT,
  ),
);

/**
 * Derives CSS object-position for a portrait frame of the given size (px).
 * Returns the fallback when width/height are not yet measurable.
 */
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

/** object-position for legacy square crops (R3D fallback bust). */
export const AVATAR_CIRCULAR_COVER_POSITION: string = formatObjectFitCoverPosition(
  computeObjectFitCoverPosition(
    AVATAR_IMAGE_NATURAL_WIDTH,
    AVATAR_IMAGE_NATURAL_HEIGHT,
    ABOUT_AVATAR_CONTENT_PX,
    ABOUT_AVATAR_CONTENT_PX,
    AVATAR_IMAGE_FOCAL_POINT,
  ),
);
