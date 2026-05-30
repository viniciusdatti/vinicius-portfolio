export interface CoverFocalPoint {
  x: number;
  y: number;
  containerX?: number;
  containerY?: number;
}

export interface ObjectFitCoverPosition {
  xPercent: number;
  yPercent: number;
}

export type ComputeObjectFitCoverPositionFn = (
  imageWidth: number,
  imageHeight: number,
  containerWidth: number,
  containerHeight: number,
  focal: CoverFocalPoint,
) => ObjectFitCoverPosition;

export type FormatObjectFitCoverPositionFn = (
  position: ObjectFitCoverPosition,
) => string;
