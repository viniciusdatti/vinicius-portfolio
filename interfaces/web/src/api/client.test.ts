// Core
import { describe, it, expect, beforeEach } from 'vitest';

// Libraries
import { http, HttpResponse } from 'msw';

// Mocks
import { server } from '../test/mocks/server';

// API
import { apiClient, ApiError } from './client';

/* ***********************************************************************************************
 *************************************** Constants ***********************************************
 *********************************************************************************************** */

const API_BASE = 'http://localhost:8000/api/v1';

/* ***********************************************************************************************
 *************************************** Tests ***************************************************
 *********************************************************************************************** */

describe('apiClient', () => {
  describe('GET', () => {
    it('returns parsed JSON on 200', async () => {
      server.use(
        http.get(`${API_BASE}/test`, () => HttpResponse.json({ ok: true }))
      );
      const result = await apiClient.get<{ ok: boolean }>('/test');
      expect(result.ok).toBe(true);
    });

    it('appends query params to URL', async () => {
      let receivedUrl = '';
      server.use(
        http.get(`${API_BASE}/projects`, ({ request }) => {
          receivedUrl = request.url;
          return HttpResponse.json([]);
        })
      );
      await apiClient.get('/projects', { technology: 'react' });
      expect(receivedUrl).toContain('technology=react');
    });

    it('omits undefined params', async () => {
      let receivedUrl = '';
      server.use(
        http.get(`${API_BASE}/projects`, ({ request }) => {
          receivedUrl = request.url;
          return HttpResponse.json([]);
        })
      );
      await apiClient.get('/projects', { technology: undefined });
      expect(receivedUrl).not.toContain('technology');
    });
  });

  describe('error handling', () => {
    it('throws ApiError with status on 4xx', async () => {
      server.use(
        http.get(`${API_BASE}/fail`, () =>
          HttpResponse.json({ detail: 'Not found' }, { status: 404 })
        )
      );
      await expect(apiClient.get('/fail')).rejects.toMatchObject({
        name: 'ApiError',
        status: 404,
        message: 'Not found',
      });
    });

    it('throws ApiError on 500', async () => {
      server.use(
        http.get(`${API_BASE}/error`, () =>
          HttpResponse.json({ error: 'Server exploded' }, { status: 500 })
        )
      );
      await expect(apiClient.get('/error')).rejects.toMatchObject({
        name: 'ApiError',
        status: 500,
        message: 'Server exploded',
      });
    });

    it('handles FastAPI validation error array', async () => {
      server.use(
        http.post(`${API_BASE}/validate`, () =>
          HttpResponse.json(
            { detail: [{ msg: 'field required', loc: ['body', 'name'] }] },
            { status: 422 }
          )
        )
      );
      await expect(apiClient.post('/validate', {})).rejects.toMatchObject({
        status: 422,
        message: 'field required',
      });
    });

    it('falls back to generic message when body is not JSON', async () => {
      server.use(
        http.get(`${API_BASE}/broken`, () =>
          new HttpResponse('not json', { status: 503 })
        )
      );
      await expect(apiClient.get('/broken')).rejects.toMatchObject({
        status: 503,
        message: 'HTTP error 503',
      });
    });

    it('ApiError is instanceof Error', async () => {
      server.use(
        http.get(`${API_BASE}/err`, () =>
          HttpResponse.json({}, { status: 401 })
        )
      );
      try {
        await apiClient.get('/err');
      } catch (e) {
        expect(e).toBeInstanceOf(ApiError);
        expect(e).toBeInstanceOf(Error);
      }
    });
  });

  describe('POST', () => {
    it('sends JSON body and returns response', async () => {
      let receivedBody: unknown;
      server.use(
        http.post(`${API_BASE}/contact`, async ({ request }) => {
          receivedBody = await request.json();
          return HttpResponse.json({ id: 1 });
        })
      );
      const result = await apiClient.post<{ id: number }>('/contact', {
        name: 'Test',
        email: 'test@test.com',
        message: 'Hi',
      });
      expect(result.id).toBe(1);
      expect(receivedBody).toMatchObject({ name: 'Test' });
    });
  });
});
