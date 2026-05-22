// =================================================================================================
// ============================================= METHODS ===========================================
// =================================================================================================

/**
 * Maps i18next language code to a BCP 47 tag for Intl formatters.
 */
export const resolveI18nBcp47Tag = (language: string): string => {
  if (language.startsWith('pt')) {
    return 'pt-BR';
  }
  return 'en-US';
};

/**
 * Locale-aware clock readout (HH:mm:ss) for telemetry surfaces.
 */
export const formatClockTime = (timestampMs: number, language: string): string => {
  const localeTag: string = resolveI18nBcp47Tag(language);
  return new Date(timestampMs).toLocaleTimeString(localeTag, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Returns translated copy when the key resolves; otherwise the API/backend fallback.
 */
export const resolveI18nKeyOrFallback = (
  key: string,
  fallback: string,
  translate: (translationKey: string) => string,
): string => {
  const value: string = translate(key);
  return value === key ? fallback : value;
};
