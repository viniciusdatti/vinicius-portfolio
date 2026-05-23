// Core
import {
  describe, it, expect,
} from 'vitest';

// Libraries
import { http, HttpResponse } from 'msw';

/* *************************************************************************************************
 ********************************************** MOCKS **********************************************
 ************************************************************************************************ */
import { server } from '@/test/mocks/server';

/* *************************************************************************************************
 *********************************************** API ***********************************************
 ************************************************************************************************ */
import { apiClient, ApiError } from '@/api/client';

/* *************************************************************************************************
 **************************************** TEST SUPPORT VARS ****************************************
 ************************************************************************************************ */

const API_BASE: string = 'http://localhost:8000/api/v1';

/* *************************************************************************************************
 ***************************************** TEST EXECUTION ******************************************
 ************************************************************************************************ */

describe('apiClient', (): void => {
  // METHOD: GET - OK *******************************

  describe('GET', (): void => {
    it('should return parsed JSON on 200', async (): Promise<void> => {
      server.use(
        http.get(`${API_BASE}/test`, () => HttpResponse.json({ ok: true })),
      );
      const result: { ok: boolean } = await apiClient.get<{ ok: boolean }>('/test');
      expect(result.ok).toBe(true);
    });

    it('should append query params to URL', async (): Promise<void> => {
      let receivedUrl: string = '';
      server.use(
        http.get(`${API_BASE}/projects`, ({ request }) => {
          receivedUrl = request.url;
          return HttpResponse.json([]);
        }),
      );
      await apiClient.get('/projects', { technology: 'react' });
      expect(receivedUrl).toContain('technology=react');
    });

    it('should omit undefined params', async (): Promise<void> => {
      let receivedUrl: string = '';
      server.use(
        http.get(`${API_BASE}/projects`, ({ request }) => {
          receivedUrl = request.url;
          return HttpResponse.json([]);
        }),
      );
      await apiClient.get('/projects', { technology: undefined });
      expect(receivedUrl).not.toContain('technology');
    });
  });

  // METHOD: GET - ERROR *******************************

  describe('error handling', (): void => {
    it('should throw ApiError with status on 4xx', async (): Promise<void> => {
      server.use(
        http.get(`${API_BASE}/fail`, () => HttpResponse.json(
          { detail: 'Not found' },
          { status: 404 },
        )),
      );
      await expect(apiClient.get('/fail')).rejects.toMatchObject({
        name: 'ApiError',
        status: 404,
        message: 'Not found',
      });
    });

    it('should throw ApiError on 500', async (): Promise<void> => {
      server.use(
        http.get(`${API_BASE}/error`, () => HttpResponse.json(
          { error: 'Server exploded' },
          { status: 500 },
        )),
      );
      await expect(apiClient.get('/error')).rejects.toMatchObject({
        name: 'ApiError',
        status: 500,
        message: 'Server exploded',
      });
    });

    it('should handle FastAPI validation error array', async (): Promise<void> => {
      server.use(
        http.post(`${API_BASE}/validate`, () => HttpResponse.json(
          { detail: [{ msg: 'field required', loc: ['body', 'name'] }] },
          { status: 422 },
        )),
      );
      await expect(apiClient.post('/validate', {})).rejects.toMatchObject({
        status: 422,
        message: 'field required',
      });
    });

    it('should fall back to generic message when body is not JSON', async (): Promise<void> => {
      server.use(
        http.get(`${API_BASE}/broken`, () => new HttpResponse('not json', { status: 503 })),
      );
      await expect(apiClient.get('/broken')).rejects.toMatchObject({
        status: 503,
        message: 'HTTP error 503',
      });
    });

    it('should keep ApiError instanceof Error', async (): Promise<void> => {
      server.use(
        http.get(`${API_BASE}/err`, () => HttpResponse.json({}, { status: 401 })),
      );
      try {
        await apiClient.get('/err');
        expect.fail('Expected apiClient.get to throw');
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(ApiError);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  // METHOD: POST - OK *******************************

  describe('POST', (): void => {
    it('should send JSON body and return response', async (): Promise<void> => {
      let receivedBody: unknown;
      server.use(
        http.post(`${API_BASE}/contact`, async ({ request }) => {
          receivedBody = await request.json();
          return HttpResponse.json({ id: 1 });
        }),
      );
      const result: { id: number } = await apiClient.post<{ id: number }>('/contact', {
        name: 'Test',
        email: 'test@test.com',
        message: 'Hi',
      });
      expect(result.id).toBe(1);
      expect(receivedBody).toMatchObject({ name: 'Test' });
    });
  });
});
