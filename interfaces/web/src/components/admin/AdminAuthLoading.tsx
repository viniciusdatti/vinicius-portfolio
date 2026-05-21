/**
 * Full-screen loading state for admin auth gates.
 */

// Core
import React from 'react';

// Components
import { Spinner } from '../common/Spinner';

// Styles
import { LoadingRoot, LoadingText } from './AdminAuthLoading.style';

interface AdminAuthLoadingProps {
  message: string;
}

/**
 * Centered spinner used while admin routes validate JWT/session.
 */
export const AdminAuthLoading: React.FC<AdminAuthLoadingProps> = ({
  message,
}): React.ReactElement => (
  <LoadingRoot role="status" aria-live="polite">
    <Spinner size="lg" />
    <LoadingText>{message}</LoadingText>
  </LoadingRoot>
);
