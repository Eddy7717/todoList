import i18n from "i18next";
import translation_en from "./locales/en/translation.json";
import translation_fr from "./locales/fr/translation.json";

i18n.init({
  // debug: true,
  fallbackLng: "fr",
  interpolation: {
    escapeValue: true, // not needed for react as it escapes by default
  },
  resources: {
    en: {
      translation: translation_en,
    },
    fr: {
      translation: translation_fr,
    },
  },
});

export default i18n;
