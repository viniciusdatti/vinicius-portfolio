// Core
import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

// Libraries
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

// Hooks
import { usePrefersReducedMotion } from '../../../../hooks/usePrefersReducedMotion';
import { useScrollMotion } from '../../../../hooks/useScrollMotion';

// Styles
import {
  ChartPlot,
  ChartRoot,
  ChartTitle,
} from './TelemetryTrendChart.style';

// Types
import { SensorReading, SensorStatus } from '../../../../types/telemetry';
import {
  TelemetryTrendChartMargin,
  TelemetryTrendChartPalette,
  TelemetryTrendChartPoint,
  TelemetryTrendChartProps,
} from './TelemetryTrendChart.types';

// Lib
import { resolveTelemetrySensorLabel } from '../../../../lib/telemetry';

const AREA_FILL_TOP_OPACITY: number = 0.14;

const TREND_LINE_ANIMATION_MS: number = 820;

interface TelemetryPulseDotProps {
  cx?: number;
  cy?: number;
  stroke?: string;
}

const TelemetryPulseDot = ({
  cx,
  cy,
  stroke,
}: TelemetryPulseDotProps): React.ReactElement | null => {
  if (cx == null || cy == null) {
    return null;
  }
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={stroke}
        opacity={0.22}
      />
      <circle
        cx={cx}
        cy={cy}
        r={2.75}
        fill={stroke}
      />
    </g>
  );
};

const CHART_MARGIN: TelemetryTrendChartMargin = {
  top: 20,
  right: 8,
  left: 0,
  bottom: 8,
};

interface PlotDimensions {
  width: number;
  height: number;
}

const initialPlotDimensions: PlotDimensions = {
  width: 0,
  height: 0,
};

const usePlotDimensions = (
  plotRef: React.RefObject<HTMLDivElement | null>,
): PlotDimensions => {
  const [dimensions, setDimensions] = useState<PlotDimensions>(initialPlotDimensions);

  useEffect(() => {
    const element: HTMLDivElement | null = plotRef.current;
    if (!element) {
      return undefined;
    }

    const syncDimensions = (): void => {
      const { width, height } = element.getBoundingClientRect();
      if (width <= 0 || height <= 0) {
        return;
      }
      const nextWidth: number = Math.floor(width);
      const nextHeight: number = Math.floor(height);
      setDimensions((prev: PlotDimensions): PlotDimensions => {
        if (prev.width === nextWidth && prev.height === nextHeight) {
          return prev;
        }
        return { width: nextWidth, height: nextHeight };
      });
    };

    syncDimensions();

    const observer: ResizeObserver = new ResizeObserver((): void => {
      syncDimensions();
    });
    observer.observe(element);

    return (): void => {
      observer.disconnect();
    };
  }, [plotRef]);

  return dimensions;
};

const strokeForStatus = (
  status: SensorStatus,
  colors: TelemetryTrendChartPalette,
): string => {
  if (status === SensorStatus.Critical) {
    return colors.error;
  }
  if (status === SensorStatus.Warn) {
    return colors.warning;
  }
  return colors.success;
};

export const TelemetryTrendChart = ({
  readings,
  history,
  title,
}: TelemetryTrendChartProps): React.ReactElement | null => {
  const { t } = useTranslation();
  const theme = useTheme();
  const reduced: boolean = usePrefersReducedMotion();
  const { section, viewport } = useScrollMotion();
  const [plotActive, setPlotActive] = useState<boolean>(true);
  const plotRef = useRef<HTMLDivElement | null>(null);
  const plotDimensions: PlotDimensions = usePlotDimensions(plotRef);
  const sampleAxisLabel: string = t('liveLab.monitor.sampleAxis');
  const gradientPrefix: string = useId().replace(/:/g, '');

  const chartData: TelemetryTrendChartPoint[] = useMemo((): TelemetryTrendChartPoint[] => {
    const maxLen: number = Math.max(
      0,
      ...readings.map((r: SensorReading) => history[r.id]?.length ?? 0),
    );
    const points: TelemetryTrendChartPoint[] = [];
    for (let i: number = 0; i < maxLen; i += 1) {
      const row: TelemetryTrendChartPoint = { index: i + 1 };
      readings.forEach((r: SensorReading): void => {
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

  const gridStroke: string = theme.colors.border;
  const tickColor: string = theme.colors.textMuted;
  const palette: TelemetryTrendChartPalette = {
    accent: theme.colors.accent,
    warning: theme.colors.warning,
    error: theme.colors.error,
    success: theme.colors.success,
  };

  const lineAnimationActive: boolean = plotActive && !reduced;

  return (
    <ChartRoot
      data-testid="telemetry-trend-chart"
      variants={section}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      onViewportEnter={() => {
        if (!plotActive) {
          setPlotActive(true);
        }
      }}
    >
      <ChartTitle>{title}</ChartTitle>
      <ChartPlot ref={plotRef}>
        {plotDimensions.width > 0 && plotDimensions.height > 0 ? (
          <ComposedChart
            width={plotDimensions.width}
            height={plotDimensions.height}
            data={chartData}
            margin={CHART_MARGIN}
          >
            <defs>
              {readings.map((r: SensorReading) => {
                const stroke: string = strokeForStatus(r.status, palette);
                const gradId: string = `${gradientPrefix}-${r.id}`;
                return (
                  <linearGradient
                    key={gradId}
                    id={gradId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={stroke}
                      stopOpacity={AREA_FILL_TOP_OPACITY}
                    />
                    <stop
                      offset="100%"
                      stopColor={stroke}
                      stopOpacity={0}
                    />
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
              const stroke: string = strokeForStatus(r.status, palette);
              const gradId: string = `${gradientPrefix}-${r.id}`;
              return (
                <React.Fragment key={r.id}>
                  <Area
                    type="monotone"
                    dataKey={r.id}
                    baseValue="dataMin"
                    stroke="none"
                    fill={`url(#${gradId})`}
                    isAnimationActive={lineAnimationActive}
                    animationDuration={TREND_LINE_ANIMATION_MS}
                    animationEasing="ease-out"
                  />
                  <Line
                    type="monotone"
                    dataKey={r.id}
                    name={resolveTelemetrySensorLabel(r, t)}
                    dot={lineAnimationActive ? TelemetryPulseDot : false}
                    strokeWidth={2.25}
                    stroke={stroke}
                    activeDot={TelemetryPulseDot}
                    isAnimationActive={lineAnimationActive}
                    animationDuration={TREND_LINE_ANIMATION_MS}
                    animationEasing="ease-out"
                  />
                </React.Fragment>
              );
            })}
          </ComposedChart>
        ) : null}
      </ChartPlot>
    </ChartRoot>
  );
};
