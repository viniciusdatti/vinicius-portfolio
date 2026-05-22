// Core
import React, { useMemo } from 'react';

// Libraries
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Types
import type { SensorReading } from '../../../hooks/useTelemetry';

// Components
import { ChartRoot, ChartTitle } from './TelemetryTrendChart.style';

interface TelemetryTrendChartProps {
  readings: SensorReading[];
  history: Record<string, number[]>;
  title: string;
}

interface ChartPoint {
  index: number;
  [sensorId: string]: number;
}

export function TelemetryTrendChart({
  readings,
  history,
  title,
}: TelemetryTrendChartProps): React.ReactElement | null {
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

  return (
    <ChartRoot data-testid="telemetry-trend-chart">
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={chartData}
          margin={{
            top: 8,
            right: 8,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="index" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} width={36} />
          <Tooltip />
          {readings.map((r: SensorReading) => (
            <Line
              key={r.id}
              type="monotone"
              dataKey={r.id}
              name={r.label}
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartRoot>
  );
}
