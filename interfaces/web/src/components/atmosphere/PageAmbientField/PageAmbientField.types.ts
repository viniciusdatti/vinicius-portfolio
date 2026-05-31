// Lib
import { TelemetryFieldVariant } from '../../../lib/telemetryFieldCanvas/index';

export enum PageAmbientFieldKind {
  HomeObservatory = 'home_observatory',
  AboutMesh = 'about_mesh',
  SkillsConstellation = 'skills_constellation',
  ProjectsWireframe = 'projects_wireframe',
}

export interface PageAmbientFieldProps {
  kind: PageAmbientFieldKind;
  pulse?: number;
  scrollOffset?: number;
}

export const resolveAmbientVariant = (kind: PageAmbientFieldKind): TelemetryFieldVariant => {
  if (kind === PageAmbientFieldKind.HomeObservatory) {
    return TelemetryFieldVariant.Observatory;
  }
  if (kind === PageAmbientFieldKind.AboutMesh) {
    return TelemetryFieldVariant.TopologicalMesh;
  }
  if (kind === PageAmbientFieldKind.SkillsConstellation) {
    return TelemetryFieldVariant.Constellation;
  }
  return TelemetryFieldVariant.ProjectsWireframe;
};

export const resolveAmbientKindFromPath = (pathname: string): PageAmbientFieldKind | null => {
  if (pathname === '/live-lab') {
    return null;
  }
  if (pathname === '/' || pathname === '/contact') {
    return PageAmbientFieldKind.HomeObservatory;
  }
  if (pathname === '/about') {
    return PageAmbientFieldKind.AboutMesh;
  }
  if (pathname === '/skills') {
    return PageAmbientFieldKind.SkillsConstellation;
  }
  if (pathname === '/projects') {
    return PageAmbientFieldKind.ProjectsWireframe;
  }
  return PageAmbientFieldKind.HomeObservatory;
};
