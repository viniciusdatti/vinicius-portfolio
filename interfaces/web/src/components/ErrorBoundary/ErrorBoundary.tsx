// Core
import React, { Component } from 'react';

// Components
import { Button } from '../Button';

// Styles
import {
  ErrorContainer,
  ErrorTitle,
  ErrorText,
} from './ErrorBoundary.style';

// Types
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

// I18n
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
          <Button
            type="button"
            onClick={this.handleReload}
            testId="error-boundary-reload"
          >
            {t('common.reload')}
          </Button>
        </ErrorContainer>
      );
    }
    return children;
  }
}
