// Core
import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import { SensorStatus, type SensorReading } from '@/types/telemetry';

// Components
import {
  KpiLabel,
  KpiMeta,
  KpiStripRoot,
  KpiTile,
  KpiValue,
} from '@/components/workspace/TelemetryMonitor/OperationalKpiStrip.style';

interface OperationalKpiStripProps {
  readings: SensorReading[];
  tickCount: number;
  connected: boolean;
}

export function OperationalKpiStrip({
  readings,
  tickCount,
  connected,
}: OperationalKpiStripProps): React.ReactElement {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const warnCount = readings.filter((r) => r.status === SensorStatus.Warn).length;
    const critCount = readings.filter((r) => r.status === SensorStatus.Critical).length;
    const avgLoad = readings.length === 0
      ? 0
      : readings.reduce((sum, r) => {
        const cap = r.threshold_critical * 1.1;
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
        <KpiValue $live={connected}>
          {connected ? t('liveLab.monitor.kpiLive') : '—'}
        </KpiValue>
        <KpiMeta>
          {t('liveLab.monitor.kpiTick', { tick: tickCount })}
        </KpiMeta>
      </KpiTile>
      <KpiTile>
        <KpiLabel>{t('liveLab.monitor.kpiSensors')}</KpiLabel>
        <KpiValue>{stats.sensorCount}</KpiValue>
        <KpiMeta>{t('liveLab.monitor.kpiChannels')}</KpiMeta>
      </KpiTile>
      <KpiTile $accent={alertAccent}>
        <KpiLabel>{t('liveLab.monitor.kpiAlerts')}</KpiLabel>
        <KpiValue>
          {stats.critCount}
          /
          {stats.warnCount}
        </KpiValue>
        <KpiMeta>{t('liveLab.monitor.kpiCritWarn')}</KpiMeta>
      </KpiTile>
      <KpiTile>
        <KpiLabel>{t('liveLab.monitor.kpiLoad')}</KpiLabel>
        <KpiValue>
          {stats.avgLoad.toFixed(0)}
          %
        </KpiValue>
        <KpiMeta>{t('liveLab.monitor.kpiAvgThreshold')}</KpiMeta>
      </KpiTile>
    </KpiStripRoot>
  );
}
