// Libraries
import {
  describe,
  expect,
  it,
} from 'vitest';

// Api
import { ApiError } from './client';
import {
  isApiError,
  isNotFoundError,
  isUnauthorizedError,
} from './guards';

describe('api/guards', (): void => {
  // METHOD: isApiError *******************************

  it('should identify ApiError instances', (): void => {
    const error: ApiError = new ApiError('fail', 500);
    expect(isApiError(error)).toBe(true);
    expect(isApiError(new Error('fail'))).toBe(false);
  });

  // METHOD: isNotFoundError *******************************

  it('should match status 404', (): void => {
    expect(isNotFoundError(new ApiError('missing', 404))).toBe(true);
    expect(isNotFoundError(new ApiError('bad', 400))).toBe(false);
  });

  // METHOD: isUnauthorizedError *******************************

  it('should match status 401', (): void => {
    expect(isUnauthorizedError(new ApiError('auth', 401))).toBe(true);
    expect(isUnauthorizedError(new ApiError('bad', 403))).toBe(false);
  });
});
