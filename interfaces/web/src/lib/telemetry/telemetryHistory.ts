// Types
import { SensorReading } from '../../types/telemetry';

export const TELEMETRY_HISTORY_MAX: number = 30;

export const appendReadingToHistory = (
  history: Record<string, number[]>,
  reading: SensorReading,
  maxHistory: number = TELEMETRY_HISTORY_MAX,
): Record<string, number[]> => {
  const prevHistory: number[] = history[reading.id] ?? [];
  return {
    ...history,
    [reading.id]: [...prevHistory, reading.value].slice(-maxHistory),
  };
};

export const appendTickReadingsToHistory = (
  history: Record<string, number[]>,
  readings: SensorReading[],
  maxHistory: number = TELEMETRY_HISTORY_MAX,
): Record<string, number[]> => {
  let nextHistory: Record<string, number[]> = { ...history };
  readings.forEach((reading: SensorReading): void => {
    nextHistory = appendReadingToHistory(nextHistory, reading, maxHistory);
  });
  return nextHistory;
};
