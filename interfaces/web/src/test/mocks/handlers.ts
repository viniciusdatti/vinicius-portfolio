import { http, HttpResponse } from 'msw';
import { mockCertificateList, mockProjectList, mockSkillList } from '../fixtures';

const API_BASE = 'http://localhost:8000/api/v1';

export const handlers = [
  // Projects
  http.get(`${API_BASE}/projects`, () => HttpResponse.json(mockProjectList())),

  http.get(`${API_BASE}/skills`, () => HttpResponse.json(mockSkillList())),

  http.get(`${API_BASE}/certificates`, () => HttpResponse.json(mockCertificateList())),

  // Contact
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

  // Auth login
  http.post(`${API_BASE}/auth/login`, () => HttpResponse.json({
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    token_type: 'bearer',
    expires_in: 3600,
  })),

  // System health
  http.get('http://localhost:8000/health', () => HttpResponse.json({ status: 'healthy', version: '1.0.0' })),

  // Visitor chat messages
  http.get(`${API_BASE}/chat/sessions/:sessionId/visitor-messages`, () => HttpResponse.json([])),
];
