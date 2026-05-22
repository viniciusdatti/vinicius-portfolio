// Core
import { describe, expect, it } from 'vitest';

// Libraries
import { z } from 'zod';

// =================================================================================================
// ======================================= TEST SUPPORT VARS =======================================
// =================================================================================================

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
});

// =================================================================================================
// ======================================== TEST EXECUTION =========================================
// =================================================================================================

describe('Contact form validation', (): void => {
  // SCHEMA: valid payload *******************************

  it('should accept valid payload', (): void => {
    const result = contactSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Hello from the portfolio contact form.',
    });
    expect(result.success).toBe(true);
  });

  // SCHEMA: invalid payload *******************************

  it('should reject short name and message', (): void => {
    const result = contactSchema.safeParse({
      name: 'J',
      email: 'not-an-email',
      message: 'short',
    });
    expect(result.success).toBe(false);
  });
});
