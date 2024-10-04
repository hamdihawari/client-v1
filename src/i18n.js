export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: { /* English translations */ }},
            de: { translation: { /* German translations */ }},
            ar: { translation: { /* Arabic translations */ }},
        },
        lng: "en", // Default language
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });


/* with json file */
/*
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
i18n.use(initReactI18next).init({
  backend: {
    loadPath: "http://localhost:9000"
  },
  resources: {},
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if the chosen language is not available
  interpolation: {
    escapeValue: false, // React already escapes variables
  },
});
 */
