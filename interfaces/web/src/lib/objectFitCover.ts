// Types
import type {
  ComputeObjectFitCoverPositionFn,
  CoverFocalPoint,
  FormatObjectFitCoverPositionFn,
  ObjectFitCoverPosition,
} from '@/lib/objectFitCover.types';

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

/**
 * Computes object-position (%) so a normalized focal point appears at the container center
 * with object-fit: cover (same math as background-position after cover sizing).
 */
export const computeObjectFitCoverPosition: ComputeObjectFitCoverPositionFn = (
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number,
  focal: CoverFocalPoint,
): ObjectFitCoverPosition => {
  const zoom: number = Math.max(
    containerWidth / imageWidth,
    containerHeight / imageHeight,
  );
  const renderedWidth: number = imageWidth * zoom;
  const renderedHeight: number = imageHeight * zoom;
  const containerAnchorX: number = (focal.containerX ?? 0.5) * containerWidth;
  const containerAnchorY: number = (focal.containerY ?? 0.5) * containerHeight;
  const focalPixelX: number = focal.x * renderedWidth;
  const focalPixelY: number = focal.y * renderedHeight;

  const widthDelta: number = containerWidth - renderedWidth;
  const heightDelta: number = containerHeight - renderedHeight;

  const xPercent: number = widthDelta === 0
    ? 50
    : ((containerAnchorX - focalPixelX) / widthDelta) * 100;
  const yPercent: number = heightDelta === 0
    ? 50
    : ((containerAnchorY - focalPixelY) / heightDelta) * 100;

  return { xPercent, yPercent };
};

/** Formats object-position for styled-components / CSS. */
export const formatObjectFitCoverPosition: FormatObjectFitCoverPositionFn = (
  position: ObjectFitCoverPosition,
): string => {
  const x: number = Math.round(position.xPercent * 100) / 100;
  const y: number = Math.round(position.yPercent * 100) / 100;
  return `${x}% ${y}%`;
};
