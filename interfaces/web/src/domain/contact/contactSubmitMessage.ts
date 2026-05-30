// Api
import { ApiError } from '../../api/client';

/**
 * Maps contact submit failures to localized user-facing copy.
 */
export const getContactSubmitErrorMessage = (
  error: unknown,
  rateLimitText: string,
  fallbackText: string,
): string => {
  if (!(error instanceof ApiError)) return fallbackText;
  if (error.status === 429) return rateLimitText;
  return error.message;
};
