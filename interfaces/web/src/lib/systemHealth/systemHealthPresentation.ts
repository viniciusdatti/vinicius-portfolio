// Libraries
import { TFunction } from 'i18next';

// Hooks
import { SystemHealthStatus } from '../../hooks/useSystemHealth';

// Types
import { OperationalStatusTone } from '../../types/telemetry';

export interface SystemHealthLabelKeys {
  online: string;
  offline: string;
  checking: string;
}

export const SYSTEM_HEALTH_LABEL_KEYS = {
  homeRealtime: {
    online: 'home.realtime.apiLive',
    offline: 'home.realtime.apiAway',
    checking: 'home.realtime.apiSync',
  },
  systemBar: {
    online: 'system.status.apiOnline',
    offline: 'system.status.apiOffline',
    checking: 'system.status.apiChecking',
  },
  observatory: {
    online: 'home.liveLabPreview.badge',
    offline: 'home.hero.liveMicro.apiSync',
    checking: 'home.hero.liveMicro.apiSync',
  },
  heroLiveMicro: {
    online: 'home.hero.liveMicro.apiLive',
    offline: 'home.hero.liveMicro.apiAway',
    checking: 'home.hero.liveMicro.apiSync',
  },
  heroTelemetry: {
    online: 'home.hero.telemetry.statusOnline',
    offline: 'home.hero.telemetry.statusOffline',
    checking: 'home.hero.telemetry.statusChecking',
  },
  liveLabTeaserTransport: {
    online: 'home.liveLabPreview.metrics.transportLive',
    offline: 'home.liveLabPreview.metrics.transportIdle',
    checking: 'home.liveLabPreview.metrics.transportSync',
  },
} as const;

export type SystemHealthLabelContext = keyof typeof SYSTEM_HEALTH_LABEL_KEYS;

/**
 * Maps API health probe status to the operational tone used by status pills.
 */
export const resolveSystemHealthTone = (
  status: SystemHealthStatus,
): OperationalStatusTone => {
  if (status === SystemHealthStatus.Online) {
    return OperationalStatusTone.Ok;
  }
  if (status === SystemHealthStatus.Offline) {
    return OperationalStatusTone.Warn;
  }
  return OperationalStatusTone.Idle;
};

/**
 * Resolves a localized health label from a single key set — avoids duplicating if/else chains.
 */
export const resolveSystemHealthLabel = (
  status: SystemHealthStatus,
  t: TFunction,
  context: SystemHealthLabelContext,
): string => {
  const keys: SystemHealthLabelKeys = SYSTEM_HEALTH_LABEL_KEYS[context];
  if (status === SystemHealthStatus.Online) {
    return t(keys.online);
  }
  if (status === SystemHealthStatus.Offline) {
    return t(keys.offline);
  }
  return t(keys.checking);
};

/** True when the API health probe reports an online status. */
export const resolveSystemHealthIsLive = (status: SystemHealthStatus): boolean => (
  status === SystemHealthStatus.Online
);
