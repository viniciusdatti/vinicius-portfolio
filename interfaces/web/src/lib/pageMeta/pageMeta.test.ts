// Libraries
import {
  beforeEach, describe, expect, it,
} from 'vitest';

// PageMeta
import {
  applyPageMeta,
  bindDocumentLangSync,
  syncDocumentLang,
} from './pageMeta';

describe('lib/pageMeta', (): void => {
  beforeEach((): void => {
    document.head.innerHTML = '';
    document.title = '';
    document.documentElement.lang = 'en';
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:5173/skills',
        origin: 'http://localhost:5173',
        pathname: '/skills',
      },
      writable: true,
      configurable: true,
    });
  });

  // METHOD: applyPageMeta *******************************

  it('should set document title and create meta tags', (): void => {
    applyPageMeta({
      title: 'Test Page',
      description: 'Test description',
      language: 'en-US',
    });

    expect(document.title).toBe('Test Page');
    expect(
      document.querySelector('meta[name="description"]')?.getAttribute('content'),
    ).toBe('Test description');
    expect(
      document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ).toBe('Test Page');
    expect(
      document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    ).toBe('Test description');
    expect(
      document.querySelector('meta[property="og:type"]')?.getAttribute('content'),
    ).toBe('website');
    expect(
      document.querySelector('meta[property="og:locale"]')?.getAttribute('content'),
    ).toBe('en_US');
    expect(
      document.querySelector('meta[property="og:locale:alternate"]')?.getAttribute('content'),
    ).toBe('pt_BR');
    expect(
      document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
    ).toBe('http://localhost:5173/favicon.svg');
    expect(
      document.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
    ).toBe('summary_large_image');
    expect(
      document.querySelector('meta[name="twitter:image"]')?.getAttribute('content'),
    ).toBe('http://localhost:5173/favicon.svg');
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    ).toBe('http://localhost:5173/skills');
  });

  it('should update existing meta elements instead of duplicating them', (): void => {
    const descriptionMeta: HTMLMetaElement = document.createElement('meta');
    descriptionMeta.setAttribute('name', 'description');
    descriptionMeta.setAttribute('content', 'old');
    document.head.appendChild(descriptionMeta);

    applyPageMeta({
      title: 'New Title',
      description: 'New description',
      language: 'pt-BR',
    });

    expect(document.querySelectorAll('meta[name="description"]').length).toBe(1);
    expect(descriptionMeta.getAttribute('content')).toBe('New description');
    expect(
      document.querySelector('meta[property="og:locale"]')?.getAttribute('content'),
    ).toBe('pt_BR');
  });

  // METHOD: syncDocumentLang *******************************

  it('should map pt locale codes to pt lang attribute', (): void => {
    syncDocumentLang('pt-BR');
    expect(document.documentElement.lang).toBe('pt');
  });

  it('should map non-pt locale codes to en lang attribute', (): void => {
    syncDocumentLang('en-US');
    expect(document.documentElement.lang).toBe('en');
  });

  // METHOD: bindDocumentLangSync *******************************

  it('should sync lang on init and on languageChanged', (): void => {
    const listeners: Record<string, Array<(lng: string) => void>> = {};
    const mockI18n = {
      language: 'en-US',
      on: (event: string, handler: (lng: string) => void): void => {
        listeners[event] = listeners[event] ?? [];
        listeners[event].push(handler);
      },
    };

    bindDocumentLangSync(mockI18n as never);
    expect(document.documentElement.lang).toBe('en');

    listeners.languageChanged?.[0]?.('pt-BR');
    expect(document.documentElement.lang).toBe('pt');
  });
});
