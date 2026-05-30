// Libraries
import {
  describe,
  expect,
  it,
} from 'vitest';

// LiveLabObservatory
import { sparkPathFromValues } from './LiveLabObservatory.helpers';

describe('LiveLabObservatory.helpers', (): void => {
  // METHOD: sparkPathFromValues *******************************

  it('should return empty path for no values', (): void => {
    expect(sparkPathFromValues([], 120, 28)).toBe('');
  });

  it('should render flat line for single value', (): void => {
    const path: string = sparkPathFromValues([4.2], 120, 28);
    expect(path).toBe('M0,14.0 L120.0,14.0');
  });

  it('should render polyline for multiple values', (): void => {
    const path: string = sparkPathFromValues([1, 2, 3], 100, 50);
    expect(path.startsWith('M0')).toBe(true);
    expect(path.includes('L100.0,')).toBe(true);
  });
});
