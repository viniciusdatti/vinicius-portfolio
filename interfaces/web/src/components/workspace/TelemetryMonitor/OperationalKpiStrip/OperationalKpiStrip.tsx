/**
 * @fileoverview Operational KPI strip above the Live Lab sensor grid.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Core
import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { SensorStatus } from '@/types/telemetry';
import type { OperationalKpiStripProps } from '@/components/workspace/TelemetryMonitor/OperationalKpiStrip/OperationalKpiStrip.types';

// Components
import { TelemetryValueFlash } from '@/components/workspace/TelemetryMonitor/TelemetryValueFlash';
import {
  KpiLabel,
  KpiMeta,
  KpiStripRoot,
  KpiTile,
  KpiValue,
} from '@/components/workspace/TelemetryMonitor/OperationalKpiStrip/OperationalKpiStrip.style';

/* *************************************************************************************************
 *************************************** COMPONENT HANDLING ****************************************
 ************************************************************************************************ */

export const OperationalKpiStrip: React.FC<OperationalKpiStripProps> = ({
  readings,
  tickCount,
  connected,
}): React.ReactElement => {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const warnCount: number = readings.filter((r) => r.status === SensorStatus.Warn).length;
    const critCount: number = readings.filter((r) => r.status === SensorStatus.Critical).length;
    const avgLoad: number = readings.length === 0
      ? 0
      : readings.reduce((sum, r) => {
        const cap: number = r.threshold_critical * 1.1;
        return sum + Math.min((r.value / cap) * 100, 100);
      }, 0) / readings.length;

    return {
      warnCount,
      critCount,
      avgLoad,
      sensorCount: readings.length,
    };
  }, [readings]);

  const alertAccent = ((): 'critical' | 'warn' | 'default' => {
    if (stats.critCount > 0) return 'critical';
    if (stats.warnCount > 0) return 'warn';
    return 'default';
  })();

  return (
    <KpiStripRoot aria-label={t('liveLab.monitor.kpiStripLabel')}>
      <KpiTile $accent={connected ? 'live' : 'default'}>
        <KpiLabel>{t('liveLab.monitor.kpiStream')}</KpiLabel>
        <TelemetryValueFlash cellId="kpi-stream" valueKey={connected ? 'live' : 'off'}>
          <KpiValue $live={connected}>
            {connected ? t('liveLab.monitor.kpiLive') : '—'}
          </KpiValue>
        </TelemetryValueFlash>
        <KpiMeta>
          <TelemetryValueFlash cellId="kpi-tick" valueKey={tickCount}>
            {t('liveLab.monitor.kpiTick', { tick: tickCount })}
          </TelemetryValueFlash>
        </KpiMeta>
      </KpiTile>
      <KpiTile>
        <KpiLabel>{t('liveLab.monitor.kpiSensors')}</KpiLabel>
        <TelemetryValueFlash cellId="kpi-sensors" valueKey={stats.sensorCount}>
          <KpiValue>{stats.sensorCount}</KpiValue>
        </TelemetryValueFlash>
        <KpiMeta>{t('liveLab.monitor.kpiChannels')}</KpiMeta>
      </KpiTile>
      <KpiTile $accent={alertAccent}>
        <KpiLabel>{t('liveLab.monitor.kpiAlerts')}</KpiLabel>
        <TelemetryValueFlash
          cellId="kpi-alerts"
          valueKey={`${stats.critCount}-${stats.warnCount}`}
        >
          <KpiValue>
            {stats.critCount}
            /
            {stats.warnCount}
          </KpiValue>
        </TelemetryValueFlash>
        <KpiMeta>{t('liveLab.monitor.kpiCritWarn')}</KpiMeta>
      </KpiTile>
      <KpiTile>
        <KpiLabel>{t('liveLab.monitor.kpiLoad')}</KpiLabel>
        <TelemetryValueFlash cellId="kpi-load" valueKey={stats.avgLoad.toFixed(0)}>
          <KpiValue>
            {stats.avgLoad.toFixed(0)}
            %
          </KpiValue>
        </TelemetryValueFlash>
        <KpiMeta>{t('liveLab.monitor.kpiAvgThreshold')}</KpiMeta>
      </KpiTile>
    </KpiStripRoot>
  );
};
