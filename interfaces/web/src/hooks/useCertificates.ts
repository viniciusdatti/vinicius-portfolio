/**
 * Hook for fetching certificates from the API.
 */

// Libraries
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

// Types
import type { Certificate } from '../types';

// Components
import { getCertificates } from '../api';

export const certificatesQueryKey = (): string[] => ['certificates'];

const CERTIFICATES_QUERY_RETRY_COUNT: number = 3;

const resolveCertificatesQueryRetryDelay = (attemptIndex: number): number => (
  Math.min(1000 * 2 ** attemptIndex, 12000)
);

/**
 * Hook to fetch all active certificates.
 *
 * @returns Query result with certificates data, loading and error states
 */
export const useCertificates = (): UseQueryResult<Certificate[], Error> => useQuery<
Certificate[],
Error
>({
  queryKey: certificatesQueryKey(),
  queryFn: getCertificates,
  retry: CERTIFICATES_QUERY_RETRY_COUNT,
  retryDelay: resolveCertificatesQueryRetryDelay,
});
