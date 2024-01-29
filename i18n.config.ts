import en from "./locales/es.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "en",
  locales: [
    {
      code: "en",
      iso: "en-US",
      name: "English",
    },
    {
      code: "fr",
      iso: "fr-FR",
      name: "Français",
    },
    {
      code: "es",
      iso: "es-ES",
      name: "Español",
    },
  ],

  messages: {
    en,
    fr,
    es,
  },
}));
