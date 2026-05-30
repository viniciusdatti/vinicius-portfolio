// Api
import { apiClient } from './client';

export interface ContactSubmitPayload {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

export interface ContactSubmitResponse {
  id: number;
  name: string;
  email: string;
  company: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
  replied_at: string | null;
}

export const submitContact = (
  payload: ContactSubmitPayload,
): Promise<ContactSubmitResponse> => apiClient.post<ContactSubmitResponse>('/contact', payload);
