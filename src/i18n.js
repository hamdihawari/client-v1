/* with json file */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
i18n.use(initReactI18next).init({
  backend: {
    loadPath: "http://localhost:9000/aboutData.json"
  },
  resources: {},
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language if the chosen language is not available
  interpolation: {
    escapeValue: false, // React already escapes variables
  },
});

export default i18n;