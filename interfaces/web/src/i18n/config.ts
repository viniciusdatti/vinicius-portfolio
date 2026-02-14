/**
 * i18n configuration for internationalization.
 */

// Libraries
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Locales
import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';

const supportedLngs: string[] = ['pt-BR', 'en-US'];
const defaultLng: string = 'en-US';

/**
 * Detects initial language based on browser settings.
 */
function getInitialLanguage(): string {
  if (typeof navigator === 'undefined' || !navigator.language) {
    return defaultLng;
  }

  const browserLang: string = navigator.language;

  if (browserLang.startsWith('pt')) {
    return 'pt-BR';
  }

  if (browserLang.startsWith('en')) {
    return 'en-US';
  }

  return defaultLng;
}

i18n.use(initReactI18next).init({
  resources: {
    'pt-BR': { translation: ptBR },
    'en-US': { translation: enUS },
  },
  lng: getInitialLanguage(),
  fallbackLng: defaultLng,
  supportedLngs,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
