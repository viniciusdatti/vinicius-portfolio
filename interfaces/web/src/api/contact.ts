/**
 * Contact form API.
 */

import { apiClient } from './client';

/** Payload sent when submitting the contact form. */
export interface ContactSubmitPayload {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

/** Response returned by the contact submission endpoint. */
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

/**
 * Submits the contact form to the backend.
 * Saves the submission and triggers email/telegram notifications.
 *
 * @param payload - Contact form data
 * @returns The created contact submission from the API
 */
export const submitContact = (
  payload: ContactSubmitPayload
): Promise<ContactSubmitResponse> =>
  apiClient.post<ContactSubmitResponse>('/contact', payload);
