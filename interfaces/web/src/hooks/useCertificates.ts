// Libraries
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// Api
import { getCertificates } from '../api';

// Types
import { Certificate } from '../types';

export const certificatesQueryKey = (): string[] => ['certificates'];

const CERTIFICATES_QUERY_RETRY_COUNT: number = 3;

const resolveCertificatesQueryRetryDelay = (attemptIndex: number): number => (
  Math.min(1000 * 2 ** attemptIndex, 12000)
);

export const useCertificates = (): UseQueryResult<Certificate[], Error> => useQuery<
Certificate[],
Error
>({
  queryKey: certificatesQueryKey(),
  queryFn: getCertificates,
  retry: CERTIFICATES_QUERY_RETRY_COUNT,
  retryDelay: resolveCertificatesQueryRetryDelay,
});
