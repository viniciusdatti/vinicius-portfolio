// Core
import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Api
import { submitContact } from '../../../api';

// Components
import { showToast, ToastType } from '../../../store';

// Styles
import {
  EmbedForm,
  EmbedField,
  EmbedLabel,
  EmbedInput,
  EmbedTextArea,
  EmbedError,
  EmbedSubmit,
  EmbedSuccess,
  EmbedFeedback,
} from './ContactFormEmbed.style';

// Types
import {
  contactFormEmbedSchema,
  ContactFormEmbedValues,
  getContactSubmitErrorMessage,
} from '../../../domain/contact';

interface ContactFormEmbedState {
  isSuccess: boolean;
}

const initialState: ContactFormEmbedState = {
  isSuccess: false,
};

export const ContactFormEmbed = (): React.ReactElement => {
  const { t } = useTranslation();
  const [state, setState] = useState<ContactFormEmbedState>(initialState);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormEmbedValues>({
    resolver: zodResolver(contactFormEmbedSchema),
  });

  const nameField: UseFormRegisterReturn<'name'> = register('name');
  const emailField: UseFormRegisterReturn<'email'> = register('email');
  const messageField: UseFormRegisterReturn<'message'> = register('message');

  const onSubmit = async (data: ContactFormEmbedValues): Promise<void> => {
    try {
      await submitContact({
        name: data.name,
        email: data.email,
        message: data.message,
      });
      setState({ isSuccess: true });
      reset();
      setTimeout((): void => {
        setState({ isSuccess: false });
      }, 5000);
    } catch (error) {
      const message = getContactSubmitErrorMessage(
        error,
        t('contact.form.rateLimitError'),
        t('contact.form.error'),
      );
      showToast(message, ToastType.Error);
    }
  };

  return (
    <EmbedFeedback aria-live="polite">
      {state.isSuccess ? (
        <EmbedSuccess role="status">{t('contact.form.success')}</EmbedSuccess>
      ) : (
        <EmbedForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <EmbedField>
            <EmbedLabel htmlFor="embed-contact-name">
              {t('contact.form.name')}
              {' '}
              *
            </EmbedLabel>
            <EmbedInput
              id="embed-contact-name"
              name={nameField.name}
              onChange={nameField.onChange}
              onBlur={nameField.onBlur}
              ref={nameField.ref}
              autoComplete="name"
              placeholder={t('contact.form.namePlaceholder')}
              $hasError={!!errors.name}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'embed-contact-name-error' : undefined}
            />
            {errors.name ? (
              <EmbedError id="embed-contact-name-error" role="alert">
                {t(errors.name.message || '', { min: 2 })}
              </EmbedError>
            ) : null}
          </EmbedField>
          <EmbedField>
            <EmbedLabel htmlFor="embed-contact-email">
              {t('contact.form.email')}
              {' '}
              *
            </EmbedLabel>
            <EmbedInput
              id="embed-contact-email"
              type="email"
              name={emailField.name}
              onChange={emailField.onChange}
              onBlur={emailField.onBlur}
              ref={emailField.ref}
              autoComplete="email"
              placeholder={t('contact.form.emailPlaceholder')}
              $hasError={!!errors.email}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'embed-contact-email-error' : undefined}
            />
            {errors.email ? (
              <EmbedError id="embed-contact-email-error" role="alert">
                {t(errors.email.message || '')}
              </EmbedError>
            ) : null}
          </EmbedField>
          <EmbedField>
            <EmbedLabel htmlFor="embed-contact-message">
              {t('contact.form.message')}
              {' '}
              *
            </EmbedLabel>
            <EmbedTextArea
              id="embed-contact-message"
              name={messageField.name}
              onChange={messageField.onChange}
              onBlur={messageField.onBlur}
              ref={messageField.ref}
              placeholder={t('contact.form.messagePlaceholder')}
              $hasError={!!errors.message}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'embed-contact-message-error' : undefined}
            />
            {errors.message ? (
              <EmbedError id="embed-contact-message-error" role="alert">
                {t(errors.message.message || '', { min: 10 })}
              </EmbedError>
            ) : null}
          </EmbedField>
          <EmbedSubmit
            type="submit"
            disabled={isSubmitting}
            $loading={isSubmitting}
          >
            {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
          </EmbedSubmit>
        </EmbedForm>
      )}
    </EmbedFeedback>
  );
};
