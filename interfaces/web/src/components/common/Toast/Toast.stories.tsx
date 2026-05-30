// Core
import React, { useEffect } from 'react';

// Libraries
import { Meta, StoryObj } from '@storybook/react';

// Components
import { Button } from '../../Button';
import {
  showToast,
  ToastType,
} from '../../../store';

// Toast
import { ToastHost } from './Toast';

const ToastSuccessDemo = (): React.ReactElement => {
  useEffect((): void => {
    showToast('Submission saved successfully.', ToastType.Success);
  }, []);

  return (
    <>
      <Button
        testId="toast-success-story"
        onClick={(): void => {
          showToast('Submission saved successfully.', ToastType.Success);
        }}
      >
        Show success toast
      </Button>
      <ToastHost />
    </>
  );
};

const ToastErrorDemo = (): React.ReactElement => {
  useEffect((): void => {
    showToast('Unable to reach the API.', ToastType.Error);
  }, []);

  return (
    <>
      <Button
        testId="toast-error-story"
        onClick={(): void => {
          showToast('Unable to reach the API.', ToastType.Error);
        }}
      >
        Show error toast
      </Button>
      <ToastHost />
    </>
  );
};

const ToastWarningDemo = (): React.ReactElement => {
  useEffect((): void => {
    showToast('Connection degraded — retrying.', ToastType.Warning);
  }, []);

  return (
    <>
      <Button
        testId="toast-warning-story"
        onClick={(): void => {
          showToast('Connection degraded — retrying.', ToastType.Warning);
        }}
      >
        Show warning toast
      </Button>
      <ToastHost />
    </>
  );
};

const meta: Meta<typeof ToastSuccessDemo> = {
  title: 'Components/Toast',
  component: ToastSuccessDemo,
};

export default meta;

type Story = StoryObj<typeof ToastSuccessDemo>;

export const Success: Story = {};

export const ErrorToast: Story = {
  render: (): React.ReactElement => <ToastErrorDemo />,
};

export const WarningToast: Story = {
  render: (): React.ReactElement => <ToastWarningDemo />,
};
