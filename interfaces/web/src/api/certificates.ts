/**
 * Certificates API functions.
 */

// Types
import type { Certificate } from '../types';

// Component
import { apiClient } from './client';

export const getCertificates = async (): Promise<Certificate[]> => apiClient.get<Certificate[]>('/certificates', {
  active_only: 'true',
});
