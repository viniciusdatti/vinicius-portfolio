/**
 * Hook for fetching certificates from the API.
 */

// Libraries
import { useQuery } from '@tanstack/react-query';

// Types
import type { UseQueryResult } from '@tanstack/react-query';
import type { Certificate } from '../types';

// Components
import { getCertificates } from '../api';

/**
 * Query key for certificates.
 */
export const certificatesQueryKey = (): string[] => ['certificates'];

/**
 * Hook to fetch all active certificates.
 *
 * @returns Query result with certificates data, loading and error states
 */
export function useCertificates(): UseQueryResult<Certificate[], Error> {
  return useQuery<Certificate[], Error>({
    queryKey: certificatesQueryKey(),
    queryFn: getCertificates,
  });
}
