// Core
import React, { useEffect, useMemo, useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Hooks
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { SystemHealthStatus, useSystemHealth } from '../../hooks/useSystemHealth';

// Component
import { TelemetryStripStatusTone } from './HeroTelemetryStrip.types';
import {
  TelemetryCell,
  TelemetryCellLabel,
  TelemetryCellMeta,
  TelemetryCellValue,
  TelemetryCellValueRow,
  TelemetryHeaderStatus,
  TelemetryStatusDot,
  TelemetryStripBody,
  TelemetryStripHeader,
  TelemetryStripRoot,
} from './HeroTelemetryStrip.style';

const CLOCK_TICK_MS: number = 100;

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

/**
 * Formats monotonic clock cycles as a pseudo hardware tick counter.
 */
const formatClockCycle = (ticks: number): string => {
  const cycle: number = Math.floor(ticks / 1000) % 1000;
  const sub: number = ticks % 1000;
  return `${String(cycle).padStart(3, '0')}:${String(sub).padStart(3, '0')}`;
};

/**
 * Derives a short build hash from the API version string.
 */
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

const resolveStatusTone = (status: SystemHealthStatus): TelemetryStripStatusTone => {
  if (status === SystemHealthStatus.Online) {
    return TelemetryStripStatusTone.Online;
  }
  if (status === SystemHealthStatus.Offline) {
    return TelemetryStripStatusTone.Offline;
  }
  return TelemetryStripStatusTone.Checking;
};

/* *************************************************************************************************
 ******************************************** COMPONENT ********************************************
 ************************************************************************************************ */

/**
 * Operational telemetry readout — replaces marketing stat columns in the hero.
 */
export const HeroTelemetryStrip = (): React.ReactElement => {
  const { t } = useTranslation();
  const reduced: boolean = usePrefersReducedMotion();
  const { status, version } = useSystemHealth();
  const [clockTicks, setClockTicks] = useState<number>(0);

  const statusTone: TelemetryStripStatusTone = resolveStatusTone(status);
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
    <TelemetryStripRoot aria-label={t('home.hero.telemetry.stripLabel')}>
      <TelemetryStripHeader>
        <span>{t('home.hero.telemetry.headerTitle')}</span>
        <TelemetryHeaderStatus $live={isLive} role="status" aria-live="polite">
          {isLive
            ? t('home.hero.telemetry.headerFeed')
            : t('home.hero.telemetry.headerFeedIdle')}
        </TelemetryHeaderStatus>
      </TelemetryStripHeader>

      <TelemetryStripBody>
        <TelemetryCell $index={0}>
          <TelemetryCellLabel>{t('home.hero.telemetry.statusLabel')}</TelemetryCellLabel>
          <TelemetryCellValueRow>
            <TelemetryStatusDot $tone={statusTone} aria-hidden />
            <TelemetryCellValue>{statusValue}</TelemetryCellValue>
          </TelemetryCellValueRow>
          <TelemetryCellMeta>{t('home.hero.telemetry.statusMeta')}</TelemetryCellMeta>
        </TelemetryCell>

        <TelemetryCell $index={1}>
          <TelemetryCellLabel>{t('home.hero.telemetry.buildLabel')}</TelemetryCellLabel>
          <TelemetryCellValue $accent>{buildHash}</TelemetryCellValue>
          <TelemetryCellMeta>
            {version
              ? t('home.hero.telemetry.buildMeta', { version })
              : t('home.hero.telemetry.buildMetaFallback')}
          </TelemetryCellMeta>
        </TelemetryCell>

        <TelemetryCell $index={2}>
          <TelemetryCellLabel>{t('home.hero.telemetry.clockLabel')}</TelemetryCellLabel>
          <TelemetryCellValue>{clockDisplay}</TelemetryCellValue>
          <TelemetryCellMeta>{t('home.hero.telemetry.clockMeta')}</TelemetryCellMeta>
        </TelemetryCell>

        <TelemetryCell $index={3}>
          <TelemetryCellLabel>{t('home.hero.telemetry.stackLabel')}</TelemetryCellLabel>
          <TelemetryCellValue>{t('home.hero.telemetry.stackChannels')}</TelemetryCellValue>
          <TelemetryCellMeta>{t('home.hero.telemetry.stackMeta')}</TelemetryCellMeta>
        </TelemetryCell>
      </TelemetryStripBody>
    </TelemetryStripRoot>
  );
};
