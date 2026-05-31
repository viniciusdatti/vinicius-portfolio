// Libraries
import { ProjectCanvasTone } from '../../components/ProjectShowcase/ProjectShowcase.types';
import { TelemetryFieldVariant } from '../telemetryFieldCanvas/index';

export const mapProjectCanvasTone = (tone: ProjectCanvasTone): TelemetryFieldVariant => {
  if (tone === ProjectCanvasTone.B) {
    return TelemetryFieldVariant.WorkB;
  }
  if (tone === ProjectCanvasTone.C) {
    return TelemetryFieldVariant.WorkC;
  }
  return TelemetryFieldVariant.WorkA;
};
