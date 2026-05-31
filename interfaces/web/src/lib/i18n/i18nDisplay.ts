// Types
import { Language } from '../../types';

/**
 * Single source of truth for mapping i18next language codes to the Language enum.
 */
export const resolveLanguage = (language: string): Language => (
  language.startsWith('pt') ? Language.Pt : Language.En
);

export const isPortugueseLocale = (language: string): boolean => (
  resolveLanguage(language) === Language.Pt
);

export const resolveI18nBcp47Tag = (language: string): string => {
  if (resolveLanguage(language) === Language.Pt) {
    return 'pt-BR';
  }
  return 'en-US';
};

export const formatClockTime = (timestampMs: number, language: string): string => {
  const localeTag: string = resolveI18nBcp47Tag(language);
  return new Date(timestampMs).toLocaleTimeString(localeTag, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const resolveI18nKeyOrFallback = (
  key: string,
  fallback: string,
  translate: (translationKey: string) => string,
): string => {
  const value: string = translate(key);
  return value === key ? fallback : value;
};
