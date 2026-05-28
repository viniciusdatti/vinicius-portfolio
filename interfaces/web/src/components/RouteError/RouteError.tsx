// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

// Components
import { Button } from '../Button';

// Component
import {
  RouteErrorContainer,
  RouteErrorText,
  RouteErrorTitle,
} from './RouteError.style';

export const RouteError = (): React.ReactElement => {
  const { t } = useTranslation();
  const routeError = useRouteError();
  const message: string = routeError instanceof Error
    ? routeError.message
    : t('common.errorMessage');

  const handleReload = (): void => {
    window.location.reload();
  };

  return (
    <RouteErrorContainer role="alert" aria-live="assertive">
      <RouteErrorTitle>{t('common.errorTitle')}</RouteErrorTitle>
      <RouteErrorText>{message}</RouteErrorText>
      <Button type="button" onClick={handleReload} testId="route-error-reload">
        {t('common.reload')}
      </Button>
    </RouteErrorContainer>
  );
};
