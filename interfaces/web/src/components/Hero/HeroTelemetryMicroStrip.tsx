// Core
import React, { useEffect, useMemo, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SystemHealthStatus, useSystemHealth } from '@/hooks/useSystemHealth';

// Components
import {
  TelemetryMicroDivider,
  TelemetryMicroDot,
  TelemetryMicroCursor,
  TelemetryMicroRoot,
  TelemetryMicroSegment,
} from '@/components/Hero/HeroTelemetryMicroStrip.style';

// =================================================================================================
// ============================================= CONSTANTS =========================================
// =================================================================================================

const CLOCK_TICK_MS: number = 100;

// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

const formatClockCycle = (ticks: number): string => {
  const cycle: number = Math.floor(ticks / 1000) % 1000;
  const sub: number = ticks % 1000;
  return `${String(cycle).padStart(3, '0')}:${String(sub).padStart(3, '0')}`;
};

const formatBuildHash = (version: string | null, fallback: string): string => {
  if (!version) {
    return fallback;
  }
  const normalized: string = version.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (normalized.length === 0) {
    return fallback;
  }
  return normalized.slice(0, 7).padEnd(7, '0');
};

// =================================================================================================
// ============================================ COMPONENT ==========================================
// =================================================================================================

/**
 * Compact OS-style telemetry bar — mobile hero baseline only.
 */
export const HeroTelemetryMicroStrip: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const reduced: boolean = usePrefersReducedMotion();
  const { status, version } = useSystemHealth();
  const [clockTicks, setClockTicks] = useState<number>(0);

  const isLive: boolean = status === SystemHealthStatus.Online;

  const statusValue: string = useMemo((): string => {
    if (status === SystemHealthStatus.Online) {
      return t('home.hero.telemetry.statusOnline');
    }
    if (status === SystemHealthStatus.Offline) {
      return t('home.hero.telemetry.statusOffline');
    }
    return t('home.hero.telemetry.statusChecking');
  }, [status, t]);

  const buildHash: string = useMemo(
    (): string => formatBuildHash(version, t('home.hero.telemetry.buildFallback')),
    [version, t],
  );

  const clockDisplay: string = formatClockCycle(clockTicks);

  useEffect(() => {
    if (reduced) {
      return undefined;
    }
    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      setClockTicks((prev: number): number => prev + 1);
    }, CLOCK_TICK_MS);
    return (): void => {
      clearInterval(intervalId);
    };
  }, [reduced]);

  return (
    <TelemetryMicroRoot aria-label={t('home.hero.telemetry.stripLabel')} role="status">
      <TelemetryMicroSegment>
        <TelemetryMicroDot $live={isLive} aria-hidden />
        {statusValue}
      </TelemetryMicroSegment>
      <TelemetryMicroDivider aria-hidden>|</TelemetryMicroDivider>
      <TelemetryMicroSegment $accent>
        {t('home.hero.telemetry.buildLabel')}
        {' '}
        {buildHash}
      </TelemetryMicroSegment>
      <TelemetryMicroDivider aria-hidden>|</TelemetryMicroDivider>
      <TelemetryMicroSegment>
        {t('home.hero.telemetry.clockLabel')}
        {' '}
        {clockDisplay}
        <TelemetryMicroCursor aria-hidden />
      </TelemetryMicroSegment>
      <TelemetryMicroDivider aria-hidden>|</TelemetryMicroDivider>
      <TelemetryMicroSegment>
        {t('home.hero.telemetry.stackChannels')}
      </TelemetryMicroSegment>
    </TelemetryMicroRoot>
  );
};
