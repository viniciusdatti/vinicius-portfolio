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
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>{t('common.errorTitle')}</ErrorTitle>
          <ErrorText>{t('common.errorMessage')}</ErrorText>
          <Button onClick={this.handleReload}>
            {t('common.reload')}
          </Button>
        </ErrorContainer>
      );
    }
    return this.props.children;
  }
}
