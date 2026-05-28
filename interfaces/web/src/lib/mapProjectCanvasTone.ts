// Components
import { ProjectCanvasTone } from '../components/ProjectShowcase/ProjectShowcase.types';

// Component
import { TelemetryFieldVariant } from './telemetryFieldCanvas';

export const mapProjectCanvasTone = (tone: ProjectCanvasTone): TelemetryFieldVariant => {
  if (tone === ProjectCanvasTone.B) {
    return TelemetryFieldVariant.WorkB;
  }
  if (tone === ProjectCanvasTone.C) {
    return TelemetryFieldVariant.WorkC;
  }
  return TelemetryFieldVariant.WorkA;
};
