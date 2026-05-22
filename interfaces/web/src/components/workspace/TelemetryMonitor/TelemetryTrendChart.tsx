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
import { useTheme } from 'styled-components';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Types
import type { SensorReading } from '@/types/telemetry';
import { SensorStatus } from '@/types/telemetry';

// Components
import { ChartPlot, ChartRoot, ChartTitle } from '@/components/workspace/TelemetryMonitor/TelemetryTrendChart.style';

interface TelemetryTrendChartProps {
  readings: SensorReading[];
  history: Record<string, number[]>;
  title: string;
}

interface ChartPoint {
  index: number;
  [sensorId: string]: number;
}

const strokeForStatus = (
  status: SensorStatus,
  colors: { accent: string; warning: string; error: string; success: string },
): string => {
  if (status === SensorStatus.Critical) return colors.error;
  if (status === SensorStatus.Warn) return colors.warning;
  return colors.success;
};

export function TelemetryTrendChart({
  readings,
  history,
  title,
}: TelemetryTrendChartProps): React.ReactElement | null {
  const theme = useTheme();
  const reduced = usePrefersReducedMotion();
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

  const gridStroke = theme.colors.borderSubtle;
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
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{
              top: 8,
              right: 12,
              left: 0,
              bottom: 4,
            }}
          >
            <defs>
              {readings.map((r: SensorReading) => {
                const stroke = strokeForStatus(r.status, palette);
                const gradId = `${gradientPrefix}-${r.id}`;
                return (
                  <linearGradient key={gradId} id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={stroke} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={stroke} stopOpacity={0} />
                  </linearGradient>
                );
              })}
            </defs>
            <CartesianGrid
              stroke={gridStroke}
              strokeDasharray="4 6"
              vertical={false}
              opacity={0.4}
            />
            <XAxis
              dataKey="index"
              tick={{ fontSize: 10, fill: tickColor, fontFamily: theme.typography.fontFamily.mono }}
              axisLine={{ stroke: gridStroke }}
              tickLine={false}
              label={{
                value: 'sample',
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
              width={40}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ stroke: theme.colors.borderLight, strokeWidth: 1 }}
              contentStyle={{
                background: theme.colors.surfaceElevated,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.borderRadius.md,
                fontFamily: theme.typography.fontFamily.mono,
                fontSize: theme.typography.fontSize.xs,
                boxShadow: theme.elevation.md,
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
                    stroke="none"
                    fill={`url(#${gradId})`}
                    isAnimationActive={!reduced}
                    animationDuration={500}
                    animationEasing="ease-out"
                  />
                  <Line
                    type="monotone"
                    dataKey={r.id}
                    name={r.label}
                    dot={false}
                    strokeWidth={1.75}
                    stroke={stroke}
                    activeDot={{
                      r: 3,
                      strokeWidth: 0,
                      fill: stroke,
                    }}
                    isAnimationActive={!reduced}
                    animationDuration={450}
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
}
