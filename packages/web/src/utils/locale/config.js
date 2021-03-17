import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import arTranslation from './translation/ar.json';
import enTranslation from './translation/en.json';

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: {
      ar: {
        translation: arTranslation
      },
      en: {
        translation: enTranslation
      }
    },
    debug: false,
    lng: 'ar',
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
