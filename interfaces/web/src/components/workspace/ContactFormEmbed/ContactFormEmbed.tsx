// Core
import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Components
import { submitContact, ApiError } from '@/api';
import {
  EmbedForm,
  EmbedField,
  EmbedLabel,
  EmbedInput,
  EmbedTextArea,
  EmbedError,
  EmbedSubmit,
  EmbedSuccess,
} from '@/components/Workspace/ContactFormEmbed/ContactFormEmbed.style';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const getSubmitErrorMessage = (
  error: unknown,
  rateLimitText: string,
  fallbackText: string,
): string => {
  if (!(error instanceof ApiError)) return fallbackText;
  if (error.status === 429) return rateLimitText;
  return error.message;
};

/* ***********************************************************************************************
 *************************************** COMPONENT HANDLING **************************************
 *********************************************************************************************** */

export const ContactFormEmbed = (): React.ReactElement => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const nameField = register('name');
  const emailField = register('email');
  const messageField = register('message');

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await submitContact({
        name: data.name,
        email: data.email,
        message: data.message,
      });
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      setSubmitError(getSubmitErrorMessage(
        error,
        t('contact.form.rateLimitError'),
        t('contact.form.error'),
      ));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <EmbedSuccess>{t('contact.form.success')}</EmbedSuccess>;
  }

  return (
    <EmbedForm onSubmit={handleSubmit(onSubmit)}>
      <EmbedField>
        <EmbedLabel>{t('contact.form.name')}</EmbedLabel>
        <EmbedInput
          name={nameField.name}
          onChange={nameField.onChange}
          onBlur={nameField.onBlur}
          ref={nameField.ref}
        />
        {errors.name ? (
          <EmbedError>{t('validation.minLength')}</EmbedError>
        ) : null}
      </EmbedField>
      <EmbedField>
        <EmbedLabel>{t('contact.form.email')}</EmbedLabel>
        <EmbedInput
          type="email"
          name={emailField.name}
          onChange={emailField.onChange}
          onBlur={emailField.onBlur}
          ref={emailField.ref}
        />
        {errors.email ? (
          <EmbedError>{t('validation.email')}</EmbedError>
        ) : null}
      </EmbedField>
      <EmbedField>
        <EmbedLabel>{t('contact.form.message')}</EmbedLabel>
        <EmbedTextArea
          name={messageField.name}
          onChange={messageField.onChange}
          onBlur={messageField.onBlur}
          ref={messageField.ref}
        />
        {errors.message ? (
          <EmbedError>{t('validation.minLength')}</EmbedError>
        ) : null}
      </EmbedField>
      {submitError ? <EmbedError>{submitError}</EmbedError> : null}
      <EmbedSubmit type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('common.loading') : t('contact.form.submit')}
      </EmbedSubmit>
    </EmbedForm>
  );
};
