// Core
import React, { useEffect, useMemo, useState } from 'react';

// Libraries
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Types
import { SensorStatus } from '@/types/telemetry';

// Hooks
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Components
import {
  ObservatoryRoot,
  ObservatoryChrome,
  ObservatoryTitle,
  ObservatoryLive,
  ObservatoryBody,
  SensorPanel,
  SensorTile,
  SensorTileLabel,
  SensorTileValue,
  SparklineSvg,
  SidePanel,
  ChartPane,
  ChartLabel,
  LogPane,
  LogLine,
  ObservatoryFooter,
  OpsMetric,
} from '@/components/home/LiveLabObservatory/LiveLabObservatory.style';

interface SensorDef {
  id: string;
  label: string;
  unit: string;
  base: number;
  variance: number;
  status: SensorStatus;
}

const SENSORS: SensorDef[] = [
  {
    id: 'temp', label: 'Temperatura', unit: '°C', base: 72.4, variance: 1.2, status: SensorStatus.Ok,
  },
  {
    id: 'vib', label: 'Vibração', unit: 'mm/s', base: 8.1, variance: 0.4, status: SensorStatus.Warn,
  },
  {
    id: 'press', label: 'Pressão', unit: 'bar', base: 3.2, variance: 0.08, status: SensorStatus.Ok,
  },
  {
    id: 'amp', label: 'Corrente', unit: 'A', base: 14.8, variance: 0.6, status: SensorStatus.Ok,
  },
];

const LOG_MESSAGES = [
  'telemetry.tick · sensors=4',
  'ws.channel · heartbeat ok',
  'threshold.check · vibration warn',
  'buffer.flush · 128 samples',
  'observer.sync · latency 12ms',
] as const;

function buildSparkline(seed: number, len: number): number[] {
  const out: number[] = [];
  let v = seed;
  for (let i = 0; i < len; i += 1) {
    v += (Math.sin(i * 0.7 + seed) * 0.08 + (Math.random() - 0.5) * 0.06);
    out.push(v);
  }
  return out;
}

function sparkPath(values: number[], w: number, h: number): string {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

function Sparkline({ seed, color }: { seed: number; color: string }): React.ReactElement {
  const reduced = usePrefersReducedMotion();
  const [values, setValues] = useState(() => buildSparkline(seed, 24));

  useEffect(() => {
    if (reduced) return undefined;
    const id = window.setInterval(() => {
      setValues((prev) => {
        const next = [...prev.slice(1), prev[prev.length - 1] + (Math.random() - 0.5) * 0.1];
        return next;
      });
    }, 1200);
    return () => window.clearInterval(id);
  }, [reduced, seed]);

  const d = sparkPath(values, 120, 28);
  return (
    <SparklineSvg viewBox="0 0 120 28" aria-hidden>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={false}
        animate={{ d }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </SparklineSvg>
  );
}

function AnimatedValue({
  base,
  variance,
  unit,
  status,
}: {
  base: number;
  variance: number;
  unit: string;
  status: SensorStatus;
}): React.ReactElement {
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(base);

  useEffect(() => {
    if (reduced) return undefined;
    const id = window.setInterval(() => {
      setVal(base + (Math.random() - 0.5) * variance * 2);
    }, 1800 + Math.random() * 800);
    return () => window.clearInterval(id);
  }, [base, variance, reduced]);

  const formatted = unit === '°C' || unit === 'bar'
    ? val.toFixed(1)
    : val.toFixed(1);

  return (
    <SensorTileValue $status={status}>
      {formatted}
      {' '}
      {unit}
    </SensorTileValue>
  );
}

/**
 * Premium observability showcase — live motion without requiring WebSocket on home.
 */
export function LiveLabObservatory(): React.ReactElement {
  const { t } = useTranslation();
  const reduced = usePrefersReducedMotion();
  const [logIndex, setLogIndex] = useState(0);
  const [tick, setTick] = useState(0);

  const logs = useMemo(() => {
    const items: { time: string; msg: string; type?: 'info' | 'warn' }[] = [];
    for (let i = 0; i < 4; i += 1) {
      const idx = (logIndex + i) % LOG_MESSAGES.length;
      const now = new Date();
      now.setSeconds(now.getSeconds() - i * 2);
      items.push({
        time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        msg: LOG_MESSAGES[idx],
        type: LOG_MESSAGES[idx].includes('warn') ? 'warn' : 'info',
      });
    }
    return items;
  }, [logIndex]);

  useEffect(() => {
    if (reduced) return undefined;
    const logId = window.setInterval(() => setLogIndex((n) => (n + 1) % LOG_MESSAGES.length), 3200);
    const tickId = window.setInterval(() => setTick((n) => n + 1), 1000);
    return () => {
      window.clearInterval(logId);
      window.clearInterval(tickId);
    };
  }, [reduced]);

  const aggregateSpark = useMemo(() => buildSparkline(1.4, 32), []);

  return (
    <ObservatoryRoot>
      <ObservatoryChrome>
        <ObservatoryTitle>{t('home.liveLabPreview.observatoryTitle', 'Operations · Telemetry')}</ObservatoryTitle>
        <ObservatoryLive>{t('home.liveLabPreview.badge')}</ObservatoryLive>
      </ObservatoryChrome>
      <ObservatoryBody>
        <SensorPanel>
          {SENSORS.map((s, i) => (
            <SensorTile key={s.id} $status={s.status}>
              <SensorTileLabel>{s.label}</SensorTileLabel>
              <AnimatedValue
                base={s.base}
                variance={s.variance}
                unit={s.unit}
                status={s.status}
              />
              <Sparkline seed={i + s.base} color={s.status === SensorStatus.Warn ? '#f59e0b' : '#22c55e'} />
            </SensorTile>
          ))}
        </SensorPanel>
        <SidePanel>
          <ChartPane>
            <ChartLabel>{t('home.liveLabPreview.trendLabel', 'Aggregate throughput')}</ChartLabel>
            <SparklineSvg viewBox="0 0 200 64" aria-hidden>
              <defs>
                <linearGradient id="obs-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(245,158,11,0.25)" />
                  <stop offset="100%" stopColor="rgba(245,158,11,0)" />
                </linearGradient>
              </defs>
              <motion.path
                d={`${sparkPath(aggregateSpark, 200, 64)} L200,64 L0,64 Z`}
                fill="url(#obs-fill)"
                stroke="none"
                animate={reduced ? undefined : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.path
                d={sparkPath(aggregateSpark, 200, 64)}
                fill="none"
                stroke="rgba(245,158,11,0.9)"
                strokeWidth="1.5"
              />
            </SparklineSvg>
          </ChartPane>
          <LogPane>
            {logs.map((line) => (
              <LogLine key={`${line.time}-${line.msg}`} $type={line.type}>
                <time>{line.time}</time>
                <span>{line.msg}</span>
              </LogLine>
            ))}
          </LogPane>
        </SidePanel>
      </ObservatoryBody>
      <ObservatoryFooter>
        <OpsMetric>
          WebSocket ·
          {' '}
          <strong>live</strong>
        </OpsMetric>
        <OpsMetric>
          tick
          {' '}
          <strong>
            #
            {tick}
          </strong>
        </OpsMetric>
        <OpsMetric>
          sensors
          {' '}
          <strong>4</strong>
        </OpsMetric>
      </ObservatoryFooter>
    </ObservatoryRoot>
  );
}
