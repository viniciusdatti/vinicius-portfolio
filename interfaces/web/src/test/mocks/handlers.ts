import { http, HttpResponse } from 'msw';
import { mockCertificateList, mockProjectList, mockSkillList } from '@/test/fixtures';

const API_BASE = 'http://localhost:8000/api/v1';

export const handlers = [
  http.get(`${API_BASE}/projects`, () => HttpResponse.json(mockProjectList())),

  http.get(`${API_BASE}/skills`, () => HttpResponse.json(mockSkillList())),

  http.get(`${API_BASE}/certificates`, () => HttpResponse.json(mockCertificateList())),

  http.post(`${API_BASE}/contact`, () => HttpResponse.json({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    company: null,
    subject: null,
    message: 'Test message',
    status: 'pending',
    created_at: '2024-01-01T00:00:00Z',
    replied_at: null,
  })),

  http.get('http://localhost:8000/health', () => HttpResponse.json({
    status: 'healthy',
    version: '1.0.0',
  })),
];
