/**
 * Certificates API functions.
 */

import { apiClient } from './client';
import type { Certificate } from '../types';

/**
 * Fetch all certificates from the API.
 *
 * @returns Promise with array of certificates
 */
export async function getCertificates(): Promise<Certificate[]> {
  return apiClient.get<Certificate[]>('/certificates', {
    active_only: 'true',
  });
}
