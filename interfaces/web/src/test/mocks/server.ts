// Libraries
import { setupServer } from 'msw/node';

// Mocks
import { handlers } from './handlers';

export const server = setupServer(...handlers);
