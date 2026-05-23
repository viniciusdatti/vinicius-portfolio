// Types
import { ProjectCanvasTone } from '@/components/ProjectShowcase/ProjectShowcase.types';
import { TelemetryFieldVariant } from '@/lib/telemetryFieldCanvas';

/**
 * Maps project runway tone to Canvas2D preview variant.
 */
export const mapProjectCanvasTone = (tone: ProjectCanvasTone): TelemetryFieldVariant => {
  if (tone === ProjectCanvasTone.B) {
    return TelemetryFieldVariant.WorkB;
  }
  if (tone === ProjectCanvasTone.C) {
    return TelemetryFieldVariant.WorkC;
  }
  return TelemetryFieldVariant.WorkA;
};
