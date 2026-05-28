// Libraries
import { setupServer } from 'msw/node';

// Component
import { handlers } from './handlers';

export const server = setupServer(...handlers);
