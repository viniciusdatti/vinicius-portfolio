/**
 * Full-screen loading state for admin auth gates.
 */

// Core
import React from 'react';

// Components
import { Spinner } from '@/components/common/Spinner';

// Styles
import { LoadingRoot, LoadingText } from '@/components/admin/AdminAuthLoading.style';

interface AdminAuthLoadingProps {
  message: string;
}

/**
 * Centered spinner used while admin routes validate JWT/session.
 */
export function AdminAuthLoading({
  message,
}: AdminAuthLoadingProps): React.ReactElement {
  return (
    <LoadingRoot role="status" aria-live="polite">
      <Spinner size="lg" />
      <LoadingText>{message}</LoadingText>
    </LoadingRoot>
  );
}
