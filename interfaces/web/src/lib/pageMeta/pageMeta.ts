// Libraries
import i18n from 'i18next';

// Types
import { Language } from '../../types';

// I18n
import { resolveI18nBcp47Tag, resolveLanguage } from '../i18n/i18nDisplay';

// PageMeta
import {
  PAGE_META_OG_IMAGE_PATH,
  PAGE_META_OG_TYPE,
  PAGE_META_TWITTER_CARD,
} from './pageMeta.constants';

export interface PageMetaContent {
  title: string;
  description: string;
  language: string;
}

const toOgLocale = (language: string): string => (
  resolveI18nBcp47Tag(language).replace('-', '_')
);

const resolveAlternateOgLocale = (language: string): string => {
  const primary: Language = resolveLanguage(language);
  return primary === Language.Pt ? 'en_US' : 'pt_BR';
};

const resolveOgImageUrl = (): string => {
  if (typeof window === 'undefined') {
    return PAGE_META_OG_IMAGE_PATH;
  }

  const base: string = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${window.location.origin}${base}${PAGE_META_OG_IMAGE_PATH}`;
};

const resolveCanonicalUrl = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  const base: string = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path: string = window.location.pathname.replace(/\/$/, '') || '/';
  return `${window.location.origin}${base}${path === '/' ? '' : path}`;
};

const setMetaName = (name: string, content: string): void => {
  if (typeof document === 'undefined') {
    return;
  }

  let element: HTMLMetaElement | null = document.querySelector(
    `meta[name="${name}"]`,
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setMetaProperty = (property: string, content: string): void => {
  if (typeof document === 'undefined') {
    return;
  }

  let element: HTMLMetaElement | null = document.querySelector(
    `meta[property="${property}"]`,
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setLinkRel = (rel: string, href: string): void => {
  if (typeof document === 'undefined' || href.length === 0) {
    return;
  }

  let element: HTMLLinkElement | null = document.querySelector(
    `link[rel="${rel}"]`,
  );

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

export const applyPageMeta = (meta: PageMetaContent): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const ogImageUrl: string = resolveOgImageUrl();
  const canonicalUrl: string = resolveCanonicalUrl();
  const ogLocale: string = toOgLocale(meta.language);
  const ogLocaleAlternate: string = resolveAlternateOgLocale(meta.language);

  document.title = meta.title;
  setMetaName('description', meta.description);
  setMetaProperty('og:title', meta.title);
  setMetaProperty('og:description', meta.description);
  setMetaProperty('og:type', PAGE_META_OG_TYPE);
  setMetaProperty('og:locale', ogLocale);
  setMetaProperty('og:locale:alternate', ogLocaleAlternate);
  setMetaProperty('og:image', ogImageUrl);
  setMetaName('twitter:card', PAGE_META_TWITTER_CARD);
  setMetaName('twitter:title', meta.title);
  setMetaName('twitter:description', meta.description);
  setMetaName('twitter:image', ogImageUrl);

  if (typeof window !== 'undefined') {
    setMetaProperty('og:url', window.location.href);
  }

  if (canonicalUrl.length > 0) {
    setLinkRel('canonical', canonicalUrl);
  }
};

export const syncDocumentLang = (language: string): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const lang: string = resolveLanguage(language) === Language.Pt ? 'pt' : 'en';
  document.documentElement.lang = lang;
};

/**
 * Registers a global i18n listener so html[lang] stays aligned with the active locale.
 */
export const bindDocumentLangSync = (instance: typeof i18n): void => {
  syncDocumentLang(instance.language);
  instance.on('languageChanged', (language: string): void => {
    syncDocumentLang(language);
  });
};
