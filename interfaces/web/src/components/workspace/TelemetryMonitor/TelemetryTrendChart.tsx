// Core
import React, { useId, useMemo } from 'react';

// Libraries
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Types
import type { SensorReading } from '@/types/telemetry';
import { SensorStatus } from '@/types/telemetry';

// Components
import { resolveI18nKeyOrFallback } from '@/lib/i18nDisplay';
import {
  CHART_PLOT_HEIGHT_PX,
  ChartPlot,
  ChartRoot,
  ChartTitle,
} from '@/components/Workspace/TelemetryMonitor/TelemetryTrendChart.style';

interface TelemetryTrendChartProps {
  readings: SensorReading[];
  history: Record<string, number[]>;
  title: string;
}

interface ChartPoint {
  index: number;
  [sensorId: string]: number;
}

const AREA_FILL_TOP_OPACITY = 0.14;

const CHART_MARGIN = {
  top: 16,
  right: 0,
  left: -10,
  bottom: 0,
} as const;

const strokeForStatus = (
  status: SensorStatus,
  colors: { accent: string; warning: string; error: string; success: string },
): string => {
  if (status === SensorStatus.Critical) return colors.error;
  if (status === SensorStatus.Warn) return colors.warning;
  return colors.success;
};

export const TelemetryTrendChart = ({
  readings,
  history,
  title,
}: TelemetryTrendChartProps): React.ReactElement | null => {
  const { t } = useTranslation();
  const theme = useTheme();
  const reduced = usePrefersReducedMotion();
  const sampleAxisLabel: string = t('liveLab.monitor.sampleAxis');
  const gradientPrefix = useId().replace(/:/g, '');

  const chartData: ChartPoint[] = useMemo(() => {
    const maxLen: number = Math.max(
      0,
      ...readings.map((r: SensorReading) => history[r.id]?.length ?? 0),
    );
    const points: ChartPoint[] = [];
    for (let i = 0; i < maxLen; i += 1) {
      const row: ChartPoint = { index: i + 1 };
      readings.forEach((r: SensorReading) => {
        const values: number[] = history[r.id] ?? [];
        row[r.id] = values[i] ?? 0;
      });
      points.push(row);
    }
    return points;
  }, [readings, history]);

  if (chartData.length === 0) {
    return null;
  }

  const gridStroke = theme.colors.border;
  const tickColor = theme.colors.textMuted;
  const palette = {
    accent: theme.colors.accent,
    warning: theme.colors.warning,
    error: theme.colors.error,
    success: theme.colors.success,
  };

  return (
    <ChartRoot data-testid="telemetry-trend-chart">
      <ChartTitle>{title}</ChartTitle>
      <ChartPlot>
        <ResponsiveContainer width="100%" height={CHART_PLOT_HEIGHT_PX}>
          <ComposedChart data={chartData} margin={CHART_MARGIN}>
            <defs>
              {readings.map((r: SensorReading) => {
                const stroke = strokeForStatus(r.status, palette);
                const gradId = `${gradientPrefix}-${r.id}`;
                return (
                  <linearGradient key={gradId} id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={stroke} stopOpacity={AREA_FILL_TOP_OPACITY} />
                    <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                  </linearGradient>
                );
              })}
            </defs>
            <CartesianGrid
              stroke={gridStroke}
              strokeDasharray="3 3"
              vertical
              horizontal
            />
            <XAxis
              dataKey="index"
              tick={{ fontSize: 10, fill: tickColor, fontFamily: theme.typography.fontFamily.mono }}
              axisLine={{ stroke: gridStroke }}
              tickLine={false}
              label={{
                value: sampleAxisLabel,
                position: 'insideBottomRight',
                offset: -2,
                style: {
                  fontSize: 9,
                  fill: tickColor,
                  fontFamily: theme.typography.fontFamily.mono,
                },
              }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: tickColor, fontFamily: theme.typography.fontFamily.mono }}
              width={36}
              axisLine={false}
              tickLine={false}
              domain={['dataMin', 'dataMax']}
              tickCount={4}
            />
            <Tooltip
              cursor={{ stroke: theme.colors.borderLight, strokeWidth: 1 }}
              contentStyle={{
                background: theme.colors.surfaceElevated,
                border: `1px solid ${theme.colors.borderLight}`,
                borderRadius: theme.borderRadius.md,
                fontFamily: theme.typography.fontFamily.mono,
                fontSize: theme.typography.fontSize.xs,
              }}
            />
            {readings.map((r: SensorReading) => {
              const stroke = strokeForStatus(r.status, palette);
              const gradId = `${gradientPrefix}-${r.id}`;
              return (
                <React.Fragment key={r.id}>
                  <Area
                    type="monotone"
                    dataKey={r.id}
                    baseValue="dataMin"
                    stroke="none"
                    fill={`url(#${gradId})`}
                    isAnimationActive={!reduced}
                    animationDuration={300}
                    animationEasing="ease-out"
                  />
                  <Line
                    type="monotone"
                    dataKey={r.id}
                    name={resolveI18nKeyOrFallback(
                      `liveLab.monitor.sensors.${r.id}`,
                      r.label,
                      t,
                    )}
                    dot={false}
                    strokeWidth={1.75}
                    stroke={stroke}
                    activeDot={{
                      r: 3,
                      strokeWidth: 0,
                      fill: stroke,
                    }}
                    isAnimationActive={!reduced}
                    animationDuration={300}
                    animationEasing="ease-out"
                  />
                </React.Fragment>
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </ChartPlot>
    </ChartRoot>
  );
};
