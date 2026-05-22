// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { LanguageToggleProps } from '@/components/LanguageToggle/LanguageToggle.types';

// Components
import { ToggleWrapper, LangButton } from '@/components/LanguageToggle/LanguageToggle.style';

export function LanguageToggle({ className }: LanguageToggleProps): React.ReactElement {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language === 'pt-BR' ? 'pt-BR' : 'en-US';

  return (
    <ToggleWrapper className={className}>
      <LangButton
        type="button"
        $active={currentLang === 'pt-BR'}
        onClick={() => i18n.changeLanguage('pt-BR')}
        aria-pressed={currentLang === 'pt-BR'}
        aria-label={t('a11y.langPt')}
      >
        PT
      </LangButton>
      <LangButton
        type="button"
        $active={currentLang === 'en-US'}
        onClick={() => i18n.changeLanguage('en-US')}
        aria-pressed={currentLang === 'en-US'}
        aria-label={t('a11y.langEn')}
      >
        EN
      </LangButton>
    </ToggleWrapper>
  );
}
