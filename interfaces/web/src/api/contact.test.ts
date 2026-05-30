// Libraries
import {
  describe,
  expect,
  it,
} from 'vitest';
import { http, HttpResponse } from 'msw';

// Api
import { submitContact } from './contact';
import { ApiError } from './client';

// Mocks
import { server } from '../test/mocks/server';

const API_BASE: string = 'http://localhost:8000/api/v1';

const contactPayload = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'Hello from the portfolio contact form.',
};

describe('api/contact submitContact', (): void => {
  // METHOD: success *******************************

  it('should resolve with response body on HTTP 200', async (): Promise<void> => {
    server.use(
      http.post(`${API_BASE}/contact`, () => HttpResponse.json({
        id: 42,
        name: contactPayload.name,
        email: contactPayload.email,
        company: null,
        subject: null,
        message: contactPayload.message,
        status: 'pending',
        created_at: '2024-01-01T00:00:00Z',
        replied_at: null,
      })),
    );

    const result = await submitContact(contactPayload);
    expect(result.id).toBe(42);
    expect(result.status).toBe('pending');
  });

  // METHOD: rate limit *******************************

  it('should throw ApiError with status 429 on rate limit', async (): Promise<void> => {
    server.use(
      http.post(`${API_BASE}/contact`, () => HttpResponse.json(
        { detail: 'Too many requests' },
        { status: 429 },
      )),
    );

    await expect(submitContact(contactPayload)).rejects.toMatchObject({
      status: 429,
    });
    await expect(submitContact(contactPayload)).rejects.toBeInstanceOf(ApiError);
  });

  // METHOD: server error *******************************

  it('should throw ApiError with status 500 on server failure', async (): Promise<void> => {
    server.use(
      http.post(`${API_BASE}/contact`, () => HttpResponse.json(
        { detail: 'Internal server error' },
        { status: 500 },
      )),
    );

    await expect(submitContact(contactPayload)).rejects.toMatchObject({
      status: 500,
    });
  });
});
