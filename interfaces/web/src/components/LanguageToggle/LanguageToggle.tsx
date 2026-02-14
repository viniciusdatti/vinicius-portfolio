// Core
import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Types
import type { LanguageToggleProps } from './LanguageToggle.types';

// Components
import { ToggleWrapper, LangButton } from './LanguageToggle.style';

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === 'pt-BR' ? 'pt-BR' : 'en-US';

  return (
    <ToggleWrapper className={className}>
      <LangButton
        type="button"
        $active={currentLang === 'pt-BR'}
        onClick={() => i18n.changeLanguage('pt-BR')}
        aria-pressed={currentLang === 'pt-BR'}
        aria-label="Português"
      >
        PT
      </LangButton>
      <LangButton
        type="button"
        $active={currentLang === 'en-US'}
        onClick={() => i18n.changeLanguage('en-US')}
        aria-pressed={currentLang === 'en-US'}
        aria-label="English"
      >
        EN
      </LangButton>
    </ToggleWrapper>
  );
};
