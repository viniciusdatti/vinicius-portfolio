// Api
import { apiClient } from './client';

// Types
import { Certificate } from '../types';

export const getCertificates = async (): Promise<Certificate[]> => apiClient.get<Certificate[]>('/certificates', {
  active_only: 'true',
});
