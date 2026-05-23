/**
 * Motion coverage map — expected animation contract per public surface.
 * Use when wiring new sections or debugging scroll/route reveals.
 */

// =================================================================================================
// ============================================= ENUMS =============================================
// =================================================================================================

export enum MotionSurfaceKind {
  RouteTransition = 'route_transition',
  MountEntrance = 'mount_entrance',
  ScrollReveal = 'scroll_reveal',
  ScrollPinScrub = 'scroll_pin_scrub',
  Interaction = 'interaction',
  None = 'none',
}

export enum MotionCoverageStatus {
  Wired = 'wired',
  Partial = 'partial',
  Planned = 'planned',
}

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

export interface MotionSurfaceEntry {
  block: string;
  kind: MotionSurfaceKind;
  status: MotionCoverageStatus;
  notes: string;
}

export interface MotionRouteCoverage {
  route: string;
  surfaces: MotionSurfaceEntry[];
}

// =================================================================================================
// ============================================ REGISTRY ===========================================
// =================================================================================================

/** Canonical motion expectations — keep in sync when adding pages or Home chapters. */
export const MOTION_ROUTE_COVERAGE: MotionRouteCoverage[] = [
  {
    route: '/',
    surfaces: [
      {
        block: 'Layout.PageMotionLayer',
        kind: MotionSurfaceKind.RouteTransition,
        status: MotionCoverageStatus.Wired,
        notes: 'pageEnter on route change; initial mount animates when AnimatePresence initial is on',
      },
      {
        block: 'Hero',
        kind: MotionSurfaceKind.MountEntrance,
        status: MotionCoverageStatus.Wired,
        notes: 'heroEntranceStagger on load (hidden → show)',
      },
      {
        block: 'RealtimePresence',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'HomeSectionReveal shell + inner stagger',
      },
      {
        block: 'HomeManifestoStrip',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'manifesto phrase stagger on scroll',
      },
      {
        block: 'HomeWorkStage',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'rail stagger + runway / case index whileInView',
      },
      {
        block: 'HomeLiveLabImmersion',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'copy stagger + visual section; desktop adds GSAP pin scrub',
      },
      {
        block: 'HomeCapabilityRail',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'header stagger + featured row + list stagger',
      },
      {
        block: 'HomeChapterClose',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'about + contact chapter columns',
      },
    ],
  },
  {
    route: '/about',
    surfaces: [
      {
        block: 'Layout.PageMotionLayer',
        kind: MotionSurfaceKind.RouteTransition,
        status: MotionCoverageStatus.Wired,
        notes: 'pageEnter',
      },
      {
        block: 'PageHeader + sections',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'useScrollMotion on titles, stagger blocks, timeline',
      },
    ],
  },
  {
    route: '/projects',
    surfaces: [
      {
        block: 'Layout.PageMotionLayer',
        kind: MotionSurfaceKind.RouteTransition,
        status: MotionCoverageStatus.Wired,
        notes: 'pageEnter',
      },
      {
        block: 'PageHeader + filters + grid',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'useScrollMotion; ProjectShowcaseGrid has stagger',
      },
    ],
  },
  {
    route: '/skills',
    surfaces: [
      {
        block: 'Layout.PageMotionLayer',
        kind: MotionSurfaceKind.RouteTransition,
        status: MotionCoverageStatus.Wired,
        notes: 'pageEnter',
      },
      {
        block: 'Skills sections',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'useScrollMotion across hero, matrix, radar',
      },
    ],
  },
  {
    route: '/live-lab',
    surfaces: [
      {
        block: 'Layout.PageMotionLayer',
        kind: MotionSurfaceKind.RouteTransition,
        status: MotionCoverageStatus.Wired,
        notes: 'workspaceEnter fade only',
      },
      {
        block: 'BootHandshake + TelemetryMonitor',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'operational strip + monitor whileInView',
      },
      {
        block: 'Live Lab pin (desktop)',
        kind: MotionSurfaceKind.ScrollPinScrub,
        status: MotionCoverageStatus.Wired,
        notes: 'GSAP ScrollTrigger on workspace + home immersion',
      },
      {
        block: 'LiveChannel chat UI',
        kind: MotionSurfaceKind.None,
        status: MotionCoverageStatus.Planned,
        notes: 'component exists; not mounted in WorkspaceShell yet',
      },
    ],
  },
  {
    route: '/contact',
    surfaces: [
      {
        block: 'Layout.PageMotionLayer',
        kind: MotionSurfaceKind.RouteTransition,
        status: MotionCoverageStatus.Wired,
        notes: 'pageEnter',
      },
      {
        block: 'Form + info cards',
        kind: MotionSurfaceKind.ScrollReveal,
        status: MotionCoverageStatus.Wired,
        notes: 'useScrollMotion',
      },
    ],
  },
];
