/**
 * Persists visitor chat session id for resume after page reload.
 */

const STORAGE_KEY: string = 'portfolio_visitor_chat_session_id';

/**
 * Returns stored session id or null.
 */
export const getStoredVisitorSessionId = (): string | null => {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

/**
 * Persists session id for resume after refresh.
 */
export const setStoredVisitorSessionId = (sessionId: string): void => {
  try {
    sessionStorage.setItem(STORAGE_KEY, sessionId);
  } catch {
    // ignore quota / private mode
  }
};

/**
 * Clears stored session id (end session).
 */
export const clearStoredVisitorSessionId = (): void => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
