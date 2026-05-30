// Libraries
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'validation.minLength').max(100, 'validation.maxLength'),
  email: z.string().email('validation.email'),
  company: z.string().max(200, 'validation.maxLength').optional(),
  subject: z.string().max(200, 'validation.maxLength').optional(),
  message: z.string().min(10, 'validation.minLength').max(5000, 'validation.maxLength'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const contactFormEmbedSchema = contactFormSchema.pick({
  name: true,
  email: true,
  message: true,
});

export type ContactFormEmbedValues = z.infer<typeof contactFormEmbedSchema>;
