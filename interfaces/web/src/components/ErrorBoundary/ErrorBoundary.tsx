// Core
import React, { Component } from 'react';

// Types
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

// Components
import {
  ErrorContainer,
  ErrorTitle,
  ErrorText,
} from './ErrorBoundary.style';
import { Button } from '../Button';
import i18n from '../../i18n/config';

const t = (key: string): string => (i18n as { t: (k: string) => string }).t(key);

export class ErrorBoundary extends Component<
ErrorBoundaryProps,
ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // eslint-disable-next-line no-console -- production error boundary logging
    console.error('[ErrorBoundary]', error, errorInfo.componentStack);
  }

  handleReload(): void {
    const { hasError } = this.state;
    if (hasError) {
      window.location.reload();
    }
  }

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <ErrorContainer role="alert" aria-live="assertive">
          <ErrorTitle>{t('common.errorTitle')}</ErrorTitle>
          <ErrorText>{error?.message ?? t('common.errorMessage')}</ErrorText>
          <Button type="button" onClick={this.handleReload} testId="error-boundary-reload">
            {t('common.reload')}
          </Button>
        </ErrorContainer>
      );
    }
    return children;
  }
}
