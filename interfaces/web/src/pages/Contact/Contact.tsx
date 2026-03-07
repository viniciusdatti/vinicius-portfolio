/**
 * @fileoverview Contact page component.
 * Provides a contact form and displays contact information with social links.
 */

// Core
import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Components
import { submitContact, ApiError } from '../../api';

// Styles
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from '../../styles/animations';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  ContentGrid,
  FormSection,
  Form,
  FormRow,
  InputGroup,
  Label,
  Input,
  TextArea,
  ErrorText,
  SubmitButton,
  SuccessMessage,
  InfoSection,
  InfoCard,
  InfoTitle,
  InfoList,
  InfoItem,
  ChatCTACard,
  ChatCTATitle,
  ChatCTADescription,
  ChatCTAButton,
} from './Contact.style';

// ============================================================================
// Icons
// ============================================================================

/**
 * Email envelope icon component.
 */
const EmailIcon: React.FC = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/**
 * LinkedIn social icon component.
 */
const LinkedInIcon: React.FC = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

/**
 * GitHub social icon component.
 */
const GitHubIcon: React.FC = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

/**
 * Location pin icon component.
 */
const LocationIcon: React.FC = (): React.ReactElement => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// ============================================================================
// Types
// ============================================================================

/**
 * Zod schema for contact form validation.
 */
const contactSchema = z.object({
  name: z.string().min(2, 'validation.minLength').max(100),
  email: z.string().email('validation.email'),
  company: z.string().max(200).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, 'validation.minLength').max(5000),
});

/**
 * Contact form data type inferred from Zod schema.
 */
type ContactFormData = z.infer<typeof contactSchema>;

// ============================================================================
// Component
// ============================================================================

/**
 * Contact page component.
 * Displays a contact form and contact information with social links.
 *
 * @returns The Contact page component
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

  /**
   * Handles form submission.
   * Sends data to the backend contact API (saves to DB and triggers email/telegram).
   *
   * @param data - The validated form data
   */
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
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      const message: string =
        error instanceof ApiError
          ? error.status === 429
            ? t('contact.form.rateLimitError')
            : error.message
          : t('contact.form.error');
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {t('contact.title')}
        </PageTitle>
        <PageSubtitle
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {t('contact.subtitle')}
        </PageSubtitle>
      </PageHeader>

      <ContentGrid>
        <FormSection
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {isSuccess ? (
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              ✅ {t('contact.form.success')}
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormRow>
                <InputGroup>
                  <Label>{t('contact.form.name')} *</Label>
                  <Input
                    {...register('name')}
                    placeholder={t('contact.form.namePlaceholder')}
                    $hasError={!!errors.name}
                  />
                  {errors.name && (
                    <ErrorText>{t(errors.name.message || '', { min: 2 })}</ErrorText>
                  )}
                </InputGroup>

                <InputGroup>
                  <Label>{t('contact.form.email')} *</Label>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    $hasError={!!errors.email}
                  />
                  {errors.email && (
                    <ErrorText>{t(errors.email.message || '')}</ErrorText>
                  )}
                </InputGroup>
              </FormRow>

              <FormRow>
                <InputGroup>
                  <Label>{t('contact.form.company')}</Label>
                  <Input
                    {...register('company')}
                    placeholder={t('contact.form.companyPlaceholder')}
                  />
                </InputGroup>

                <InputGroup>
                  <Label>{t('contact.form.subject')}</Label>
                  <Input
                    {...register('subject')}
                    placeholder={t('contact.form.subjectPlaceholder')}
                  />
                </InputGroup>
              </FormRow>

              <InputGroup>
                <Label>{t('contact.form.message')} *</Label>
                <TextArea
                  {...register('message')}
                  placeholder={t('contact.form.messagePlaceholder')}
                  $hasError={!!errors.message}
                />
                {errors.message && (
                  <ErrorText>{t(errors.message.message || '', { min: 10 })}</ErrorText>
                )}
              </InputGroup>

              {submitError && (
                <ErrorText role="alert">{submitError}</ErrorText>
              )}
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
              </SubmitButton>
            </Form>
          )}
        </FormSection>

        <InfoSection
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <InfoCard>
            <InfoTitle>{t('contact.info.title')}</InfoTitle>
            <InfoList>
              <InfoItem href="mailto:viniciusdatti@gmail.com">
                <EmailIcon />
                <span>viniciusdatti@gmail.com</span>
              </InfoItem>
              <InfoItem
                href="https://www.linkedin.com/in/vinicius-datti-791482267/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </InfoItem>
              <InfoItem
                href="https://github.com/viniciusdatti"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
                <span>GitHub</span>
              </InfoItem>
              <InfoItem as="div">
                <LocationIcon />
                <span>{t('contact.info.locationValue')}</span>
              </InfoItem>
            </InfoList>
          </InfoCard>

          <ChatCTACard
            variants={staggerItem}
            whileHover={{ y: -4 }}
          >
            <ChatCTATitle>{t('contact.chatCta.title')}</ChatCTATitle>
            <ChatCTADescription>
              {t('contact.chatCta.description')}
            </ChatCTADescription>
            <ChatCTAButton to="/live-lab">
              💬 {t('contact.chatCta.cta')}
            </ChatCTAButton>
          </ChatCTACard>
        </InfoSection>
      </ContentGrid>
    </PageContainer>
  );
};
