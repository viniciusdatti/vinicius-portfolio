/**
 * Type guards for API error handling (portfolio predicates).
 */

// Component
import { ApiError } from './client';

export const isApiError = (error: unknown): error is ApiError => (
  error instanceof ApiError
);

export const isHttpStatus = (error: unknown, status: number): boolean => (
  isApiError(error) && error.status === status
);

export const isNotFoundError = (error: unknown): boolean => isHttpStatus(error, 404);

export const isUnauthorizedError = (error: unknown): boolean => isHttpStatus(error, 401);
