// Libraries
import {
  describe,
  expect,
  it,
} from 'vitest';

// Types
import { contactFormSchema } from '../../domain/contact';

describe('Contact form validation', (): void => {
  // SCHEMA: valid payload *******************************

  it('should accept valid payload', (): void => {
    const result = contactFormSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello from the portfolio contact form.',
    });
    expect(result.success).toBe(true);
  });

  // SCHEMA: invalid payload *******************************

  it('should reject short name and message', (): void => {
    const result = contactFormSchema.safeParse({
      name: 'J',
      email: 'not-an-email',
      message: 'short',
    });
    expect(result.success).toBe(false);
  });
});
