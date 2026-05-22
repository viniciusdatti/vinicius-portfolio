/**
 * HTTP client configuration for API requests.
 */

// Components
import { env } from '@/config/env';

const API_BASE_URL: string = env.apiUrl;

interface RequestOptions extends RequestInit {
  params?: Record<string, string | undefined>;
}

/**
 * Custom error class for API errors.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Parses API error payload into a single message.
 * Supports FastAPI-style `detail` and SlowAPI-style `error`.
 */
const parseApiErrorMessage = (
  status: number,
  errorData: Record<string, unknown> | null,
): string => {
  const detail: unknown = errorData?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0] as Record<string, unknown>;
    const msg = first?.msg;
    if (typeof msg === 'string') return msg;
  }
  const error: unknown = errorData?.error;
  if (typeof error === 'string') return error;
  return `HTTP error ${status}`;
};

/**
 * Build URL with query parameters.
 */
const buildUrl = (
  endpoint: string,
  params?: Record<string, string | undefined>,
): string => {
  const path: string = `${API_BASE_URL}${endpoint}`;
  const url: URL = API_BASE_URL.startsWith('http')
    ? new URL(path)
    : new URL(path, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        url.searchParams.append(key, value);
      }
    });
  }

  return url.toString();
};

/**
 * Make an HTTP request to the API.
 */
const request = async <T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { params, ...fetchOptions }: RequestOptions = options;

  const url: string = buildUrl(endpoint, params);

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    let errorData: Record<string, unknown> | null = null;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }

    const errorMessage: string = parseApiErrorMessage(
      response.status,
      errorData,
    );
    throw new ApiError(errorMessage, response.status, errorData);
  }

  return response.json();
};

/**
 * API client interface with HTTP methods.
 */
interface ApiClient {
  get: <T>(
    endpoint: string,
    params?: Record<string, string | undefined>
  ) => Promise<T>;
  post: <T>(endpoint: string, data?: unknown) => Promise<T>;
  put: <T>(endpoint: string, data?: unknown) => Promise<T>;
  delete: <T>(endpoint: string) => Promise<T>;
}

/**
 * API client with HTTP methods.
 */
export const apiClient: ApiClient = {
  get: <T>(
    endpoint: string,
    params?: Record<string, string | undefined>,
  ): Promise<T> => request<T>(endpoint, { method: 'GET', params }),

  post: <T>(endpoint: string, data?: unknown): Promise<T> => request<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  }),

  put: <T>(endpoint: string, data?: unknown): Promise<T> => request<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  }),

  delete: <T>(endpoint: string): Promise<T> => request<T>(endpoint, { method: 'DELETE' }),
};
