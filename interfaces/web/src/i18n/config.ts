// Libraries
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Lib
import { bindDocumentLangSync } from '../lib/pageMeta';
import { resolveI18nBcp47Tag } from '../lib/i18n';

// Locales
import ptBR from './locales/pt-BR.json';
import enUS from './locales/en-US.json';

const supportedLngs: string[] = ['pt-BR', 'en-US'];
const defaultLng: string = 'en-US';

const getInitialLanguage = (): string => {
  if (typeof navigator === 'undefined' || !navigator.language) {
    return defaultLng;
  }

  return resolveI18nBcp47Tag(navigator.language);
};

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

// Single global listener — keeps document.documentElement.lang in sync with i18n.
bindDocumentLangSync(i18n);

export default i18n;
