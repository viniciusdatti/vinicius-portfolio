// Core
import React, { useState } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Transition } from 'framer-motion';

// Api
import { submitContact } from '../../api';

// Hooks
import { useScrollMotion, ScrollMotionContract } from '../../hooks/useScrollMotion';
import { usePageMeta, PageMetaRoute } from '../../hooks';

// Layout
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageTitleGradient,
  PageSubtitle,
} from '../../styles/pageLayout.style';

// Components
import { showToast, ToastType } from '../../store';

// Icons
import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  LocationIcon,
} from './ContactIcons';

// Styles
import { motionPresets } from '../../styles/motionPresets';
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
  LiveLabCTACard,
  LiveLabCTATitle,
  LiveLabCTADescription,
  LiveLabCTAButton,
} from './Contact.style';

// Types
import { contactFormSchema, ContactFormValues, getContactSubmitErrorMessage } from '../../domain/contact';

interface ContactPageState {
  isSuccess: boolean;
}

const initialState: ContactPageState = {
  isSuccess: false,
};

export const Contact: React.FC = (): React.ReactElement => {
  usePageMeta(PageMetaRoute.Contact);
  const { t } = useTranslation();
  const [state, setState] = useState<ContactPageState>(initialState);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const nameField: UseFormRegisterReturn<'name'> = register('name');
  const emailField: UseFormRegisterReturn<'email'> = register('email');
  const companyField: UseFormRegisterReturn<'company'> = register('company');
  const subjectField: UseFormRegisterReturn<'subject'> = register('subject');
  const messageField: UseFormRegisterReturn<'message'> = register('message');

  const onSubmit = async (data: ContactFormValues): Promise<void> => {
    try {
      await submitContact({
        name: data.name,
        email: data.email,
        message: data.message,
        company: data.company?.trim() || undefined,
        subject: data.subject?.trim() || undefined,
      });
      setState((prev: ContactPageState): ContactPageState => ({
        ...prev,
        isSuccess: true,
      }));
      reset();
      // Inline banner (aria-live) is the single success surface — no duplicate toast.
      setTimeout((): void => {
        setState((prev: ContactPageState): ContactPageState => ({
          ...prev,
          isSuccess: false,
        }));
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

  const motion: ScrollMotionContract = useScrollMotion();
  const { viewport } = motion;
  const tapTransition: Transition = { ease: motionPresets.ease.out };

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
            {state.isSuccess ? (
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

                <SubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  $loading={isSubmitting}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  transition={tapTransition}
                >
                  {isSubmitting
                    ? t('contact.form.sending')
                    : t('contact.form.submit')}
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

          <LiveLabCTACard variants={motion.item}>
            <LiveLabCTATitle>{t('contact.liveLabCta.title')}</LiveLabCTATitle>
            <LiveLabCTADescription>
              {t('contact.liveLabCta.description')}
            </LiveLabCTADescription>
            <LiveLabCTAButton to="/live-lab">
              {t('contact.liveLabCta.cta')}
            </LiveLabCTAButton>
          </LiveLabCTACard>
        </ContactAuxStrip>
      </ContactConsoleColumn>
    </PageContainer>
  );
};
