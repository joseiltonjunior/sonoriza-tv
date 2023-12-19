import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { TRANSLATIONS_PT_BR } from './translations/pt-BR'
import { TRANSLATIONS_EN_US } from './translations/en-US'

const resources = {
  'en-US': {
    translation: TRANSLATIONS_EN_US,
  },
  'pt-BR': {
    translation: TRANSLATIONS_PT_BR,
  },
}

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  fallbackLng: 'pt-BR',
})
