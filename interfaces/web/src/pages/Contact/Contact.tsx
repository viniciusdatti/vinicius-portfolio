/**
 * @fileoverview Contact page — centralized operational input console.
 */

// Core
import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Components
import { showToast, ToastType } from '@/components/common/Toast';
import { useScrollMotion } from '@/hooks/useScrollMotion';
import { submitContact, ApiError } from '@/api';
import { motionPresets } from '@/styles/motionPresets';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageTitleGradient,
  PageSubtitle,
} from '@/styles/pageLayout.style';
import {
  ContactConsoleColumn,
  FormSection,
  ConsoleEyebrow,
  Form,
  FormFieldStack,
  FormRow,
  InputGroup,
  Label,
  Input,
  TextArea,
  ErrorText,
  FormFeedback,
  SubmitButton,
  SuccessMessage,
  ContactAuxStrip,
  InfoCard,
  InfoTitle,
  InfoList,
  InfoItem,
  ChatCTACard,
  ChatCTATitle,
  ChatCTADescription,
  ChatCTAButton,
} from '@/pages/Contact/Contact.style';

// =================================================================================================
// ============================================= ICONS =============================================
// =================================================================================================

const EmailIcon = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LinkedInIcon = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GitHubIcon = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LocationIcon = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// =================================================================================================
// ============================================= TYPES =============================================
// =================================================================================================

const contactSchema = z.object({
  name: z.string().min(2, 'validation.minLength').max(100),
  email: z.string().email('validation.email'),
  company: z.string().max(200).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, 'validation.minLength').max(5000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const getContactSubmitErrorMessage = (
  error: unknown,
  rateLimitText: string,
  fallbackText: string,
): string => {
  if (!(error instanceof ApiError)) return fallbackText;
  if (error.status === 429) return rateLimitText;
  return error.message;
};

// =================================================================================================
// =========================================== COMPONENT ===========================================
// =================================================================================================

/**
 * Contact page — editorial header + centered input console + auxiliary channel strip.
 */
export const Contact: React.FC = (): React.ReactElement => {
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
  const companyField = register('company');
  const subjectField = register('subject');
  const messageField = register('message');

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await submitContact({
        name: data.name,
        email: data.email,
        message: data.message,
        company: data.company?.trim() || undefined,
        subject: data.subject?.trim() || undefined,
      });
      setIsSuccess(true);
      showToast(t('contact.form.success'), ToastType.Success);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      const message = getContactSubmitErrorMessage(
        error,
        t('contact.form.rateLimitError'),
        t('contact.form.error'),
      );
      setSubmitError(message);
      showToast(message, ToastType.Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const motion = useScrollMotion();
  const viewport = { once: true, margin: '-60px' as const };
  const tapTransition = { ease: motionPresets.ease.out };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={motion.title}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <PageTitleGradient>{t('contact.title')}</PageTitleGradient>
        </PageTitle>
        <PageSubtitle
          variants={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {t('contact.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <ContactConsoleColumn>
        <FormSection
          variants={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-labelledby="contact-console-heading"
        >
          <ConsoleEyebrow id="contact-console-heading">
            {t('contact.form.consoleLabel', { defaultValue: 'Input channel' })}
          </ConsoleEyebrow>

          <FormFeedback aria-live="polite">
            {isSuccess ? (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                role="status"
              >
                {t('contact.form.success')}
              </SuccessMessage>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormFieldStack>
                  <FormRow>
                    <InputGroup>
                      <Label htmlFor="contact-name">
                        {t('contact.form.name')}
                        {' '}
                        *
                      </Label>
                      <Input
                        id="contact-name"
                        name={nameField.name}
                        onChange={nameField.onChange}
                        onBlur={nameField.onBlur}
                        ref={nameField.ref}
                        autoComplete="name"
                        placeholder={t('contact.form.namePlaceholder')}
                        $hasError={!!errors.name}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      />
                      {errors.name && (
                        <ErrorText id="contact-name-error" role="alert">
                          {t(errors.name.message || '', { min: 2 })}
                        </ErrorText>
                      )}
                    </InputGroup>

                    <InputGroup>
                      <Label htmlFor="contact-email">
                        {t('contact.form.email')}
                        {' '}
                        *
                      </Label>
                      <Input
                        id="contact-email"
                        name={emailField.name}
                        onChange={emailField.onChange}
                        onBlur={emailField.onBlur}
                        ref={emailField.ref}
                        type="email"
                        autoComplete="email"
                        placeholder={t('contact.form.emailPlaceholder')}
                        $hasError={!!errors.email}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      />
                      {errors.email && (
                        <ErrorText id="contact-email-error" role="alert">
                          {t(errors.email.message || '')}
                        </ErrorText>
                      )}
                    </InputGroup>
                  </FormRow>

                  <FormRow>
                    <InputGroup>
                      <Label htmlFor="contact-company">{t('contact.form.company')}</Label>
                      <Input
                        id="contact-company"
                        name={companyField.name}
                        onChange={companyField.onChange}
                        onBlur={companyField.onBlur}
                        ref={companyField.ref}
                        autoComplete="organization"
                        placeholder={t('contact.form.companyPlaceholder')}
                      />
                    </InputGroup>

                    <InputGroup>
                      <Label htmlFor="contact-subject">{t('contact.form.subject')}</Label>
                      <Input
                        id="contact-subject"
                        name={subjectField.name}
                        onChange={subjectField.onChange}
                        onBlur={subjectField.onBlur}
                        ref={subjectField.ref}
                        placeholder={t('contact.form.subjectPlaceholder')}
                      />
                    </InputGroup>
                  </FormRow>

                  <InputGroup>
                    <Label htmlFor="contact-message">
                      {t('contact.form.message')}
                      {' '}
                      *
                    </Label>
                    <TextArea
                      id="contact-message"
                      name={messageField.name}
                      onChange={messageField.onChange}
                      onBlur={messageField.onBlur}
                      ref={messageField.ref}
                      placeholder={t('contact.form.messagePlaceholder')}
                      $hasError={!!errors.message}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && (
                      <ErrorText id="contact-message-error" role="alert">
                        {t(errors.message.message || '', { min: 10 })}
                      </ErrorText>
                    )}
                  </InputGroup>
                </FormFieldStack>

                {submitError && (
                  <ErrorText role="alert">{submitError}</ErrorText>
                )}

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  $loading={isSubmitting}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  transition={tapTransition}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                </SubmitButton>
              </Form>
            )}
          </FormFeedback>
        </FormSection>

        <ContactAuxStrip
          variants={motion.stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <InfoCard variants={motion.item}>
            <InfoTitle>{t('contact.info.title')}</InfoTitle>
            <InfoList>
              <InfoItem href="mailto:viniciusdatti@gmail.com">
                <EmailIcon />
                <span>{t('contact.info.emailValue')}</span>
              </InfoItem>
              <InfoItem
                href="https://www.linkedin.com/in/vinicius-datti-791482267/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
                <span>{t('contact.info.linkedin')}</span>
              </InfoItem>
              <InfoItem
                href="https://github.com/viniciusdatti"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
                <span>{t('contact.info.github')}</span>
              </InfoItem>
              <InfoItem as="div">
                <LocationIcon />
                <span>{t('contact.info.locationValue')}</span>
              </InfoItem>
            </InfoList>
          </InfoCard>

          <ChatCTACard variants={motion.item}>
            <ChatCTATitle>{t('contact.chatCta.title')}</ChatCTATitle>
            <ChatCTADescription>
              {t('contact.chatCta.description')}
            </ChatCTADescription>
            <ChatCTAButton to="/live-lab">
              {t('contact.chatCta.cta')}
            </ChatCTAButton>
          </ChatCTACard>
        </ContactAuxStrip>
      </ContactConsoleColumn>
    </PageContainer>
  );
};
