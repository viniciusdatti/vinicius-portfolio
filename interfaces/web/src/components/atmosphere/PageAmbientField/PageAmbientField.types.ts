// Types
import { TelemetryFieldVariant } from '@/lib/telemetryFieldCanvas';

/* *************************************************************************************************
 ********************************************** ENUMS **********************************************
 ************************************************************************************************ */

export enum PageAmbientFieldKind {
  HomeObservatory = 'home_observatory',
  AboutMesh = 'about_mesh',
  SkillsConstellation = 'skills_constellation',
  ProjectsWireframe = 'projects_wireframe',
}

/* *************************************************************************************************
 ********************************************** TYPES **********************************************
 ************************************************************************************************ */

export interface PageAmbientFieldProps {
  kind: PageAmbientFieldKind;
  /** 0–1 socket or scroll-driven modulation. */
  pulse?: number;
  /** 0–1 scroll offset for wireframe parallax. */
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
